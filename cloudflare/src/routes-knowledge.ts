import { Hono } from "hono";
import { storageKey, type StoredFileMetadata } from "./file-storage";
import type { Env, Variables } from "./env";
import { all, asNumber, clamp, dateAfter, first, id, now, parseRow, run, safeJson, serializeJson, tokens, likePattern } from "./db";

export const knowledgeRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

const parsePoint = (row: Record<string, any>) => parseRow(row, ["tags"]);
const parseExam = (row: Record<string, any>) => parseRow(row, ["options", "scoring_points"]);

knowledgeRoutes.get("/subjects", async (c) => {
  const user = c.get("user");
  const rows = await all(c.env.DB,
    "SELECT s.*, COUNT(DISTINCT c.id) AS chapter_count, COUNT(DISTINCT kp.id) AS point_count " +
    "FROM subjects s LEFT JOIN chapters c ON c.subject_id=s.id LEFT JOIN knowledge_points kp ON kp.chapter_id=c.id AND (kp.owner_id IS NULL OR kp.owner_id=?) " +
    "GROUP BY s.id ORDER BY s.sort_order ASC", [user.id]);
  return c.json({ subjects: rows });
});

knowledgeRoutes.post("/subjects", async (c) => {
  const body = await c.req.json<Record<string, any>>();
  if (!String(body.name || "").trim()) return c.json({ detail: "学科名称不能为空" }, 400);
  const subjectId = id("sub");
  await run(c.env.DB, "INSERT INTO subjects (id,name,code,description,icon,color,sort_order) VALUES (?,?,?,?,?,?,?)", [
    subjectId, body.name, body.code || null, body.description || null, body.icon || null, body.color || null, body.sort_order || 0,
  ]);
  return c.json({ id: subjectId, status: "created" }, 201);
});

knowledgeRoutes.get("/subjects/:subjectId/chapters", async (c) => {
  const user = c.get("user");
  const parentId = c.req.query("parent_id");
  const where = parentId ? "c.subject_id=? AND c.parent_id=?" : "c.subject_id=? AND c.parent_id IS NULL";
  const params = parentId ? [c.req.param("subjectId"), parentId] : [c.req.param("subjectId")];
  const rows = await all(c.env.DB,
    `SELECT c.*, COUNT(kp.id) AS point_count FROM chapters c LEFT JOIN knowledge_points kp ON kp.chapter_id=c.id AND (kp.owner_id IS NULL OR kp.owner_id=?) WHERE ${where} GROUP BY c.id ORDER BY c.sort_order ASC`, [user.id, ...params]);
  return c.json({ chapters: rows });
});

knowledgeRoutes.post("/chapters", async (c) => {
  const body = await c.req.json<Record<string, any>>();
  if (!body.subject_id || !body.name) return c.json({ detail: "缺少学科或章节名称" }, 400);
  const chapterId = id("ch");
  await run(c.env.DB, "INSERT INTO chapters (id,subject_id,parent_id,name,description,sort_order,level) VALUES (?,?,?,?,?,?,?)", [
    chapterId, body.subject_id, body.parent_id || null, body.name, body.description || null, body.sort_order || 0, body.level || 1,
  ]);
  return c.json({ id: chapterId, status: "created" }, 201);
});

knowledgeRoutes.get("/chapters/:chapterId/points", async (c) => {
  const user = c.get("user");
  const parentId = c.req.query("parent_id");
  const rows = parentId
    ? await all<Record<string, any>>(c.env.DB, "SELECT * FROM knowledge_points WHERE chapter_id=? AND parent_id=? AND (owner_id IS NULL OR owner_id=?) ORDER BY sort_order ASC", [c.req.param("chapterId"), parentId, user.id])
    : await all<Record<string, any>>(c.env.DB, "SELECT * FROM knowledge_points WHERE chapter_id=? AND parent_id IS NULL AND (owner_id IS NULL OR owner_id=?) ORDER BY sort_order ASC", [c.req.param("chapterId"), user.id]);
  const points = rows.map(parsePoint);
  return c.json({ knowledge_points: points, total: points.length });
});

