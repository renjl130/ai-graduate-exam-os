import { Hono } from "hono";
import type { Env, Variables } from "./env";
import { storageKey, type StoredFileMetadata } from "./file-storage";
import { all, asNumber, first, id, likePattern, run } from "./db";

export const aiRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

async function knowledgeContext(db: D1Database, userId: string, query: string, limit = 4): Promise<string> {
  const terms = query.trim().split(/\s+/).filter(Boolean).slice(0, 4);
  if (!terms.length) return "";
  const pattern = likePattern(terms[0]);
  const rows = await all<Record<string, any>>(db,
    "SELECT title,summary,content,exam_tips,answer_template FROM knowledge_points WHERE (owner_id IS NULL OR owner_id=?) AND (title LIKE ? OR content LIKE ? OR summary LIKE ?) ORDER BY importance='high' DESC LIMIT ?",
    [userId, pattern, pattern, pattern, limit]);
  return rows.map((row, i) => `资料${i + 1}《${row.title}》\n${row.summary || ""}\n${String(row.content || "").slice(0, 1600)}\n答题提示：${row.exam_tips || ""}\n答题模板：${row.answer_template || ""}`).join("\n\n");
}

function resultText(result: any): string {
  if (typeof result === "string") return result;
  if (typeof result?.response === "string") return result.response;
  if (typeof result?.result?.response === "string") return result.result.response;
  if (Array.isArray(result?.choices)) return result.choices[0]?.message?.content || result.choices[0]?.text || "";
  return "";
}

async function askAI(env: Env, messages: Array<{ role: string; content: string }>, maxTokens = 1200): Promise<string> {
  const result = await env.AI.run(env.AI_MODEL, { messages, max_tokens: maxTokens, temperature: 0.35 });
  const text = resultText(result).trim();
  if (!text) throw new Error("模型没有返回有效内容");
  return text;
}

aiRoutes.get("/chat/models", (c) => c.json({ provider: "cloudflare-workers-ai", models: [{ id: c.env.AI_MODEL, name: "Cloudflare AI 免费模型", available: true }], current: c.env.AI_MODEL }));

aiRoutes.post("/chat", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<Record<string, any>>().catch(() => ({} as Record<string, any>));
  const message = String(body.message || "").trim();
  if (!message) return c.json({ detail: "消息不能为空" }, 400);
  let conversationId = String(body.conversation_id || "");
  if (conversationId) {
    const owned = await first(c.env.DB, "SELECT id FROM conversations WHERE id=? AND user_id=?", [conversationId, user.id]);
    if (!owned) return c.json({ detail: "对话不存在" }, 404);
  } else {
    conversationId = id("conv");
    await run(c.env.DB, "INSERT INTO conversations (id,user_id,title,subject) VALUES (?,?,?,?)", [conversationId, user.id, message.slice(0, 40), body.subject || null]);
  }
  await run(c.env.DB, "INSERT INTO messages (id,conversation_id,role,content) VALUES (?,?,?,?)", [id("msg"), conversationId, "user", message]);
  const history = await all<{ role: string; content: string }>(c.env.DB, "SELECT role,content FROM messages WHERE conversation_id=? ORDER BY created_at DESC LIMIT 10", [conversationId]);
  history.reverse();
  const context = await knowledgeContext(c.env.DB, user.id, message);
  const system = "你是严谨、耐心的中国新闻传播学考研导师。优先依据提供的系统知识库回答；区分概念、理论逻辑、适用边界、真题写法和常见误区。不得编造院校真题或数据。回答使用清晰的 Markdown 层级。" + (context ? `\n\n系统知识库：\n${context}` : "");
  let answer = "";
  try {
    answer = await askAI(c.env, [{ role: "system", content: system }, ...history], 1600);
  } catch (error) {
    return c.json({ detail: `免费 AI 暂时不可用：${error instanceof Error ? error.message : "未知错误"}` }, 503);
  }
  await c.env.DB.batch([
    c.env.DB.prepare("INSERT INTO messages (id,conversation_id,role,content,model,provider) VALUES (?,?,?,?,?,?)").bind(id("msg"), conversationId, "assistant", answer, c.env.AI_MODEL, "cloudflare-workers-ai"),
    c.env.DB.prepare("UPDATE conversations SET updated_at=CURRENT_TIMESTAMP,message_count=message_count+2 WHERE id=?").bind(conversationId),
  ]);
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const lines = [
        JSON.stringify({ type: "status", content: "正在结合知识库生成答案…" }),
        ...answer.match(/[\s\S]{1,120}/g)!.map((chunk) => JSON.stringify({ type: "content", content: chunk })),
        JSON.stringify({ type: "done", model: c.env.AI_MODEL, provider: "cloudflare-workers-ai", conversation_id: conversationId }),
      ];
      controller.enqueue(encoder.encode(lines.join("\n") + "\n"));
      controller.close();
    },
  });
  return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache" } });
});

