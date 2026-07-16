import { Hono } from "hono";
import type { Env, Variables } from "./env";
import { all, asNumber, clamp, dateAfter, first, id, likePattern, parseRow, run, safeJson, serializeJson } from "./db";
import { MAX_FILE_BYTES, storageKey, type StoredFileMetadata } from "./file-storage";

export const contentRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

function fileType(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf") return "pdf";
  if (ext === "md" || ext === "markdown") return "markdown";
  if (["txt", "doc", "docx", "rtf"].includes(ext)) return "text";
  if (["json", "csv", "xlsx", "xls"].includes(ext)) return "data";
  return "other";
}
function sizeDisplay(size: number): string { if (size < 1024) return `${size} B`; if (size < 1024*1024) return `${(size/1024).toFixed(1)} KB`; return `${(size/1024/1024).toFixed(1)} MB`; }
function cleanFileName(name: string): string { return name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").slice(0, 160) || "file"; }

// Question bank
contentRoutes.get("/question-bank/stats", async (c) => { const total=await first<{count:number}>(c.env.DB,"SELECT COUNT(*) count FROM question_bank");const subjects=await all<{subject:string;count:number}>(c.env.DB,"SELECT subject,COUNT(*) count FROM question_bank GROUP BY subject");const types=await all<{type:string;count:number}>(c.env.DB,"SELECT type,COUNT(*) count FROM question_bank GROUP BY type");return c.json({total:total?.count||0,by_subject:Object.fromEntries(subjects.map(x=>[x.subject,x.count])),by_type:Object.fromEntries(types.map(x=>[x.type,x.count]))}) });
contentRoutes.get("/question-bank", async (c) => { let sql="SELECT * FROM question_bank WHERE 1=1";const params:unknown[]=[];const subject=c.req.query("subject"),type=c.req.query("type");if(subject){sql+=" AND subject=?";params.push(subject)}if(type){sql+=" AND type=?";params.push(type)}sql+=" ORDER BY RANDOM() LIMIT ?";params.push(asNumber(c.req.query("limit"),50,1,200));const rows=(await all<Record<string,any>>(c.env.DB,sql,params)).map(r=>parseRow(r,["options","tags"]));return c.json({questions:rows,count:rows.length}) });

// Unified search (seed index + complete knowledge base)
contentRoutes.get("/search/stats", async (c) => { const user=c.get("user");const indexed=await all<{content_type:string;count:number}>(c.env.DB,"SELECT content_type,COUNT(*) count FROM search_index GROUP BY content_type");const kp=await first<{count:number}>(c.env.DB,"SELECT COUNT(*) count FROM knowledge_points WHERE owner_id IS NULL OR owner_id=?",[user.id]);const byType=Object.fromEntries(indexed.map(x=>[x.content_type,x.count]));byType["\u77e5\u8bc6\u70b9"]=kp?.count||0;return c.json({total:Object.values(byType).reduce((a,b)=>a+Number(b),0),by_type:byType}) });
contentRoutes.get("/search", async (c) => { const user=c.get("user");const q=String(c.req.query("q")||"").trim();if(!q)return c.json({results:[],total:0,query:q});const limit=asNumber(c.req.query("limit"),20,1,100);const type=c.req.query("type"),subject=c.req.query("subject");const pattern=likePattern(q);const params:unknown[]=[pattern,pattern];let sql="SELECT id,content_type,title,content,subject,tags,importance FROM search_index WHERE (title LIKE ? OR content LIKE ?)";if(type){sql+=" AND content_type=?";params.push(type)}if(subject){sql+=" AND subject=?";params.push(subject)}sql+=" LIMIT ?";params.push(limit);let rows=await all<Record<string,any>>(c.env.DB,sql,params);if(rows.length<limit&&(!type||type==="\u77e5\u8bc6\u70b9")){const extra=await all<Record<string,any>>(c.env.DB,"SELECT id,'\u77e5\u8bc6\u70b9' content_type,title,substr(content,1,500) content,subject_id subject,tags,CASE importance WHEN 'high' THEN 3 WHEN 'medium' THEN 2 ELSE 1 END importance FROM knowledge_points WHERE (owner_id IS NULL OR owner_id=?) AND (title LIKE ? OR content LIKE ? OR summary LIKE ?) LIMIT ?",[user.id,pattern,pattern,pattern,limit-rows.length]);rows=rows.concat(extra)}return c.json({results:rows.map(r=>parseRow(r,["tags"])),total:rows.length,query:q}) });

// Cloudflare KV resource library (free tier, user-isolated keys)
contentRoutes.get("/files", async (c) => {
  const user = c.get("user");
  const listed = await c.env.FILES.list<StoredFileMetadata>({ prefix: `${user.id}/`, limit: 1000 });
  const files = listed.keys
    .filter((item) => item.metadata?.kind !== "import")
    .map((item) => {
      const metadata = item.metadata;
      const name = metadata?.name || item.name.split("/").pop() || item.name;
      const path = item.name.slice(user.id.length + 1);
      const size = Number(metadata?.size || 0);
      return {
        name,
        path,
        size,
        size_display: sizeDisplay(size),
        modified: metadata?.uploadedAt || "",
        type: fileType(name),
        extension: name.split(".").pop()?.toLowerCase() || "",
      };
    })
    .sort((a, b) => b.modified.localeCompare(a.modified));
  return c.json({ files, total: files.length });
});

contentRoutes.post("/files/upload", async (c) => {
  const user = c.get("user");
  const form = await c.req.formData();
  const value = form.get("file");
  if (!(value instanceof File)) return c.json({ detail: "\u8bf7\u9009\u62e9\u6587\u4ef6" }, 400);
  if (value.size > MAX_FILE_BYTES) return c.json({ detail: "\u5355\u4e2a\u6587\u4ef6\u4e0d\u80fd\u8d85\u8fc7 25MB" }, 413);
  const name = cleanFileName(value.name);
  const path = `${crypto.randomUUID()}_${name}`;
  const metadata: StoredFileMetadata = {
    name,
    size: value.size,
    contentType: value.type || "application/octet-stream",
    uploadedAt: new Date().toISOString(),
    kind: "library",
  };
  await c.env.FILES.put(storageKey(user.id, path), await value.arrayBuffer(), { metadata });
  return c.json({ status: "uploaded", name, path, size: value.size }, 201);
});

contentRoutes.get("/files/content/*", async (c) => {
  const user = c.get("user");
  const path = decodeURIComponent(c.req.path.split("/api/files/content/")[1] || "");
  const stored = await c.env.FILES.getWithMetadata<StoredFileMetadata>(storageKey(user.id, path), "text");
  if (stored.value === null) return c.json({ detail: "\u6587\u4ef6\u4e0d\u5b58\u5728" }, 404);
  const size = Number(stored.metadata?.size || new TextEncoder().encode(stored.value).byteLength);
  if (size > 5 * 1024 * 1024) return c.json({ detail: "\u6587\u672c\u9884\u89c8\u4ec5\u652f\u6301 5MB \u4ee5\u5185\u6587\u4ef6" }, 413);
  const name = stored.metadata?.name || path;
  return c.json({ content: stored.value, type: fileType(name), extension: name.split(".").pop()?.toLowerCase() || "" });
});

contentRoutes.get("/files/pdf/*", async (c) => {
  const user = c.get("user");
  const path = decodeURIComponent(c.req.path.split("/api/files/pdf/")[1] || "");
  const stored = await c.env.FILES.getWithMetadata<StoredFileMetadata>(storageKey(user.id, path), "arrayBuffer");
  if (stored.value === null) return c.json({ detail: "\u6587\u4ef6\u4e0d\u5b58\u5728" }, 404);
  const name = stored.metadata?.name || path;
  const headers = new Headers({
    "Content-Type": stored.metadata?.contentType || "application/pdf",
    "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(name)}`,
    "Cache-Control": "private, max-age=300",
  });
  return new Response(stored.value, { headers });
});

contentRoutes.delete("/files/*", async (c) => {
  const user = c.get("user");
  const path = decodeURIComponent(c.req.path.split("/api/files/")[1] || "");
  await c.env.FILES.delete(storageKey(user.id, path));
  return c.json({ status: "deleted" });
});

// Community
contentRoutes.get("/posts",async(c)=>{const limit=asNumber(c.req.query("limit"),20,1,100);const tag=c.req.query("tag");let sql="SELECT p.*,u.username author_name,u.avatar author_avatar FROM posts p JOIN users u ON u.id=p.user_id";const params:unknown[]=[];if(tag){sql+=" WHERE p.tags LIKE ?";params.push(likePattern(tag))}sql+=" ORDER BY p.created_at DESC LIMIT ?";params.push(limit);const rows=(await all<Record<string,any>>(c.env.DB,sql,params)).map(r=>parseRow(r,["tags"]));return c.json({posts:rows,total:rows.length})});
contentRoutes.post("/posts",async(c)=>{const user=c.get("user");const b=await c.req.json<Record<string,any>>();if(!String(b.title||"").trim()||!String(b.content||"").trim())return c.json({detail:"标题和内容不能为空"},400);const pid=id("post");await run(c.env.DB,"INSERT INTO posts (id,user_id,title,content,tags) VALUES (?,?,?,?,?)",[pid,user.id,String(b.title).trim(),String(b.content).trim(),serializeJson(Array.isArray(b.tags)?b.tags:[])]);return c.json({id:pid,status:"created"},201)});
contentRoutes.post("/posts/:id/like",async(c)=>{await run(c.env.DB,"UPDATE posts SET likes=likes+1 WHERE id=?",[c.req.param("id")]);const row=await first(c.env.DB,"SELECT likes FROM posts WHERE id=?",[c.req.param("id")]);return c.json({status:"liked",...(row||{})})});
contentRoutes.get("/posts/:id",async(c)=>{const row=await first<Record<string,any>>(c.env.DB,"SELECT p.*,u.username author_name,u.avatar author_avatar FROM posts p JOIN users u ON u.id=p.user_id WHERE p.id=?",[c.req.param("id")]);if(!row)return c.json({detail:"帖子不存在"},404);return c.json(parseRow(row,["tags"]))});

// Vocabulary: global seed words + per-user review state
contentRoutes.get("/vocabulary/stats",async(c)=>{const u=c.get("user");const totals=await first<{total:number}>(c.env.DB,"SELECT COUNT(*) total FROM vocabulary WHERE user_id IS NULL OR user_id=?",[u.id]);const mastered=await first<{count:number}>(c.env.DB,"SELECT COUNT(*) count FROM vocabulary_reviews WHERE user_id=? AND stability>=7",[u.id]);const due=await first<{count:number}>(c.env.DB,"SELECT COUNT(*) count FROM vocabulary_reviews WHERE user_id=? AND due_date<=CURRENT_TIMESTAMP",[u.id]);const today=await first<{count:number}>(c.env.DB,"SELECT COUNT(*) count FROM vocabulary_reviews WHERE user_id=? AND date(created_at)=date('now')",[u.id]);const cats=await all<{category:string;count:number}>(c.env.DB,"SELECT category,COUNT(*) count FROM vocabulary WHERE user_id IS NULL OR user_id=? GROUP BY category",[u.id]);return c.json({total:totals?.total||0,mastered:mastered?.count||0,due_now:due?.count||0,reviewed_today:today?.count||0,by_category:Object.fromEntries(cats.map(x=>[x.category,x.count]))})});
contentRoutes.get("/vocabulary/due",async(c)=>{const u=c.get("user");const limit=asNumber(c.req.query("limit"),50,1,200);const rows=await all(c.env.DB,"SELECT v.*,COALESCE(vr.stability,0) stability,COALESCE(vr.difficulty,0.5) difficulty,vr.due_date FROM vocabulary v LEFT JOIN vocabulary_reviews vr ON vr.word_id=v.id AND vr.user_id=? WHERE (v.user_id IS NULL OR v.user_id=?) AND (vr.id IS NULL OR vr.due_date<=CURRENT_TIMESTAMP) ORDER BY COALESCE(vr.due_date,'1970-01-01') LIMIT ?",[u.id,u.id,limit]);return c.json({vocabulary:rows,total:rows.length})});
contentRoutes.get("/vocabulary",async(c)=>{const u=c.get("user");const limit=asNumber(c.req.query("limit"),200,1,500);const category=c.req.query("category");let sql="SELECT v.*,COALESCE(vr.stability,0) stability,COALESCE(vr.difficulty,0.5) difficulty,vr.due_date,CASE WHEN vr.stability>=7 THEN 100 WHEN vr.stability IS NULL THEN v.mastery ELSE MIN(99,CAST(vr.stability*12 AS INTEGER)) END mastery FROM vocabulary v LEFT JOIN vocabulary_reviews vr ON vr.word_id=v.id AND vr.user_id=? WHERE (v.user_id IS NULL OR v.user_id=?)";const params:unknown[]=[u.id,u.id];if(category){sql+=" AND v.category=?";params.push(category)}sql+=" ORDER BY v.word LIMIT ?";params.push(limit);const rows=await all(c.env.DB,sql,params);return c.json({vocabulary:rows,total:rows.length})});
contentRoutes.post("/vocabulary",async(c)=>{const u=c.get("user");const b=await c.req.json<Record<string,any>>();if(!b.word||!b.meaning)return c.json({detail:"单词和释义不能为空"},400);const wid=id("voc");await run(c.env.DB,"INSERT INTO vocabulary (id,user_id,word,phonetic,meaning,example,category,is_custom) VALUES (?,?,?,?,?,?,?,1)",[wid,u.id,b.word,b.phonetic||null,b.meaning,b.example||null,b.category||"自定义"]);return c.json({id:wid,status:"created"},201)});
contentRoutes.post("/vocabulary/seed",async(c)=>{const total=await first<{count:number}>(c.env.DB,"SELECT COUNT(*) count FROM vocabulary WHERE user_id IS NULL");return c.json({status:"ready",created:0,total:total?.count||0,message:"核心词汇已随系统预置"})});
contentRoutes.post("/vocabulary/:wordId/review",async(c)=>{const u=c.get("user");const b=await c.req.json<Record<string,any>>();const rating=asNumber(String(b.rating),0);if(![1,2,3,4].includes(rating))return c.json({detail:"评分必须在 1-4 之间"},400);const old=await first<Record<string,any>>(c.env.DB,"SELECT * FROM vocabulary_reviews WHERE user_id=? AND word_id=?",[u.id,c.req.param("wordId")]);const stability=clamp(Number(old?.stability||2.5)*({1:.35,2:.8,3:1.45,4:2.2} as Record<number,number>)[rating]+.35,.2,365);const difficulty=clamp(Number(old?.difficulty||.5)+(3-rating)*.06,.1,.95);const days=rating===1?1:Math.max(1,Math.round(stability*(rating===4?1.5:rating===3?1:.45)));const due=dateAfter(days);if(old)await run(c.env.DB,"UPDATE vocabulary_reviews SET rating=?,stability=?,difficulty=?,due_date=?,review_count=review_count+1,lapse_count=lapse_count+? WHERE id=?",[rating,stability,difficulty,due,rating===1?1:0,old.id]);else await run(c.env.DB,"INSERT INTO vocabulary_reviews (id,user_id,word_id,rating,stability,difficulty,due_date,review_count,lapse_count) VALUES (?,?,?,?,?,?,?,?,?)",[id("vr"),u.id,c.req.param("wordId"),rating,stability,difficulty,due,1,rating===1?1:0]);await run(c.env.DB,"UPDATE vocabulary SET review_count=review_count+1,last_reviewed=CURRENT_TIMESTAMP,next_review=? WHERE id=?",[due,c.req.param("wordId")]);return c.json({status:"reviewed",next_review:due,stability,interval_days:days})});