knowledgeRoutes.get("/reviews/due", async (c) => {
  const user = c.get("user");
  const limit = asNumber(c.req.query("limit"), 20, 1, 100);
  const subjectId = c.req.query("subject_id");
  let sql = "SELECT kr.*,kp.title,kp.content,kp.importance,kp.tags,kp.chapter_id,kp.subject_id FROM knowledge_reviews kr JOIN knowledge_points kp ON kp.id=kr.knowledge_point_id WHERE kr.user_id=? AND kr.due_date<=CURRENT_TIMESTAMP";
  const params: unknown[] = [user.id];
  if (subjectId) { sql += " AND kp.subject_id=?"; params.push(subjectId); }
  sql += " ORDER BY kr.due_date ASC LIMIT ?"; params.push(limit);
  const rows = (await all<Record<string, any>>(c.env.DB, sql, params)).map(parsePoint);
  return c.json({ reviews: rows, total: rows.length });
});

knowledgeRoutes.post("/reviews/:pointId", async (c) => {
  const user = c.get("user");
  const rating = asNumber(c.req.query("rating"), 0);
  if (![1, 2, 3, 4].includes(rating)) return c.json({ detail: "评分必须在 1-4 之间" }, 400);
  const pointId = c.req.param("pointId");
  if (!await first(c.env.DB, "SELECT id FROM knowledge_points WHERE id=? AND (owner_id IS NULL OR owner_id=?)", [pointId, user.id])) return c.json({ detail: "知识点不存在" }, 404);
  const old = await first<Record<string, any>>(c.env.DB, "SELECT * FROM knowledge_reviews WHERE user_id=? AND knowledge_point_id=?", [user.id, pointId]);
  const oldStability = Number(old?.stability || 2.5);
  const oldDifficulty = Number(old?.difficulty || 0.5);
  const reviewCount = Number(old?.review_count || 0) + 1;
  const lapseCount = Number(old?.lapse_count || 0) + (rating === 1 ? 1 : 0);
  const factors: Record<number, number> = { 1: 0.35, 2: 0.8, 3: 1.45, 4: 2.2 };
  const stability = clamp(oldStability * factors[rating] + rating * 0.45, 0.3, 365);
  const difficulty = clamp(oldDifficulty + (3 - rating) * 0.08, 0.1, 0.95);
  const intervalDays = rating === 1 ? 1 : Math.max(1, Math.round(stability * (rating === 4 ? 1.6 : rating === 3 ? 1 : 0.45)));
  const dueDate = dateAfter(intervalDays);
  if (old) {
    await run(c.env.DB, "UPDATE knowledge_reviews SET stability=?,difficulty=?,review_count=?,lapse_count=?,due_date=?,last_review=CURRENT_TIMESTAMP,updated_at=CURRENT_TIMESTAMP WHERE id=?", [stability, difficulty, reviewCount, lapseCount, dueDate, old.id]);
  } else {
    await run(c.env.DB, "INSERT INTO knowledge_reviews (id,user_id,knowledge_point_id,stability,difficulty,review_count,lapse_count,due_date,last_review) VALUES (?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)", [id("kr"), user.id, pointId, stability, difficulty, reviewCount, lapseCount, dueDate]);
  }
  await run(c.env.DB, "INSERT INTO study_sessions (id,user_id,knowledge_point_id,activity_type,start_time,duration_seconds) VALUES (?,?,?,'knowledge_review',CURRENT_TIMESTAMP,0)", [id("ss"), user.id, pointId]);
  return c.json({ message: "复习记录已更新", next_review: dueDate, interval: `${intervalDays} 天后`, stability });
});

