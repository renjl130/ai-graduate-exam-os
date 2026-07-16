"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface KnowledgeReview {
  id: string;
  knowledge_point_id: string;
  title: string;
  content: string;
  importance: string;
  tags: string[];
  stability: number;
  difficulty: number;
  review_count: number;
  due_date: string;
}

interface ReviewStats {
  total: number;
  due_now: number;
  reviewed_today: number;
  by_subject: Record<string, number>;
}

export default function KnowledgeReviewPage() {
  const [dueReviews, setDueReviews] = useState<KnowledgeReview[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState<string>("");

  useEffect(() => {
    fetchDueReviews();
    fetchStats();
  }, [subjectFilter]);

  async function fetchDueReviews() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      let url = `${API_BASE}/api/knowledge/reviews/due?limit=20`;
      if (subjectFilter) url += `&subject_id=${subjectFilter}`;

      const response = await fetch(url, { headers });
      if (response.ok) {
        const data = await response.json();
        setDueReviews(data.reviews || []);
        setCurrentIndex(0);
        setShowAnswer(false);
      }
    } catch (error) {
      console.error('获取复习列表失败:', error);
    }
  }

  async function fetchStats() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/api/knowledge/reviews/stats`, { headers });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('获取统计失败:', error);
    }
  }

  async function handleReview(rating: number) {
    const currentReview = dueReviews[currentIndex];
    if (!currentReview || reviewing) return;

    setReviewing(true);

    try {
      const token = getToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(
        `${API_BASE}/api/knowledge/reviews/${currentReview.knowledge_point_id}?rating=${rating}`,
        {
          method: 'POST',
          headers,
        }
      );

      if (response.ok) {
        // 移动到下一个
        if (currentIndex < dueReviews.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setShowAnswer(false);
        } else {
          // 重新获取列表
          fetchDueReviews();
          fetchStats();
        }
      }
    } catch (error) {
      console.error('复习失败:', error);
    } finally {
      setReviewing(false);
    }
  }

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: '16px',
  };

  const currentReview = dueReviews[currentIndex];

  const subjectColors: Record<string, { bg: string; text: string }> = {
    "subject_xinchuan": { bg: 'color-mix(in srgb,var(--green-500) 15%,transparent)', text: 'var(--green-500)' },
    "subject_politics": { bg: 'color-mix(in srgb,var(--red-500) 15%,transparent)', text: 'var(--red-500)' },
    "subject_english": { bg: 'color-mix(in srgb,var(--brand-500) 15%,transparent)', text: 'var(--brand-400)' },
  };

  const subjectNames: Record<string, string> = {
    "subject_xinchuan": "新传",
    "subject_politics": "政治",
    "subject_english": "英语",
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">知识复习</h2>
        <p className="text-sm text-gray-400 mt-1">FSRS 间隔复习算法 · 科学记忆</p>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-2xl text-center" style={cardStyle}>
            <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-xs text-gray-400 mt-1">总复习量</div>
          </div>
          <div className="p-4 rounded-2xl text-center" style={cardStyle}>
            <div className="text-2xl font-bold text-orange-400">{stats.due_now}</div>
            <div className="text-xs text-gray-400 mt-1">待复习</div>
          </div>
          <div className="p-4 rounded-2xl text-center" style={cardStyle}>
            <div className="text-2xl font-bold text-green-400">{stats.reviewed_today}</div>
            <div className="text-xs text-gray-400 mt-1">今日已复习</div>
          </div>
          <div className="p-4 rounded-2xl text-center" style={cardStyle}>
            <div className="text-2xl font-bold text-purple-400">
              {Object.values(stats.by_subject).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-xs text-gray-400 mt-1">已掌握</div>
          </div>
        </div>
      )}

      {/* 学科筛选 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["", "subject_xinchuan", "subject_politics", "subject_english"].map((s) => (
          <button
            key={s}
            onClick={() => setSubjectFilter(s)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={subjectFilter === s ? {
              background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))', color: 'var(--on-brand)',
            } : { background: 'var(--glass-05)', color: 'var(--text-muted)' }}
          >
            {s === "" ? "全部" : subjectNames[s] || s}
          </button>
        ))}
      </div>

      {/* 复习卡片 */}
      {currentReview ? (
        <div className="space-y-4">
          {/* 进度指示 */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {currentIndex + 1} / {dueReviews.length}
            </span>
            <span className="text-xs text-gray-500">
              已复习 {currentReview.review_count} 次
            </span>
          </div>

          {/* 卡片内容 */}
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-white">{currentReview.title}</h3>
              {currentReview.tags?.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--glass-05)', color: 'var(--text-muted)' }}>
                  {tag}
                </span>
              ))}
            </div>

            {!showAnswer ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">尝试回忆这个知识点的内容</p>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))', color: 'var(--on-brand)' }}
                >
                  显示答案
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--glass-03)' }}>
                  <h4 className="text-sm font-semibold text-white mb-2">详细内容</h4>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{currentReview.content}</p>
                </div>

                {/* 评分按钮 */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleReview(1)}
                    disabled={reviewing}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{ background: 'color-mix(in srgb,var(--red-500) 15%,transparent)', color: 'var(--red-500)' }}
                  >
                    😕 忘记了
                  </button>
                  <button
                    onClick={() => handleReview(2)}
                    disabled={reviewing}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{ background: 'color-mix(in srgb,var(--orange-500) 15%,transparent)', color: 'var(--orange-500)' }}
                  >
                    🤔 模糊
                  </button>
                  <button
                    onClick={() => handleReview(3)}
                    disabled={reviewing}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{ background: 'color-mix(in srgb,var(--green-500) 15%,transparent)', color: 'var(--green-500)' }}
                  >
                    😊 记得
                  </button>
                  <button
                    onClick={() => handleReview(4)}
                    disabled={reviewing}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{ background: 'color-mix(in srgb,var(--brand-500) 15%,transparent)', color: 'var(--brand-400)' }}
                  >
                    🎯 熟练
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">🎉</div>
          <p className="text-gray-400">暂无待复习的知识点</p>
          <p className="text-xs text-gray-500 mt-2">所有知识点都已复习完成！</p>
        </div>
      )}
    </div>
  );
}
