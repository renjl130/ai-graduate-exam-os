"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect, useRef } from "react";
import { saveExamResult, getToken } from "@/lib/api";

interface Question {
  id: string;
  type: "choice" | "short_answer" | "essay" | "term";
  subject: string;
  question: string;
  options?: string[];
  answer: string;
  score: number;
  explanation: string;
}

const defaultQuestions: Question[] = [
  { id: "q1", type: "choice", subject: "440", score: 5, question: "议程设置理论的提出者是？", options: ["A. 李普曼", "B. 麦库姆斯和肖", "C. 拉扎斯菲尔德", "D. 诺依曼"], answer: "B", explanation: "议程设置理论由美国传播学者麦库姆斯（McCombs）和肖（Shaw）在1972年教堂山研究中正式提出。" },
  { id: "q2", type: "choice", subject: "440", score: 5, question: "沉默的螺旋理论提出的学者是？", options: ["A. 格伯纳", "B. 霍尔", "C. 诺依曼", "D. 卡茨"], answer: "C", explanation: "沉默的螺旋由德国传播学者伊丽莎白·诺尔-诺依曼（Noelle-Neumann）于1974年提出。" },
  { id: "q3", type: "choice", subject: "440", score: 5, question: "把关人理论最初由哪位学者提出？", options: ["A. 怀特", "B. 卢因", "C. 拉斯韦尔", "D. 施拉姆"], answer: "B", explanation: "把关人（Gatekeeper）概念最初由库尔特·卢因（Lewin）于1947年提出，后由怀特引入新闻传播研究。" },
  { id: "q4", type: "choice", subject: "440", score: 5, question: "以下哪个理论强调受众的主动性？", options: ["A. 子弹论", "B. 培养理论", "C. 使用与满足理论", "D. 议程设置理论"], answer: "C", explanation: "使用与满足理论强调受众是主动的，基于自身需求选择和使用媒介来获得满足。" },
  { id: "q5", type: "choice", subject: "440", score: 5, question: "信息茧房概念由哪位学者提出？", options: ["A. 桑斯坦", "B. 麦克卢汉", "C. 哈贝马斯", "D. 罗杰斯"], answer: "A", explanation: "信息茧房（Information Cocoon）由美国学者凯斯·桑斯坦（Cass Sunstein）在《信息乌托邦》中提出。" },
  { id: "q6", type: "short_answer", subject: "440", score: 15, question: "简述议程设置理论的三个层次及其新媒体环境下的发展。", answer: "三个层次：1.议题议程设置（第一层）：媒体影响人们关注哪些议题；2.属性议程设置（第二层）：影响人们如何看待议题的特定属性；3.网络议程设置（第三层）：影响要素之间的关联网络。新媒体环境下发展：议程融合理论认为受众在社交媒体中主动寻求信息来满足归属需求，议程设置从单向变为双向互动。", explanation: "需要答出三个层次的名称和简要解释，以及新媒体环境下的发展（议程融合/网络议程设置）。" },
  { id: "q7", type: "short_answer", subject: "440", score: 15, question: "简述传播学经验学派与批判学派的区别。", answer: "区别：1.研究目的：经验学派关注效果和功能，批判学派关注权力和意识形态；2.研究方法：经验学派偏重定量、实证，批判学派偏重定性、思辨；3.理论立场：经验学派维护现有体制，批判学派质疑和批判现有体制；4.学科背景：经验学派源于美国社会学，批判学派源于欧洲哲学（法兰克福学派、伯明翰学派）。", explanation: "从研究目的、方法、立场、背景四个角度对比。" },
  { id: "q8", type: "short_answer", subject: "334", score: 15, question: "简述新闻采访中观察法的类型和应用。", answer: "观察法类型：1.参与观察：记者深入采访对象的生活环境进行观察；2.非参与观察：记者以旁观者身份观察；3.隐蔽观察：不暴露记者身份的观察；4.公开观察：暴露身份的观察。应用场景：现场报道、体验式采访、调查性报道、人物特写等。", explanation: "需要答出观察法的主要类型和具体应用场景。" },
  { id: "q9", type: "essay", subject: "440", score: 30, question: "结合传播学理论，分析短视频平台的传播机制与社会影响。", answer: "1.传播机制：算法推荐+社交分发+内容池；2.使用与满足视角：满足娱乐、社交、自我表达需求；3.培养理论视角：长期接触影响价值观和行为模式；4.信息茧房：算法推荐导致信息窄化；5.社会影响：文化传播、经济带动、注意力碎片化、青少年保护。", explanation: "需要结合具体传播学理论分析，有正面和负面分析。" },
  { id: "q10", type: "essay", subject: "334", score: 30, question: "结合实例论述人工智能对新闻生产的影响及伦理挑战。", answer: "1.影响：自动写作、智能编辑、个性化分发、事实核查辅助；2.效率提升：降低成本、加快速度、扩大覆盖面；3.伦理挑战：真实性危机、算法偏见、版权争议、就业冲击；4.案例：腾讯Dreamwriter、新华社AI主播；5.应对：人机协作、伦理规范、技术治理。", explanation: "需要有具体案例、正反分析、伦理讨论。" },
];