knowledgeRoutes.get("/reviews/stats", async (c) => {
  const user = c.get("user");
  const summary = await first<Record<string, any>>(c.env.DB,
    "SELECT COUNT(*) total,SUM(CASE WHEN due_date<=CURRENT_TIMESTAMP THEN 1 ELSE 0 END) due_now FROM knowledge_reviews WHERE user_id=?", [user.id]);
  const today = await first<{ count: number }>(c.env.DB,
    "SELECT COUNT(*) count FROM study_sessions WHERE user_id=? AND activity_type='knowledge_review' AND date(created_at)=date('now')", [user.id]);
  const grouped = await all<{ subject_id: string; count: number }>(c.env.DB,
    "SELECT kp.subject_id,COUNT(*) count FROM knowledge_reviews kr JOIN knowledge_points kp ON kp.id=kr.knowledge_point_id WHERE kr.user_id=? GROUP BY kp.subject_id", [user.id]);
  return c.json({ total: summary?.total || 0, due_now: summary?.due_now || 0, reviewed_today: today?.count || 0, by_subject: Object.fromEntries(grouped.map((x) => [x.subject_id, x.count])) });
});

knowledgeRoutes.get("/search", async (c) => {
  const user = c.get("user");
  const query = String(c.req.query("q") || "").trim();
  const limit = asNumber(c.req.query("limit"), 20, 1, 100);
  if (!query) return c.json({ results: [], total: 0, query });
  const pattern = likePattern(query);
  const rows = await all<Record<string, any>>(c.env.DB,
    "SELECT kp.*,s.name subject_name,c.name chapter_name FROM knowledge_points kp JOIN subjects s ON s.id=kp.subject_id JOIN chapters c ON c.id=kp.chapter_id WHERE (kp.owner_id IS NULL OR kp.owner_id=?) AND (kp.title LIKE ? OR kp.summary LIKE ? OR kp.content LIKE ? OR kp.tags LIKE ?) ORDER BY CASE WHEN kp.title LIKE ? THEN 0 ELSE 1 END,kp.sort_order LIMIT ?",
    [user.id, pattern, pattern, pattern, pattern, pattern, limit]);
  const results = rows.map(parsePoint);
  return c.json({ results, total: results.length, query });
});

knowledgeRoutes.get("/vector-search", async (c) => {
  const user = c.get("user");
  const query = String(c.req.query("q") || "").trim();
  const topK = asNumber(c.req.query("top_k"), 10, 1, 30);
  if (!query) return c.json({ results: [], total: 0, query, search_method: "lexical_similarity" });
  const terms = tokens(query);
  const broad = likePattern(terms[0] || query);
  const candidates = await all<Record<string, any>>(c.env.DB,
    "SELECT id,title,content,summary,subject_id,chapter_id,tags FROM knowledge_points WHERE (owner_id IS NULL OR owner_id=?) AND (title LIKE ? OR content LIKE ? OR summary LIKE ?) LIMIT 250", [user.id, broad, broad, broad]);
  const scored = candidates.map<Record<string, any>>((row) => {
    const haystack = `${row.title} ${row.summary || ""} ${row.content || ""} ${row.tags || ""}`.toLowerCase();
    const hits = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
    const titleHits = terms.reduce((sum, term) => sum + (String(row.title).toLowerCase().includes(term) ? 2 : 0), 0);
    return { ...row, similarity: clamp((hits + titleHits) / Math.max(terms.length * 3, 1), 0, 1), search_type: "lexical" };
  }).sort((a, b) => b.similarity - a.similarity).slice(0, topK).map((row) => ({ ...row, content: String(row.content).slice(0, 300) + (String(row.content).length > 300 ? "..." : ""), similarity: Number(row.similarity.toFixed(4)) }));
  return c.json({ results: scored, total: scored.length, query, search_method: "lexical_similarity" });
});