aiRoutes.get("/conversations", async (c) => { const page=asNumber(c.req.query("page"),1,1);const limit=asNumber(c.req.query("limit"),50,1,100);const user=c.get("user");const total=await first<{count:number}>(c.env.DB,"SELECT COUNT(*) count FROM conversations WHERE user_id=?",[user.id]);const rows=await all(c.env.DB,"SELECT * FROM conversations WHERE user_id=? ORDER BY updated_at DESC LIMIT ? OFFSET ?",[user.id,limit,(page-1)*limit]);return c.json({total:total?.count||0,page,conversations:rows}) });
aiRoutes.get("/conversations/:id/messages",async(c)=>{const user=c.get("user");if(!await first(c.env.DB,"SELECT id FROM conversations WHERE id=? AND user_id=?",[c.req.param("id"),user.id]))return c.json({detail:"对话不存在"},404);const rows=await all(c.env.DB,"SELECT * FROM messages WHERE conversation_id=? ORDER BY created_at",[c.req.param("id")]);return c.json({conversation_id:c.req.param("id"),messages:rows})});
aiRoutes.delete("/conversations/:id",async(c)=>{const user=c.get("user");await run(c.env.DB,"DELETE FROM conversations WHERE id=? AND user_id=?",[c.req.param("id"),user.id]);return c.json({status:"deleted"})});