export default function MockExamPage() {
  const [examState, setExamState] = useState<"idle" | "active" | "review">("idle");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(180 * 60);
  const [score, setScore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [generating, setGenerating] = useState(false);
  const [genSubject, setGenSubject] = useState("440");
  const [genDifficulty, setGenDifficulty] = useState("中等");
  const [genError, setGenError] = useState("");
  const [bankStats, setBankStats] = useState<{ total: number; by_subject: Record<string, number> } | null>(null);

  const getHeaders = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // 从题库加载题目
  const loadFromBank = async (subject?: string) => {
    try {
      const params = new URLSearchParams({ limit: "20" });
      if (subject) params.set("subject", subject);
      const res = await fetch(`${API_BASE}/api/question-bank?${params}`, { headers: getHeaders() });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        const bankQuestions: Question[] = data.questions.map((q: Record<string, unknown>) => ({
          id: q.id as string,
          type: (q.type as string) || "short_answer",
          subject: (q.subject as string) || "440",
          question: q.question as string,
          options: q.options as string[] | undefined,
          answer: (q.answer as string) || "",
          score: (q.score as number) || 10,
          explanation: (q.explanation as string) || "",
        }));
        return bankQuestions;
      }
    } catch { /* ignore */ }
    return null;
  };

  // 加载题库统计
  useEffect(() => {
    fetch(`${API_BASE}/api/question-bank/stats`, { headers: getHeaders() })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setBankStats(data); })
      .catch(() => {});
  }, []);

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '20px',
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
  };

  useEffect(() => {
    if (examState === "active") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(timerRef.current!); handleSubmit(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [examState]);

  const startExam = (q?: Question[]) => {
    if (q) setQuestions(q);
    setExamState("active"); setCurrentIdx(0); setAnswers({}); setTimeLeft(180 * 60); setScore(0);
  };

  const handleAiGenerate = async () => {
    setGenerating(true);
    setGenError("");
    const token = getToken();
    try {
      const res = await fetch(`${API_BASE}/api/exam/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ subject: genSubject, count: 10, difficulty: genDifficulty }),
      });
      const data = await res.json();
      if (data.error) {
        setGenError(data.error);
        return;
      }
      const aiQuestions: Question[] = (data.questions || []).map((q: Record<string, unknown>, i: number) => ({
        id: `ai_${i}`,
        type: (q.type as string) || "short_answer",
        subject: genSubject,
        question: (q.question as string) || "",
        options: q.options as string[] | undefined,
        answer: (q.answer as string) || "",
        score: (q.score as number) || 10,
        explanation: (q.explanation as string) || "",
      }));
      if (aiQuestions.length > 0) {
        startExam(aiQuestions);
      } else {
        setGenError("AI 未生成有效题目，请重试");
      }
    } catch {
      setGenError("AI 生成失败，请检查网络连接");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let totalScore = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q.id] || "";
      if (q.type === "choice") { if (userAnswer === q.answer) totalScore += q.score; }
      else if (q.type === "short_answer") {
        const keywords = q.answer.split(/[,，、；;]/).map((k) => k.trim()).filter(Boolean);
        const matched = keywords.filter((kw) => userAnswer.includes(kw.substring(0, 4))).length;
        totalScore += Math.round((matched / keywords.length) * q.score);
      } else { totalScore += Math.round(q.score * 0.6); }
    });
    setScore(totalScore);
    setExamState("review");
    const totalTime = 180 * 60;
    const timeUsed = totalTime - timeLeft;
    try {
      await saveExamResult({
        subject: questions[0]?.subject || "440",
        difficulty: genDifficulty,
        total_questions: questions.length,
        total_score: questions.reduce((s, q) => s + q.score, 0),
        score: totalScore,
        time_used: Math.floor(timeUsed / 60),
        questions: questions.map(q => ({ id: q.id, type: q.type, question: q.question, answer: q.answer, score: q.score })),
        answers,
      });
    } catch { /* ignore */ }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600); const m = Math.floor((seconds % 3600) / 60); const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalScore = questions.reduce((s, q) => s + q.score, 0);

  if (examState === "idle") {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">模拟考试</h2>
          <p className="text-sm text-gray-400 mt-1">模拟真实考试环境 · AI自动评分</p>
        </div>

        {/* 题库统计 */}
        {bankStats && (
          <div className="p-5 rounded-2xl mb-6" style={cardStyle}>
            <h3 className="font-semibold mb-3 text-white">📚 题库统计</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{bankStats.total}</div>
                <div className="text-xs text-gray-400">总题目数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{bankStats.by_subject?.["440"] || 0}</div>
                <div className="text-xs text-gray-400">440题目</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{bankStats.by_subject?.["334"] || 0}</div>
                <div className="text-xs text-gray-400">334题目</div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
          <h3 className="text-lg font-bold mb-4 text-white">深大新传MJC模拟考试</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: "题目数量", value: `${questions.length}题`, color: "#3b82f6" },
              { label: "满分", value: `${totalScore}分`, color: "#10b981" },
              { label: "考试时间", value: "180分钟", color: "#f59e0b" },
              { label: "题型", value: "选择+简答+论述", color: "#8b5cf6" },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-xs text-gray-400">{s.label}</div>
                <div className="text-xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <p className="text-xs text-yellow-400">注意：开始考试后计时器将启动，时间到自动提交。选择题自动评分，简答题/论述题按关键词匹配评分。</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => startExam()}
              className="flex-1 py-3.5 rounded-xl text-base font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
              }}
            >
              默认试卷
            </button>
            <button
              onClick={async () => {
                setGenerating(true);
                const bankQ = await loadFromBank(genSubject);
                if (bankQ && bankQ.length > 0) {
                  startExam(bankQ);
                } else {
                  setGenError("题库中暂无该科目题目");
                }
                setGenerating(false);
              }}
              disabled={generating}
              className="flex-1 py-3.5 rounded-xl text-base font-semibold text-white transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 4px 15px rgba(16,185,129,0.4)',
              }}
            >
              {generating ? "加载中..." : "📚 题库抽题"}
            </button>
            <button
              onClick={handleAiGenerate}
              disabled={generating}
              className="flex-1 py-3.5 rounded-xl text-base font-semibold text-white transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                boxShadow: '0 4px 15px rgba(139,92,246,0.4)',
              }}
            >
              {generating ? "AI 生成中..." : "🤖 AI 出题"}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
          <h3 className="font-semibold mb-4 text-white">AI 智能出题</h3>
          <div className="flex gap-3">
            <select
              value={genSubject}
              onChange={(e) => setGenSubject(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
              style={{ ...inputStyle, width: 'auto', appearance: 'none' }}
            >
              <option value="440">440 新传基础</option>
              <option value="334">334 新传综合</option>
              <option value="英语二">英语二</option>
              <option value="政治">政治</option>
            </select>
            <select
              value={genDifficulty}
              onChange={(e) => setGenDifficulty(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
              style={{ ...inputStyle, width: 'auto', appearance: 'none' }}
            >
              <option value="简单">简单</option>
              <option value="中等">中等</option>
              <option value="困难">困难</option>
            </select>
          </div>
          {genError && <p className="text-xs mt-3 text-red-400">{genError}</p>}
          {generating && <p className="text-xs mt-3 text-gray-400">AI 正在出题，预计需要 30-60 秒...</p>}
        </div>

        <div className="p-6 rounded-2xl" style={cardStyle}>
          <h3 className="font-semibold mb-4 text-white">考试说明</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>本次模拟考试包含440和334两科题目，涵盖选择题、简答题和论述题。</p>
            <p>选择题（{questions.filter((q) => q.type === "choice").length}题，{questions.filter((q) => q.type === "choice").reduce((s, q) => s + q.score, 0)}分）：自动评分</p>
            <p>简答题（{questions.filter((q) => q.type === "short_answer").length}题，{questions.filter((q) => q.type === "short_answer").reduce((s, q) => s + q.score, 0)}分）：关键词匹配评分</p>
            <p>论述题（{questions.filter((q) => q.type === "essay").length}题，{questions.filter((q) => q.type === "essay").reduce((s, q) => s + q.score, 0)}分）：综合评估</p>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentIdx];
  const typeLabel: Record<string, string> = { choice: "选择题", short_answer: "简答题", essay: "论述题", term: "名词解释" };

  if (examState === "active") {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        {/* Timer Bar */}
        <div className="flex items-center justify-between mb-6 p-5 rounded-2xl" style={cardStyle}>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-white">模拟考试</span>
            <span className="text-xs px-3 py-1 rounded-lg"
              style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
              {typeLabel[question.type]}
            </span>
            <span className="text-xs text-gray-400">{question.subject} · {question.score}分</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl font-mono font-bold"
              style={{ color: timeLeft < 600 ? '#ef4444' : '#3b82f6' }}>
              {formatTime(timeLeft)}
            </span>
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                boxShadow: '0 4px 15px rgba(239,68,68,0.4)',
              }}
            >
              交卷
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-blue-400">第 {currentIdx + 1} 题</span>
            <span className="text-xs px-3 py-1 rounded-lg"
              style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
              {question.score}分
            </span>
          </div>
          <p className="text-base mb-6 leading-relaxed text-white">{question.question}</p>

          {question.type === "choice" && question.options && (
            <div className="space-y-3">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAnswers({ ...answers, [question.id]: opt.charAt(0) })}
                  className="w-full p-4 rounded-xl text-left text-sm transition-all duration-200"
                  style={{
                    background: answers[question.id] === opt.charAt(0)
                      ? 'rgba(59,130,246,0.15)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${answers[question.id] === opt.charAt(0) ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.06)'}`,
                    color: answers[question.id] === opt.charAt(0) ? '#60a5fa' : '#d1d5db',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {(question.type === "short_answer" || question.type === "essay" || question.type === "term") && (
            <textarea
              value={answers[question.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              placeholder={question.type === "essay" ? "请输入论述内容（建议800-1200字）..." : question.type === "term" ? "请输入名词解释（建议100-200字）..." : "请简要回答（建议200-400字）..."}
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              style={inputStyle}
              rows={question.type === "essay" ? 12 : question.type === "term" ? 4 : 6}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 transition-all disabled:opacity-50"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            上一题
          </button>
          <div className="flex gap-1.5">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className="w-9 h-9 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: i === currentIdx
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                    : answers[q.id]
                    ? 'rgba(16,185,129,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  color: i === currentIdx || answers[q.id] ? '#fff' : '#6b7280',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {currentIdx === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                boxShadow: '0 4px 15px rgba(239,68,68,0.4)',
              }}
            >
              交卷
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
              }}
            >
              下一题
            </button>
          )}
        </div>
      </div>
    );
  }

  // Review state
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">考试结果</h2>
          <p className="text-sm text-gray-400 mt-1">模拟考试 #1</p>
        </div>
        <button
          onClick={() => startExam()}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
          }}
        >
          重新考试
        </button>
      </div>

      <div className="p-8 rounded-2xl mb-6" style={cardStyle}>
        <div className="text-center mb-6">
          <div className="text-7xl font-bold mb-2"
            style={{ color: score >= totalScore * 0.6 ? '#10b981' : '#ef4444' }}>
            {score}
          </div>
          <div className="text-sm text-gray-400">满分 {totalScore} 分</div>
          <div className="text-xl font-semibold mt-3"
            style={{ color: score >= totalScore * 0.6 ? '#10b981' : '#ef4444' }}>
            {score >= totalScore * 0.8 ? "🎉 优秀" : score >= totalScore * 0.6 ? "✅ 及格" : "⚠️ 需加强"}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: `${questions.filter((q) => q.type === "choice" && answers[q.id] === q.answer).length}/${questions.filter((q) => q.type === "choice").length}`, label: "选择题正确", color: "#10b981" },
            { value: `${questions.filter((q) => q.type === "short_answer").length}题`, label: "简答题", color: "#f59e0b" },
            { value: `${questions.filter((q) => q.type === "essay").length}题`, label: "论述题", color: "#3b82f6" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => {
          const userAnswer = answers[q.id] || "未作答";
          const isCorrect = q.type === "choice" ? userAnswer === q.answer : undefined;
          return (
            <div key={q.id} className="p-5 rounded-2xl" style={cardStyle}>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-blue-400">第{i + 1}题</span>
                <span className="text-xs px-2 py-0.5 rounded-lg"
                  style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
                  {typeLabel[q.type]} · {q.score}分
                </span>
                {isCorrect !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-lg"
                    style={{
                      background: isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                      color: isCorrect ? '#34d399' : '#f87171',
                    }}>
                    {isCorrect ? "✓ 正确" : "✗ 错误"}
                  </span>
                )}
              </div>
              <p className="text-sm mb-3 text-gray-200">{q.question}</p>
              <div className="text-xs mb-2">
                <span className="text-gray-400">你的答案: </span>
                <span className="text-gray-200">{userAnswer}</span>
              </div>
              <div className="text-xs mb-3">
                <span className="text-gray-400">正确答案: </span>
                <span className="text-green-400">{q.answer}</span>
              </div>
              <div className="p-3 rounded-xl text-xs" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <span className="font-semibold text-yellow-400">解析: </span>
                <span className="text-gray-300">{q.explanation}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