knowledgeRoutes.get("/graph", async (c) => {
  const user = c.get("user");
  const subjectId = c.req.query("subject_id");
  const chapterId = c.req.query("chapter_id");
  const conditions: string[] = ["(kp.owner_id IS NULL OR kp.owner_id=?)"];
  const params: unknown[] = [user.id];
  if (subjectId) { conditions.push("kp.subject_id=?"); params.push(subjectId); }
  if (chapterId) { conditions.push("kp.chapter_id=?"); params.push(chapterId); }
  const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const points = await all<Record<string, any>>(c.env.DB,
    "SELECT kp.id,kp.title,kp.subject_id,kp.chapter_id,kp.parent_id,kp.importance,kp.frequency,kp.level,kp.summary,s.name subject_name,s.color subject_color,ch.name chapter_name FROM knowledge_points kp JOIN subjects s ON s.id=kp.subject_id JOIN chapters ch ON ch.id=kp.chapter_id" + where, params);
  const pointIds = new Set(points.map((p) => p.id));
  const relations = await all<Record<string, any>>(c.env.DB, "SELECT * FROM knowledge_relations");
  const nodes = points.map((p) => ({ id: p.id, label: p.title, subject_id: p.subject_id, subject_name: p.subject_name, subject_color: p.subject_color || "#8B5CF6", chapter_id: p.chapter_id, chapter_name: p.chapter_name, importance: p.importance, frequency: p.frequency, level: p.level, summary: String(p.summary || "").slice(0, 100), parent_id: p.parent_id }));
  const edges: Record<string, any>[] = [];
  const seen = new Set<string>();
  for (const r of relations) if (pointIds.has(r.source_id) && pointIds.has(r.target_id)) { const key = `${r.source_id}->${r.target_id}`; if (!seen.has(key)) { seen.add(key); edges.push({ source: r.source_id, target: r.target_id, type: r.relation_type, description: r.description, weight: r.weight }); } }
  for (const node of nodes) if (node.parent_id && pointIds.has(node.parent_id)) { const key = `${node.parent_id}->${node.id}`; if (!seen.has(key)) { seen.add(key); edges.push({ source: node.parent_id, target: node.id, type: "parent_child", description: "包含", weight: 0.5 }); } }
  const subjects = await all<Record<string, any>>(c.env.DB, "SELECT id,name,color FROM subjects");
  const chapters = [...new Map(nodes.map((n) => [n.chapter_id, { id: n.chapter_id, name: n.chapter_name, subject_id: n.subject_id }])).values()];
  return c.json({ nodes, edges, subjects: Object.fromEntries(subjects.map((s) => [s.id, { name: s.name, color: s.color }])), chapters });
});

knowledgeRoutes.get("/points/:pointId/children", async (c) => {
  const user = c.get("user");
  const rows = (await all<Record<string, any>>(c.env.DB, "SELECT * FROM knowledge_points WHERE parent_id=? AND (owner_id IS NULL OR owner_id=?) ORDER BY sort_order", [c.req.param("pointId"), user.id])).map(parsePoint);
  return c.json({ knowledge_points: rows, total: rows.length });
});

knowledgeRoutes.get("/points/:pointId/relations", async (c) => {
  const pointId = c.req.param("pointId");
  const outgoing = await all(c.env.DB, "SELECT kr.*,kp.title target_title FROM knowledge_relations kr JOIN knowledge_points kp ON kp.id=kr.target_id WHERE kr.source_id=?", [pointId]);
  const incoming = await all(c.env.DB, "SELECT kr.*,kp.title source_title FROM knowledge_relations kr JOIN knowledge_points kp ON kp.id=kr.source_id WHERE kr.target_id=?", [pointId]);
  return c.json({ outgoing, incoming });
});

knowledgeRoutes.get("/points/:pointId/exams", async (c) => {
  const rows = (await all<Record<string, any>>(c.env.DB, "SELECT * FROM exam_questions WHERE knowledge_point_id=? ORDER BY year DESC", [c.req.param("pointId")])).map(parseExam);
  return c.json({ exam_questions: rows, total: rows.length });
});

