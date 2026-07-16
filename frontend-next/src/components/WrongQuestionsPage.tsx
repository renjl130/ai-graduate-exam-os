"use client";

import { useState, useEffect } from "react";
import { getWrongQuestions, createWrongQuestion, updateWrongQuestion, deleteWrongQuestion, getWrongQuestionsAnalysis, getToken } from "@/lib/api";

interface WrongQuestion {
  id: string;
  content: string;
  subject: string;
  topic?: string;
  answer?: string;
  user_answer?: string;
  error_type?: string;
  error_analysis?: string;
  wrong_count: number;
  mastery: number;
  last_wrong_at?: string;
  created_at: string;
}

interface Analysis {
  total: number;
  by_subject: Record<string, { count: number; avg_mastery: number }>;
  by_topic: Record<string, { count: number; avg_mastery: number }>;
  weak_points: string[];
}

const subjectColors: Record<string, string> = {
  "440": "var(--orange-500)",
  "334": "var(--green-500)",
  "英语二": "var(--brand-500)",
  "政治": "var(--red-500)",
};

export default function WrongQuestionsPage() {
  const [questions, setQuestions] = useState<WrongQuestion[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [filterSubject, setFilterSubject] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newQ, setNewQ] = useState({ subject: "440", chapter: "", question: "", user_answer: "", correct_answer: "", explanation: "", error_reason: "", tags: "" });

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: '16px',
  };

  const inputStyle = {
    background: 'var(--glass-06)',
    border: '1px solid var(--glass-10)',
    borderRadius: '12px',
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [qRes, aRes] = await Promise.all([
        getWrongQuestions(filterSubject === "all" ? undefined : filterSubject),
        getWrongQuestionsAnalysis(),
      ]);
      setQuestions(qRes.questions || []);
      setAnalysis(aRes);
    } catch {
      const saved = localStorage.getItem("exam_os_wrong_questions");
      if (saved) {
        const parsed = JSON.parse(saved);
        setQuestions(parsed.map((q: Record<string, unknown>) => ({
          id: q.id as string,
          content: q.question as string,
          subject: q.subject as string,
          topic: q.chapter as string,
          answer: q.correctAnswer as string,
          user_answer: q.userAnswer as string,
          error_type: q.errorReason as string,
          error_analysis: q.explanation as string,
          wrong_count: q.errorCount as number,
          mastery: q.masteryLevel as number,
          last_wrong_at: q.lastWrongDate as string,
        })));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [filterSubject]);

  const addQuestion = async () => {
    if (!newQ.question.trim()) return;
    try {
      await createWrongQuestion({
        subject: newQ.subject,
        chapter: newQ.chapter || undefined,
        question: newQ.question,
        user_answer: newQ.user_answer || undefined,
        correct_answer: newQ.correct_answer || undefined,
        explanation: newQ.explanation || undefined,
        error_reason: newQ.error_reason || undefined,
        tags: newQ.tags.split(",").map(t => t.trim()).filter(Boolean),
      });
      setShowAdd(false);
      setNewQ({ subject: "440", chapter: "", question: "", user_answer: "", correct_answer: "", explanation: "", error_reason: "", tags: "" });
      fetchData();
    } catch { /* ignore */ }
  };

  const updateMastery = async (id: string, level: number) => {
    try {
      await updateWrongQuestion(id, { mastery: level });
      setQuestions(prev => prev.map(q => q.id === id ? { ...q, mastery: level } : q));
    } catch { /* ignore */ }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWrongQuestion(id);
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch { /* ignore */ }
  };

  const filtered = filterSubject === "all" ? questions : questions.filter(q => q.subject === filterSubject);
  const avgMastery = questions.length > 0 ? Math.round(questions.reduce((s, q) => s + q.mastery, 0) / questions.length) : 0;

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto"
            style={{ background: 'linear-gradient(135deg, color-mix(in srgb,var(--red-500) 20%,transparent), color-mix(in srgb,var(--orange-500) 20%,transparent))' }}>
            ❌
          </div>
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">错题本</h2>
          <p className="text-sm text-gray-400 mt-1">记录错题 · 分析薄弱环节 · 专项突破</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))',
            boxShadow: '0 4px 15px color-mix(in srgb,var(--brand-500) 40%,transparent)',
          }}
        >
          + 添加错题
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { value: `${questions.length}`, label: "错题总数", color: "var(--red-500)" },
          { value: `${questions.filter(q => q.mastery < 50).length}`, label: "未掌握", color: "var(--orange-500)" },
          { value: `${questions.filter(q => q.mastery >= 80).length}`, label: "已掌握", color: "var(--green-500)" },
          { value: `${avgMastery}%`, label: "平均掌握度", color: "var(--brand-500)" },
        ].map(s => (
          <div key={s.label} className="p-5 rounded-2xl text-center" style={cardStyle}>
            <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weak Points Analysis */}
      {analysis && analysis.by_topic && Object.keys(analysis.by_topic).length > 0 && (
        <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
          <h3 className="font-semibold mb-4 text-white">薄弱环节分析</h3>
          <div className="space-y-3">
            {Object.entries(analysis.by_topic)
              .map(([name, data]) => ({ name, count: data.count, avgMastery: data.avg_mastery }))
              .sort((a, b) => a.avgMastery - b.avgMastery)
              .slice(0, 5)
              .map(item => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-xs w-32 truncate text-gray-300">{item.name}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--glass-05)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${item.avgMastery}%`,
                        background: item.avgMastery < 40 ? 'var(--red-500)' : item.avgMastery < 70 ? 'var(--orange-500)' : 'var(--green-500)',
                      }}
                    />
                  </div>
                  <span className="text-xs w-12 text-right text-gray-400">{item.avgMastery}%</span>
                  <span className="text-xs w-8 text-right text-gray-500">{item.count}题</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "440", "334", "英语二", "政治"].map(s => (
          <button
            key={s}
            onClick={() => setFilterSubject(s)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={filterSubject === s ? {
              background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))',
              color: 'var(--on-brand)',
            } : {
              background: 'var(--glass-05)',
              color: 'var(--text-muted)',
            }}
          >
            {s === "all" ? "全部" : s}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.map(q => (
          <div key={q.id} className="rounded-2xl overflow-hidden" style={cardStyle}>
            <button
              onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              className="w-full p-5 text-left flex items-start gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: `${subjectColors[q.subject] || 'var(--brand-500)'}20`,
                  color: subjectColors[q.subject] || 'var(--brand-500)',
                }}
              >
                {(q.subject || "?").substring(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate text-white">{q.content}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{q.topic || q.subject}</span>
                  <span className="text-xs text-gray-500">错误{q.wrong_count}次</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(${q.mastery < 40 ? 'var(--red-500)' : q.mastery < 70 ? 'var(--orange-500)' : 'var(--green-500)'} ${q.mastery * 3.6}deg, var(--glass-05) 0deg)`,
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--surface)', color: 'var(--on-brand)' }}>
                    {q.mastery}
                  </div>
                </div>
              </div>
            </button>

            {expandedId === q.id && (
              <div className="px-5 pb-5 space-y-3 animate-fade-in">
                {q.user_answer && (
                  <div className="p-4 rounded-xl" style={{ background: 'var(--glass-03)' }}>
                    <div className="mb-2">
                      <span className="text-xs text-gray-400">你的答案: </span>
                      <span className="text-sm text-red-400">{q.user_answer}</span>
                    </div>
                    {q.answer && (
                      <div className="mb-2">
                        <span className="text-xs text-gray-400">正确答案: </span>
                        <span className="text-sm text-green-400">{q.answer}</span>
                      </div>
                    )}
                    {q.error_type && (
                      <div>
                        <span className="text-xs text-gray-400">错误原因: </span>
                        <span className="text-sm text-yellow-400">{q.error_type}</span>
                      </div>
                    )}
                  </div>
                )}

                {q.error_analysis && (
                  <div className="p-4 rounded-xl" style={{ background: 'color-mix(in srgb,var(--orange-500) 8%,transparent)', border: '1px solid color-mix(in srgb,var(--orange-500) 20%,transparent)' }}>
                    <span className="font-semibold text-sm text-yellow-400">解析: </span>
                    <span className="text-sm text-gray-300">{q.error_analysis}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">掌握度:</span>
                  {[25, 50, 75, 100].map(level => (
                    <button
                      key={level}
                      onClick={() => updateMastery(q.id, level)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        background: q.mastery >= level ? 'color-mix(in srgb,var(--green-500) 20%,transparent)' : 'var(--glass-05)',
                        color: q.mastery >= level ? 'var(--green-500)' : 'var(--text-muted)',
                        border: `1px solid ${q.mastery >= level ? 'color-mix(in srgb,var(--green-500) 30%,transparent)' : 'var(--glass-06)'}`,
                      }}
                    >
                      {level === 25 ? "不熟" : level === 50 ? "一般" : level === 75 ? "较熟" : "已掌握"}
                    </button>
                  ))}
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="ml-auto text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                    style={{ background: 'var(--glass-03)' }}
                  >
                    删除
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">✅</div>
          <p className="text-lg text-gray-300">暂无错题，继续保持！</p>
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'var(--overlay)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-lg p-6 rounded-2xl max-h-[90vh] overflow-y-auto"
            style={{ background: 'var(--surface)', border: '1px solid var(--glass-10)' }}>
            <h3 className="text-lg font-bold mb-4 text-white">添加错题</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newQ.subject}
                  onChange={e => setNewQ({ ...newQ, subject: e.target.value })}
                  className="px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                  style={inputStyle}
                >
                  <option value="440">440 新传基础</option>
                  <option value="334">334 新传综合</option>
                  <option value="英语二">英语二</option>
                  <option value="政治">政治</option>
                </select>
                <input
                  type="text"
                  placeholder="章节"
                  value={newQ.chapter}
                  onChange={e => setNewQ({ ...newQ, chapter: e.target.value })}
                  className="px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
                  style={inputStyle}
                />
              </div>
              <textarea
                placeholder="题目内容"
                value={newQ.question}
                onChange={e => setNewQ({ ...newQ, question: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none"
                style={inputStyle}
                rows={3}
              />
              <input
                type="text"
                placeholder="你的答案"
                value={newQ.user_answer}
                onChange={e => setNewQ({ ...newQ, user_answer: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="正确答案"
                value={newQ.correct_answer}
                onChange={e => setNewQ({ ...newQ, correct_answer: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
                style={inputStyle}
              />
              <textarea
                placeholder="解析"
                value={newQ.explanation}
                onChange={e => setNewQ({ ...newQ, explanation: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none"
                style={inputStyle}
                rows={2}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="错误原因"
                  value={newQ.error_reason}
                  onChange={e => setNewQ({ ...newQ, error_reason: e.target.value })}
                  className="px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="标签（逗号分隔）"
                  value={newQ.tags}
                  onChange={e => setNewQ({ ...newQ, tags: e.target.value })}
                  className="px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
                  style={inputStyle}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-300 transition-all"
                  style={{ background: 'var(--glass-05)' }}
                >
                  取消
                </button>
                <button
                  onClick={addQuestion}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))',
                    boxShadow: '0 4px 15px color-mix(in srgb,var(--brand-500) 40%,transparent)',
                  }}
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
