"use client";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  color: string;
  chapter_count?: number;
  point_count?: number;
}

interface Chapter {
  id: string;
  name: string;
  description: string;
  level: number;
  point_count?: number;
}

interface KnowledgePoint {
  id: string;
  title: string;
  content: string;
  summary: string;
  importance: string;
  frequency: string;
  level: number;
  tags: string[];
  exam_tips: string;
  answer_template: string;
  memory_tips: string;
  key_points?: string;
  case_analysis?: string;
  common_mistakes?: string;
  training_steps?: string;
  self_test?: string;
  quality_version?: number;
  mastery: number;
}

export default function KnowledgeBrowserPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [points, setPoints] = useState<KnowledgePoint[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedPoint, setSelectedPoint] = useState<KnowledgePoint | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<KnowledgePoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const headers = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // 加载学科
  useEffect(() => {
    fetch(`${API_BASE}/api/knowledge/subjects`)
      .then((r) => r.json())
      .then((data) => {
        setSubjects(data.subjects || []);
        if (data.subjects?.length > 0) {
          setSelectedSubject(data.subjects[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // 加载章节
  useEffect(() => {
    if (!selectedSubject) return;
    fetch(`${API_BASE}/api/knowledge/subjects/${selectedSubject}/chapters`)
      .then((r) => r.json())
      .then((data) => {
        setChapters(data.chapters || []);
        if (data.chapters?.length > 0) {
          setSelectedChapter(data.chapters[0].id);
        }
      })
      .catch(() => {});
  }, [selectedSubject]);

  // 加载知识点
  useEffect(() => {
    if (!selectedChapter) return;
    setLoading(true);
    fetch(`${API_BASE}/api/knowledge/chapters/${selectedChapter}/points`)
      .then((r) => r.json())
      .then((data) => {
        setPoints(data.knowledge_points || []);
        setSelectedPoint(null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedChapter]);

  // 搜索知识点
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/knowledge/search?q=${encodeURIComponent(searchQuery)}&limit=20`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch {
      setSearchResults([]);
    }
    setLoading(false);
  };

  // AI 讲解知识点
  const handleAIExplain = async (pointId: string, style: string = "detailed") => {
    setAiLoading(true);
    setAiExplanation("");
    try {
      const res = await fetch(`${API_BASE}/api/ai/knowledge-explain`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ knowledge_point_id: pointId, style }),
      });
      const data = await res.json();
      setAiExplanation(data.explanation || "暂无讲解");
    } catch {
      setAiExplanation("AI 讲解请求失败，请稍后重试");
    }
    setAiLoading(false);
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
  };

  const importanceColors: Record<string, string> = {
    high: "#EF4444",
    medium: "#F59E0B",
    low: "#10B981",
  };

  const displayPoints = searchQuery.trim() ? searchResults : points;

  return (
    <div className="animate-fade-in mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">📚 知识库</h2>
          <p className="text-sm text-gray-400 mt-1">
            结构化知识管理 · 点击知识点查看详细内容
          </p>
        </div>
        <div className="flex w-full gap-2 lg:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="搜索知识点..."
            className="px-4 py-2 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              width: "min(100%, 320px)",
            }}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-xl text-sm text-white transition-all"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
          >
            搜索
          </button>
        </div>
      </div>

      {/* 学科选择 */}
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSubject(s.id)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium transition-all"
            style={{
              background:
                selectedSubject === s.id
                  ? `${s.color}20`
                  : "rgba(255,255,255,0.04)",
              border: `1px solid ${selectedSubject === s.id ? s.color + "40" : "rgba(255,255,255,0.06)"}`,
              color: selectedSubject === s.id ? s.color : "#9CA3AF",
            }}
          >
            <span>{s.icon}</span>
            <span>{s.name}</span>
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] opacity-70">{s.point_count ?? 0} 点</span>
            {s.code && (
              <span className="text-xs opacity-60">({s.code})</span>
            )}
          </button>
        ))}
      </div>

      {/* 主内容区：三栏布局 */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12" style={{ minHeight: "70vh" }}>
        {/* 左栏：章节列表 */}
        <div className="min-w-0 rounded-2xl p-4 xl:col-span-3 xl:max-h-[calc(100dvh-220px)] xl:overflow-y-auto" style={cardStyle}>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">📑 章节</h3>
          <div className="space-y-1">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch.id)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background:
                    selectedChapter === ch.id
                      ? "rgba(59, 130, 246, 0.12)"
                      : "transparent",
                  color:
                    selectedChapter === ch.id ? "#F9FAFB" : "#9CA3AF",
                }}
              >
                <div className="flex items-center justify-between gap-2"><span className="font-medium">{ch.name}</span><span className="shrink-0 rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-slate-500">{ch.point_count ?? 0}</span></div>
                {ch.description && (
                  <div className="text-xs mt-0.5 opacity-60 truncate">
                    {ch.description}
                  </div>
                )}
              </button>
            ))}
            {chapters.length === 0 && (
              <p className="text-sm text-gray-500 px-3">暂无章节</p>
            )}
          </div>
        </div>

        {/* 中栏：知识点列表 */}
        <div className="min-w-0 rounded-2xl p-4 xl:col-span-4 xl:max-h-[calc(100dvh-220px)] xl:overflow-y-auto" style={cardStyle}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300">
              📝 知识点 {displayPoints.length > 0 && `(${displayPoints.length})`}
            </h3>
          </div>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-2xl animate-spin">⏳</div>
              <p className="text-sm text-gray-500 mt-2">加载中...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {displayPoints.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPoint(p);
                    setAiExplanation("");
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all"
                  style={{
                    background:
                      selectedPoint?.id === p.id
                        ? "rgba(59, 130, 246, 0.12)"
                        : "rgba(255,255,255,0.02)",
                    border:
                      selectedPoint?.id === p.id
                        ? "1px solid rgba(59, 130, 246, 0.3)"
                        : "1px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: importanceColors[p.importance] || "#6B7280",
                      }}
                    />
                    <span className="text-sm font-medium text-white truncate">
                      {p.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 ml-4">
                    {p.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "#60A5FA",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {p.mastery > 0 && (
                      <span className="text-[10px] text-gray-500 ml-auto">
                        掌握 {p.mastery}%
                      </span>
                    )}
                  </div>
                </button>
              ))}
              {displayPoints.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">
                    {searchQuery.trim() ? "未找到匹配的知识点" : "暂无知识点"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 右栏：知识点详情 */}
        <div className="min-w-0 rounded-2xl p-4 xl:col-span-5 xl:max-h-[calc(100dvh-220px)] xl:overflow-y-auto" style={cardStyle}>
          {selectedPoint ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background:
                      importanceColors[selectedPoint.importance] + "20",
                    color: importanceColors[selectedPoint.importance],
                  }}
                >
                  {selectedPoint.importance === "high"
                    ? "🔴 高频考点"
                    : selectedPoint.importance === "medium"
                    ? "🟡 中频考点"
                    : "🟢 低频考点"}
                </span>
                {selectedPoint.quality_version && selectedPoint.quality_version >= 2 && (
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-200">
                    ✨ 深度整理版
                  </span>
                )}
                {selectedPoint.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      color: "#A78BFA",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-bold text-white mb-4">
                {selectedPoint.title}
              </h2>

              {selectedPoint.summary && (
                <div className="mb-5 rounded-xl border border-blue-400/10 bg-blue-500/[0.05] p-4 text-sm leading-relaxed text-blue-100/80">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-300/70">一句话掌握</div>
                  {selectedPoint.summary}
                </div>
              )}

              {/* 核心内容 */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">
                  📖 核心内容
                </h3>
                <div
                  className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  {selectedPoint.content}
                </div>
              </div>

              {/* 深度知识模块 */}
              {selectedPoint.key_points && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-300">🧭 关键要点</h3>
                  <div className="whitespace-pre-wrap rounded-xl border border-cyan-400/10 bg-cyan-500/[0.05] p-4 text-sm leading-relaxed text-cyan-100/80">
                    {selectedPoint.key_points}
                  </div>
                </div>
              )}

              {selectedPoint.case_analysis && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-300">🔍 案例与应用</h3>
                  <div className="whitespace-pre-wrap rounded-xl border border-sky-400/10 bg-sky-500/[0.05] p-4 text-sm leading-relaxed text-sky-100/80">
                    {selectedPoint.case_analysis}
                  </div>
                </div>
              )}

              {selectedPoint.common_mistakes && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-300">⚠️ 易错与辨析</h3>
                  <div className="whitespace-pre-wrap rounded-xl border border-rose-400/10 bg-rose-500/[0.05] p-4 text-sm leading-relaxed text-rose-100/80">
                    {selectedPoint.common_mistakes}
                  </div>
                </div>
              )}

              {selectedPoint.training_steps && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-300">🏋️ 专项训练</h3>
                  <div className="whitespace-pre-wrap rounded-xl border border-orange-400/10 bg-orange-500/[0.05] p-4 text-sm leading-relaxed text-orange-100/80">
                    {selectedPoint.training_steps}
                  </div>
                </div>
              )}

              {selectedPoint.self_test && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-300">✅ 自测题</h3>
                  <div className="whitespace-pre-wrap rounded-xl border border-emerald-400/10 bg-emerald-500/[0.05] p-4 text-sm leading-relaxed text-emerald-100/80">
                    {selectedPoint.self_test}
                  </div>
                </div>
              )}

              {/* 考试要点 */}
              {selectedPoint.exam_tips && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">
                    🎯 考试要点
                  </h3>
                  <div
                    className="text-sm text-yellow-200/80 leading-relaxed whitespace-pre-wrap"
                    style={{
                      background: "rgba(245, 158, 11, 0.05)",
                      borderRadius: "12px",
                      padding: "16px",
                      border: "1px solid rgba(245, 158, 11, 0.1)",
                    }}
                  >
                    {selectedPoint.exam_tips}
                  </div>
                </div>
              )}

              {/* 答题模板 */}
              {selectedPoint.answer_template && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">
                    📝 答题模板
                  </h3>
                  <div
                    className="text-sm text-green-200/80 leading-relaxed whitespace-pre-wrap"
                    style={{
                      background: "rgba(16, 185, 129, 0.05)",
                      borderRadius: "12px",
                      padding: "16px",
                      border: "1px solid rgba(16, 185, 129, 0.1)",
                    }}
                  >
                    {selectedPoint.answer_template}
                  </div>
                </div>
              )}

              {selectedPoint.memory_tips && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-300">🧠 速记与辨析</h3>
                  <div className="rounded-xl border border-violet-400/10 bg-violet-500/[0.05] p-4 text-sm leading-relaxed text-violet-100/80 whitespace-pre-wrap">
                    {selectedPoint.memory_tips}
                  </div>
                </div>
              )}

              {/* AI 讲解按钮 */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">
                  🤖 AI 讲解
                </h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAIExplain(selectedPoint.id, "detailed")}
                    disabled={aiLoading}
                    className="px-4 py-2 rounded-xl text-xs text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                      opacity: aiLoading ? 0.6 : 1,
                    }}
                  >
                    {aiLoading ? "生成中..." : "📖 详细讲解"}
                  </button>
                  <button
                    onClick={() => handleAIExplain(selectedPoint.id, "exam_focused")}
                    disabled={aiLoading}
                    className="px-4 py-2 rounded-xl text-xs text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B, #EF4444)",
                      opacity: aiLoading ? 0.6 : 1,
                    }}
                  >
                    🎯 考法分析
                  </button>
                  <button
                    onClick={() => handleAIExplain(selectedPoint.id, "concise")}
                    disabled={aiLoading}
                    className="px-4 py-2 rounded-xl text-xs text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #10B981, #059669)",
                      opacity: aiLoading ? 0.6 : 1,
                    }}
                  >
                    ⚡ 精简版
                  </button>
                </div>
                {aiExplanation && (
                  <div
                    className="text-sm text-blue-200/80 leading-relaxed whitespace-pre-wrap"
                    style={{
                      background: "rgba(59, 130, 246, 0.05)",
                      borderRadius: "12px",
                      padding: "16px",
                      border: "1px solid rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    {aiExplanation}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-gray-400 text-sm">
                选择一个知识点查看详情
              </p>
              <p className="text-gray-500 text-xs mt-2">
                点击左侧知识点列表中的任意一项
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