knowledgeRoutes.get("/points/:pointId", async (c) => {
  const user = c.get("user");
  const pointId = c.req.param("pointId");
  const raw = await first<Record<string, any>>(c.env.DB, "SELECT * FROM knowledge_points WHERE id=? AND (owner_id IS NULL OR owner_id=?)", [pointId, user.id]);
  if (!raw) return c.json({ detail: "知识点不存在" }, 404);
  const point = parsePoint(raw);
  point.children = await all(c.env.DB, "SELECT id,title,importance,frequency,level,mastery FROM knowledge_points WHERE parent_id=? AND (owner_id IS NULL OR owner_id=?) ORDER BY sort_order", [pointId, user.id]);
  point.relations = await all(c.env.DB, "SELECT kr.*,kp.title target_title FROM knowledge_relations kr JOIN knowledge_points kp ON kp.id=kr.target_id WHERE kr.source_id=?", [pointId]);
  point.exam_questions = (await all<Record<string, any>>(c.env.DB, "SELECT * FROM exam_questions WHERE knowledge_point_id=? ORDER BY year DESC LIMIT 10", [pointId])).map(parseExam);
  return c.json(point);
});

knowledgeRoutes.post("/points", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<Record<string, any>>();
  if (!body.subject_id || !body.chapter_id || !body.title || !body.content) return c.json({ detail: "缺少必填字段" }, 400);
  const pointId = id("kp");
  await run(c.env.DB, `INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,parent_id,title,content,summary,importance,frequency,level,tags,exam_tips,answer_template,memory_tips,key_points,case_analysis,common_mistakes,training_steps,self_test,source,sort_order,quality_version) VALUES (${Array(23).fill("?").join(",")})`, [
    pointId, user.id, body.subject_id, body.chapter_id, body.parent_id || null, body.title, body.content, body.summary || null, body.importance || "medium", body.frequency || "medium", body.level || 1, serializeJson(body.tags), body.exam_tips || null, body.answer_template || null, body.memory_tips || null, body.key_points || null, body.case_analysis || null, body.common_mistakes || null, body.training_steps || null, body.self_test || null, body.source || null, body.sort_order || 0, 2,
  ]);
  return c.json({ id: pointId, status: "created" }, 201);
});

knowledgeRoutes.put("/points/:pointId", async (c) => {
  const user = c.get("user");
  const pointId = c.req.param("pointId");
  const body = await c.req.json<Record<string, any>>();
  const allowed = ["title","content","summary","importance","frequency","level","exam_tips","answer_template","memory_tips","key_points","case_analysis","common_mistakes","training_steps","self_test","ai_explanation","mastery","sort_order"];
  const keys = allowed.filter((key) => body[key] !== undefined);
  if (body.tags !== undefined) keys.push("tags");
  if (!keys.length) return c.json({ id: pointId, status: "unchanged" });
  const values = keys.map((key) => key === "tags" ? serializeJson(body.tags) : body[key]);
  const result = await run(c.env.DB, `UPDATE knowledge_points SET ${keys.map((key) => `${key}=?`).join(",")},updated_at=CURRENT_TIMESTAMP WHERE id=? AND owner_id=?`, [...values, pointId, user.id]);
  if (!result.meta.changes) return c.json({ detail: "知识点不存在" }, 404);
  return c.json({ id: pointId, status: "updated" });
});

knowledgeRoutes.post("/relations", async (c) => {
  const body = await c.req.json<Record<string, any>>();
  const relationId = id("rel");
  await run(c.env.DB, "INSERT INTO knowledge_relations (id,source_id,target_id,relation_type,description,weight) VALUES (?,?,?,?,?,?)", [relationId, body.source_id, body.target_id, body.relation_type || "related", body.description || null, body.weight ?? 1]);
  return c.json({ id: relationId, status: "created" }, 201);
});

