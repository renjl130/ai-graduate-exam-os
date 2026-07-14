"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface KnowledgePoint {
  id: string;
  title: string;
  content: string;
  importance: string;
  frequency: string;
  tags: string[];
  exam_tips: string;
  ai_explanation: string;
  chapter_id: string;
  subject_id: string;
}

interface Theory {
  id: string;
  name: string;
  scholar: string;
  year: string;
  subject: string;
  core: string;
  detail: string;
  examTip: string;
  importance: number;
}

// 从知识点内容中提取核心观点（取前100字）
function extractCore(content: string): string {
  const lines = content.split('\n').filter(l => l.trim());
  const firstLine = lines[0] || '';
  return firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine;
}

// 从知识点标题推断学者和年份
function extractScholarAndYear(title: string): { scholar: string; year: string } {
  const scholarMap: Record<string, { scholar: string; year: string }> = {
    "议程设置": { scholar: "麦库姆斯 & 肖", year: "1972" },
    "沉默的螺旋": { scholar: "诺依曼", year: "1974" },
    "知沟": { scholar: "蒂奇诺等", year: "1970" },
    "使用与满足": { scholar: "卡茨", year: "1974" },
    "把关人": { scholar: "卢因/怀特", year: "1947" },
    "框架": { scholar: "戈夫曼/恩特曼", year: "1974" },
    "培养理论": { scholar: "格伯纳", year: "1960s" },
    "编码": { scholar: "霍尔", year: "1973" },
    "公共领域": { scholar: "哈贝马斯", year: "1962" },
    "信息茧房": { scholar: "桑斯坦", year: "2001" },
    "新闻价值": { scholar: "多学者", year: "-" },
    "新闻专业主义": { scholar: "多学者", year: "-" },
    "媒介融合": { scholar: "多学者", year: "2000s" },
    "新闻真实": { scholar: "多学者", year: "-" },
    "新闻客观": { scholar: "多学者", year: "-" },
    "意见领袖": { scholar: "拉扎斯菲尔德", year: "1940s" },
    "拟态环境": { scholar: "李普曼", year: "1922" },
    "媒介即讯息": { scholar: "麦克卢汉", year: "1964" },
  };

  for (const [key, value] of Object.entries(scholarMap)) {
    if (title.includes(key)) return value;
  }
  return { scholar: "多学者", year: "-" };
}

// 重要度映射
function mapImportance(importance: string): number {
  switch (importance) {
    case "high": return 5;
    case "medium": return 3;
    case "low": return 1;
    default: return 3;
  }
}

export default function CoreTheoriesPage() {
  const [theories, setTheories] = useState<Theory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterImportance, setFilterImportance] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTheories();
  }, []);

  async function fetchTheories() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // 获取新传效果研究章节的知识点
      const response = await fetch(`${API_BASE}/api/knowledge/chapters/ch_xc_cbs_effect/points`, { headers });
      if (response.ok) {
        const data = await response.json();
        const points: KnowledgePoint[] = data.knowledge_points || data.points || [];

        const mappedTheories: Theory[] = points.map(p => {
          const { scholar, year } = extractScholarAndYear(p.title);
          // 根据章节判断科目
          const subject = p.chapter_id?.includes('xw') || p.title.includes('新闻') ? '334' : '440';

          return {
            id: p.id,
            name: p.title,
            scholar,
            year,
            subject,
            core: extractCore(p.content),
            detail: p.content,
            examTip: p.exam_tips || '高频考点',
            importance: mapImportance(p.importance),
          };
        });

        setTheories(mappedTheories);
      }
    } catch (error) {
      console.error('获取知识点失败:', error);
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
  };

  const filtered = theories.filter((t) => {
    if (filterSubject !== "all" && t.subject !== filterSubject) return false;
    if (filterImportance > 0 && t.importance < filterImportance) return false;
    if (searchQuery && !t.name.includes(searchQuery) && !t.scholar.includes(searchQuery) && !t.core.includes(searchQuery)) return false;
    return true;
  });

  const importanceStars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  if (loading) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载知识点中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">核心理论</h2>
        <p className="text-sm text-gray-400 mt-1">传播学 & 新闻学必背理论 · 含答题要点</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="搜索理论名称、学者、关键词..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          style={inputStyle}
        />
      </div>

      <div className="flex gap-2 mb-2 flex-wrap">
        {["all", "440", "334"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterSubject(s)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={filterSubject === s ? {
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff',
            } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}
          >
            {s === "all" ? "全部科目" : s === "440" ? "440 传播学" : "334 新闻学"}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <span className="text-xs py-1.5 text-gray-400">重要度:</span>
        {[0, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setFilterImportance(n)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={filterImportance === n ? {
              background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff',
            } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}
          >
            {n === 0 ? "全部" : `${n}★以上`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16" style={cardStyle}>
            <div className="text-5xl mb-4">📚</div>
            <p className="text-gray-400">未找到匹配的理论</p>
          </div>
        ) : filtered.map((theory) => (
          <div key={theory.id} className="rounded-2xl overflow-hidden" style={cardStyle}>
            <button
              onClick={() => setExpandedId(expandedId === theory.id ? null : theory.id)}
              className="w-full p-5 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: theory.subject === "440" ? 'rgba(139,92,246,0.15)' : 'rgba(16,185,129,0.15)',
                    color: theory.subject === "440" ? '#a78bfa' : '#34d399',
                  }}>
                  <span className="text-lg font-bold">{theory.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-white">{theory.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-lg"
                      style={{
                        background: theory.subject === "440" ? 'rgba(139,92,246,0.15)' : 'rgba(16,185,129,0.15)',
                        color: theory.subject === "440" ? '#a78bfa' : '#34d399',
                      }}>
                      {theory.subject}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">{theory.core}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{theory.scholar} · {theory.year}</span>
                    <span className="text-yellow-400">{importanceStars(theory.importance)}</span>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === theory.id ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>

            {expandedId === theory.id && (
              <div className="px-5 pb-5 space-y-4 animate-fade-in">
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <h4 className="text-sm font-semibold text-white mb-2">详细内容</h4>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{theory.detail}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2">📝 考试提示</h4>
                  <p className="text-sm text-gray-300">{theory.examTip}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
