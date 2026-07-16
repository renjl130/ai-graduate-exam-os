"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface Recommendation {
  id: string;
  title: string;
  content: string;
  importance: string;
  tags: string[];
  reason: string;
  priority: string;
  stability?: number;
  review_count?: number;
}

interface WeakPoint {
  id: string;
  title: string;
  content: string;
  importance: string;
  tags: string[];
  stability: number;
  review_count: number;
  lapse_count: number;
}

interface StudyPlan {
  days: number;
  total_points: number;
  plan: {
    day: number;
    date: string;
    points: {
      id: string;
      title: string;
      importance: string;
      subject_id: string;
    }[];
    estimated_minutes: number;
  }[];
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [weakPoints, setWeakPoints] = useState<WeakPoint[]>([]);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [activeTab, setActiveTab] = useState<"recommendations" | "weak-points" | "study-plan">("recommendations");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // 并行获取数据
      const [recRes, weakRes, planRes] = await Promise.all([
        fetch(`${API_BASE}/api/recommendations?limit=10`, { headers }),
        fetch(`${API_BASE}/api/recommendations/weak-points?limit=5`, { headers }),
        fetch(`${API_BASE}/api/recommendations/study-plan?days=7`, { headers }),
      ]);

      if (recRes.ok) {
        const data = await recRes.json();
        setRecommendations(data.recommendations || []);
      }

      if (weakRes.ok) {
        const data = await weakRes.json();
        setWeakPoints(data.weak_points || []);
      }

      if (planRes.ok) {
        const data = await planRes.json();
        setStudyPlan(data);
      }
    } catch (error) {
      console.error('获取推荐数据失败:', error);
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: '16px',
  };

  const priorityColors: Record<string, { bg: string; text: string }> = {
    "high": { bg: 'color-mix(in srgb,var(--red-500) 15%,transparent)', text: 'var(--red-500)' },
    "medium": { bg: 'color-mix(in srgb,var(--orange-500) 15%,transparent)', text: 'var(--orange-500)' },
    "low": { bg: 'color-mix(in srgb,var(--brand-500) 15%,transparent)', text: 'var(--brand-400)' },
  };

  const subjectNames: Record<string, string> = {
    "subject_xinchuan": "新传",
    "subject_politics": "政治",
    "subject_english": "英语",
  };

  if (loading) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">生成推荐中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">个性化推荐</h2>
        <p className="text-sm text-gray-400 mt-1">基于掌握度和错题的智能推荐</p>
      </div>

      {/* 标签页 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { id: "recommendations", label: "📚 推荐学习", icon: "📚" },
          { id: "weak-points", label: "⚠️ 薄弱知识点", icon: "⚠️" },
          { id: "study-plan", label: "📅 学习计划", icon: "📅" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
            style={activeTab === tab.id ? {
              background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))', color: 'var(--on-brand)',
            } : { background: 'var(--glass-05)', color: 'var(--text-muted)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 推荐学习 */}
      {activeTab === "recommendations" && (
        <div className="space-y-4">
          {recommendations.length === 0 ? (
            <div className="text-center py-16" style={cardStyle}>
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-gray-400">暂无推荐</p>
              <p className="text-xs text-gray-500 mt-2">所有知识点都已掌握！</p>
            </div>
          ) : recommendations.map((rec) => {
            const colors = priorityColors[rec.priority] || priorityColors["medium"];

            return (
              <div key={rec.id} className="p-5 rounded-2xl" style={cardStyle}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-white">{rec.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: colors.bg, color: colors.text }}>
                        {rec.priority === "high" ? "高优先级" : "中优先级"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{rec.reason}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {rec.tags?.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--glass-05)', color: 'var(--text-muted)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {rec.stability !== undefined && (
                    <div className="ml-4 text-right">
                      <div className="text-xs text-gray-500">稳定性</div>
                      <div className="text-sm font-semibold text-blue-400">{rec.stability.toFixed(1)}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 薄弱知识点 */}
      {activeTab === "weak-points" && (
        <div className="space-y-4">
          {weakPoints.length === 0 ? (
            <div className="text-center py-16" style={cardStyle}>
              <div className="text-5xl mb-4">✨</div>
              <p className="text-gray-400">暂无薄弱知识点</p>
              <p className="text-xs text-gray-500 mt-2">继续保持！</p>
            </div>
          ) : weakPoints.map((wp) => (
            <div key={wp.id} className="p-5 rounded-2xl" style={cardStyle}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-2">{wp.title}</h3>
                  <div className="flex gap-1.5 flex-wrap">
                    {wp.tags?.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--glass-05)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-xs text-gray-500">遗忘次数</div>
                  <div className="text-sm font-semibold text-red-400">{wp.lapse_count}</div>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>稳定性: {wp.stability.toFixed(1)}</span>
                <span>复习次数: {wp.review_count}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 学习计划 */}
      {activeTab === "study-plan" && studyPlan && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl" style={cardStyle}>
            <h3 className="text-lg font-semibold text-white mb-2">7天学习计划</h3>
            <p className="text-sm text-gray-400">
              共 {studyPlan.total_points} 个知识点，每天约 {Math.ceil(studyPlan.total_points / studyPlan.days)} 个
            </p>
          </div>

          {studyPlan.plan.map((day) => (
            <div key={day.day} className="p-5 rounded-2xl" style={cardStyle}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-base font-semibold text-white">第 {day.day} 天</h4>
                  <p className="text-xs text-gray-400">{day.date}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'color-mix(in srgb,var(--brand-500) 15%,transparent)', color: 'var(--brand-400)' }}>
                  约 {day.estimated_minutes} 分钟
                </span>
              </div>

              <div className="space-y-2">
                {day.points.slice(0, 5).map((point) => (
                  <div key={point.id} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'var(--glass-03)' }}>
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--glass-05)', color: 'var(--text-muted)' }}>
                      {subjectNames[point.subject_id] || point.subject_id}
                    </span>
                    <span className="text-sm text-gray-300">{point.title}</span>
                  </div>
                ))}
                {day.points.length > 5 && (
                  <p className="text-xs text-gray-500">...还有 {day.points.length - 5} 个知识点</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