knowledgeRoutes.get("/exam-questions", async (c) => {
  const conditions: string[] = [];
  const params: unknown[] = [];
  for (const [key, column] of [["knowledge_point_id", "knowledge_point_id"], ["subject", "subject"], ["school", "school"], ["question_type", "question_type"]] as const) {
    const value = c.req.query(key); if (value) { conditions.push(`${column}=?`); params.push(value); }
  }
  const limit = asNumber(c.req.query("limit"), 50, 1, 200);
  const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const rows = (await all<Record<string, any>>(c.env.DB, `SELECT * FROM exam_questions${where} ORDER BY year DESC LIMIT ?`, [...params, limit])).map(parseExam);
  return c.json({ exam_questions: rows, total: rows.length });
});

knowledgeRoutes.post("/exam-questions", async (c) => {
  const body = await c.req.json<Record<string, any>>();
  const questionId = id("eq");
  await run(c.env.DB, "INSERT INTO exam_questions (id,knowledge_point_id,subject,year,school,question_type,content,options,answer,score,analysis,scoring_points,answer_framework,difficulty,frequency) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [questionId, body.knowledge_point_id || null, body.subject, body.year || null, body.school || null, body.question_type, body.content, serializeJson(body.options), body.answer, body.score || null, body.analysis || null, serializeJson(body.scoring_points), body.answer_framework || null, body.difficulty || 3, body.frequency || 0]);
  return c.json({ id: questionId, status: "created" }, 201);
});

function splitImportedDocument(content: string, fallbackTitle: string): Array<{ title: string; content: string }> {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!normalized) return [];
  const lines = normalized.split("\n");
  const sections: Array<{ title: string; paragraphs: string[] }> = [];
  let current = { title: fallbackTitle, paragraphs: [] as string[] };
  const heading = /^(?:#{1,6}\s+|\d{1,2}[.\u3001\uFF0E)]\s*)(.{2,80})$/;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    const match = line.match(heading);
    if (match && current.paragraphs.join("\n").trim()) {
      sections.push(current);
      current = { title: match[1].trim(), paragraphs: [] };
    } else if (match) {
      current.title = match[1].trim();
    } else {
      current.paragraphs.push(rawLine);
    }
  }
  if (current.paragraphs.join("\n").trim()) sections.push(current);

  const result: Array<{ title: string; content: string }> = [];
  for (const section of sections) {
    const text = section.paragraphs.join("\n").trim();
    if (!text) continue;
    if (text.length <= 6000) {
      result.push({ title: section.title, content: text });
      continue;
    }
    const paragraphs = text.split(/\n\s*\n/);
    let chunk = "";
    let part = 1;
    for (const paragraph of paragraphs) {
      if (chunk && chunk.length + paragraph.length > 6000) {
        result.push({ title: `${section.title}\uFF08${part++}\uFF09`, content: chunk.trim() });
        chunk = "";
      }
      chunk += `${paragraph}\n\n`;
    }
    if (chunk.trim()) result.push({ title: part > 1 ? `${section.title}\uFF08${part}\uFF09` : section.title, content: chunk.trim() });
  }
  return result.slice(0, 40);
}

knowledgeRoutes.get("/import/history", async (c) => {
  const user = c.get("user");
  const jobs = await all<Record<string, any>>(c.env.DB, "SELECT * FROM import_jobs WHERE user_id=? ORDER BY created_at DESC LIMIT 30", [user.id]);
  return c.json({ imports: jobs, history: jobs });
});