aiRoutes.post("/ai/organize", async (c) => { const body=await c.req.json<Record<string,any>>();const content=String(body.content||"").trim();if(!content)return c.json({detail:"内容不能为空"},400);try{const result=await askAI(c.env,[{role:"system",content:"将用户资料整理为适合考研复习的结构化 Markdown：核心命题、概念定义、理论逻辑、案例、答题框架、易错点、主动回忆题。忠于原文，不编造。"},{role:"user",content:`主题：${body.topic||"未指定"}\n\n${content.slice(0,18000)}`}],1800);return c.json({result})}catch(e){return c.json({detail:`AI 整理失败：${e instanceof Error?e.message:"未知错误"}`},503)} });
aiRoutes.post("/ai/analyze-file", async (c) => { const user=c.get("user");const body=await c.req.json<Record<string,any>>();const path=String(body.file_path||"");const stored=await c.env.FILES.getWithMetadata<StoredFileMetadata>(storageKey(user.id,path),"text");if(stored.value===null)return c.json({detail:"\u6587\u4ef6\u4e0d\u5b58\u5728"},404);const size=Number(stored.metadata?.size||new TextEncoder().encode(stored.value).byteLength);if(size>5*1024*1024)return c.json({detail:"AI \u6587\u672c\u5206\u6790\u652f\u6301 5MB \u4ee5\u5185\u6587\u4ef6"},413);const name=stored.metadata?.name||path;if(name.toLowerCase().endsWith(".pdf"))return c.json({detail:"PDF \u8bf7\u5148\u5728\u6d4f\u89c8\u5668\u4e2d\u590d\u5236\u9700\u8981\u5206\u6790\u7684\u6587\u5b57\uff0c\u4e91\u7aef\u514d\u8d39\u6a21\u5f0f\u6682\u4e0d\u8bfb\u53d6 PDF \u4e8c\u8fdb\u5236\u3002"},422);const content=stored.value.slice(0,18000);try{const result=await askAI(c.env,[{role:"system",content:"\u5206\u6790\u8fd9\u4efd\u8003\u7814\u8d44\u6599\uff0c\u8f93\u51fa\u5185\u5bb9\u6982\u8981\u3001\u6838\u5fc3\u77e5\u8bc6\u70b9\u3001\u53ef\u8003\u9898\u578b\u3001\u7b54\u9898\u6846\u67b6\u3001\u9057\u6f0f\u98ce\u9669\u548c\u590d\u4e60\u5efa\u8bae\u3002"},{role:"user",content}],1600);return c.json({result,filename:name})}catch(e){return c.json({detail:`AI \u5206\u6790\u5931\u8d25\uff1a${e instanceof Error?e.message:"\u672a\u77e5\u9519\u8bef"}`},503)} });
aiRoutes.post("/ai/organize-file", async (c) => { const body=await c.req.json<Record<string,any>>();const fake=new Request(c.req.url,{method:"POST",headers:c.req.raw.headers,body:JSON.stringify({file_path:body.file_path})});return c.json({detail:"请使用“AI 分析”或打开文件后复制文本到“资料整理”。"},422) });
aiRoutes.post("/ai/knowledge-explain", async (c) => { const user=c.get("user");const body=await c.req.json<Record<string,any>>();const point=await first<Record<string,any>>(c.env.DB,"SELECT * FROM knowledge_points WHERE id=? AND (owner_id IS NULL OR owner_id=?)",[body.knowledge_point_id,user.id]);if(!point)return c.json({detail:"知识点不存在"},404);const level=body.level||"考研强化";try{const explanation=await askAI(c.env,[{role:"system",content:"你是新闻传播学考研导师。用定义、逻辑链、边界辨析、案例、答题模板、易错点和自测题讲透知识点。"},{role:"user",content:`讲解层级：${level}\n标题：${point.title}\n内容：${point.content}\n答题模板：${point.answer_template||""}\n常见误区：${point.common_mistakes||""}`}],1800);return c.json({explanation,knowledge_point_id:point.id,model:c.env.AI_MODEL,provider:"cloudflare-workers-ai"})}catch(e){return c.json({detail:`AI 讲解失败：${e instanceof Error?e.message:"未知错误"}`},503)} });
aiRoutes.post("/ai/answer-helper",async(c)=>{const b=await c.req.json<Record<string,any>>();try{const result=await askAI(c.env,[{role:"system",content:"你是考研主观题阅卷与答题训练老师。输出审题、论点结构、理论依据、案例配置、参考答案与评分点。"},{role:"user",content:`题目：${b.question||""}\n用户答案：${b.answer||"未作答"}\n科目：${b.subject||"新闻传播"}`}],1600);return c.json({result})}catch(e){return c.json({detail:"AI 暂时不可用"},503)}});
aiRoutes.post("/ai/wrong-analysis",async(c)=>{const b=await c.req.json<Record<string,any>>();try{const result=await askAI(c.env,[{role:"system",content:"分析错题根因，区分知识、审题、表达、记忆和时间管理问题，给出纠错步骤与变式训练。"},{role:"user",content:JSON.stringify(b)}],1200);return c.json({result})}catch(e){return c.json({detail:"AI 暂时不可用"},503)}});
aiRoutes.post("/ai/study-plan",async(c)=>{const b=await c.req.json<Record<string,any>>();try{const result=await askAI(c.env,[{role:"system",content:"生成可执行的考研学习计划，必须包含阶段目标、每天时间块、复习循环、真题训练、周复盘和调整规则。"},{role:"user",content:JSON.stringify(b)}],1600);return c.json({result})}catch(e){return c.json({detail:"AI 暂时不可用"},503)}});