knowledgeRoutes.post("/import", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<Record<string, any>>().catch(() => ({} as Record<string, any>));
  const filename = String(body.filename || "\u5bfc\u5165\u6587\u6863").trim().slice(0, 180);
  const content = String(body.content || "").trim();
  const subjectId = String(body.subject_id || "").trim();
  let chapterId = String(body.chapter_id || "").trim();
  if (!content) return c.json({ detail: "\u6587\u6863\u6ca1\u6709\u53ef\u5bfc\u5165\u7684\u6587\u5b57\u5185\u5bb9" }, 400);
  if (content.length > 1_500_000) return c.json({ detail: "\u5355\u6b21\u5bfc\u5165\u6587\u5b57\u4e0d\u80fd\u8d85\u8fc7 150 \u4e07\u5b57\u7b26" }, 413);
  if (!await first(c.env.DB, "SELECT id FROM subjects WHERE id=?", [subjectId])) return c.json({ detail: "\u76ee\u6807\u5b66\u79d1\u4e0d\u5b58\u5728" }, 400);
  if (chapterId) {
    if (!await first(c.env.DB, "SELECT id FROM chapters WHERE id=? AND subject_id=?", [chapterId, subjectId])) return c.json({ detail: "\u76ee\u6807\u7ae0\u8282\u4e0e\u5b66\u79d1\u4e0d\u5339\u914d" }, 400);
  } else {
    chapterId = (await first<{ id: string }>(c.env.DB, "SELECT id FROM chapters WHERE subject_id=? ORDER BY sort_order,id LIMIT 1", [subjectId]))?.id || "";
  }
  if (!chapterId) return c.json({ detail: "\u8be5\u5b66\u79d1\u6682\u65e0\u53ef\u7528\u7ae0\u8282" }, 400);

  const jobId = id("imp");
  const extension = filename.includes(".") ? filename.split(".").pop()!.toLowerCase() : "txt";
  const storagePath = `imports/${jobId}/${filename.replace(/[^a-zA-Z0-9._\-\u4e00-\u9fff]/g, "_")}.txt`;
  await run(c.env.DB, "INSERT INTO import_jobs (id,user_id,filename,file_path,file_type,subject,status) VALUES (?,?,?,?,?,?,?)", [jobId, user.id, filename, storagePath, extension, subjectId, "processing"]);
  try {
    const sections = splitImportedDocument(content, filename.replace(/\.[^.]+$/, "") || "\u5bfc\u5165\u8d44\u6599");
    if (!sections.length) throw new Error("\u6ca1\u6709\u8bc6\u522b\u5230\u6709\u6548\u6b63\u6587");
    const statements = sections.map((section, index) => c.env.DB.prepare(
      "INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,quality_version) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    ).bind(
      id("ukp"), user.id, subjectId, chapterId, section.title.slice(0, 160), section.content,
      section.content.replace(/\s+/g, " ").slice(0, 240), "medium", "medium", 1,
      serializeJson(["\u7528\u6237\u5bfc\u5165", filename]), `user-import:${jobId}`, index, 2,
    ));
    await c.env.DB.batch(statements);
    const importMetadata: StoredFileMetadata = { name: filename, importJobId: jobId, contentType: "text/plain; charset=utf-8", size: new TextEncoder().encode(content).byteLength, uploadedAt: new Date().toISOString(), kind: "import" };
    await c.env.FILES.put(storageKey(user.id, storagePath), content, { metadata: importMetadata });
    await run(c.env.DB, "UPDATE import_jobs SET status='completed',knowledge_count=?,result_summary=?,completed_at=CURRENT_TIMESTAMP WHERE id=? AND user_id=?", [sections.length, `\u5df2\u6309\u6807\u9898\u4e0e\u6bb5\u843d\u6574\u7406\u4e3a ${sections.length} \u4e2a\u79c1\u6709\u77e5\u8bc6\u70b9`, jobId, user.id]);
    return c.json({ id: jobId, message: "\u6587\u6863\u5df2\u5bfc\u5165\u4e2a\u4eba\u77e5\u8bc6\u5e93", knowledge_count: sections.length, status: "completed" }, 201);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "\u5bfc\u5165\u5931\u8d25";
    await run(c.env.DB, "UPDATE import_jobs SET status='failed',error_message=?,completed_at=CURRENT_TIMESTAMP WHERE id=? AND user_id=?", [detail, jobId, user.id]);
    return c.json({ detail: `\u5bfc\u5165\u5931\u8d25\uff1a${detail}` }, 500);
  }
});
