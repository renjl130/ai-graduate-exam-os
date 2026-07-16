"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface ApiFlashcard {
  id: string;
  front: string;
  back: string;
  subject: string | null;
  topic: string | null;
  card_type: string;
  stability: number;
  difficulty: number;
  due_date: string;
  review_count: number;
  lapse_count: number;
  last_review: string | null;
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState<ApiFlashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genSubject, setGenSubject] = useState("440");
  const [genTopic, setGenTopic] = useState("");
  const [stats, setStats] = useState({ total_cards: 0, due_now: 0, reviewed_today: 0 });
  const [filterSubject, setFilterSubject] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [newCard, setNewCard] = useState({ front: "", back: "", subject: "440" });
  const [creating, setCreating] = useState(false);

  const getHeaders = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const fetchDueCards = async (subject?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: "50" });
      if (subject && subject !== "all") params.set("subject", subject);
      const res = await fetch(`${API_BASE}/api/flashcards/due?${params}`, { headers: getHeaders() });
      const data = await res.json();
      setCards(data.cards || []);
      setError("");
    } catch {
      setError("无法连接后端，请确保后端服务已启动");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/flashcards/stats`, { headers: getHeaders() });
      const data = await res.json();
      setStats(data);
    } catch {}
  };

  useEffect(() => {
    fetchDueCards(filterSubject);
    fetchStats();
  }, [filterSubject]);

  const card = cards[currentIndex];

  const handleRate = async (rating: number) => {
    if (!card) return;
    try {
      await fetch(`${API_BASE}/api/flashcards/${card.id}/review`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ rating }),
      });
      setFlipped(false);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        fetchDueCards();
        fetchStats();
      }
    } catch {
      setError("提交复习结果失败");
    }
  };

  const handleCreate = async () => {
    if (!newCard.front.trim() || !newCard.back.trim()) return;
    setCreating(true);
    try {
      const res = await fetch(`${API_BASE}/api/flashcards`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(newCard),
      });
      if (res.ok) {
        setNewCard({ front: "", back: "", subject: "440" });
        setShowCreate(false);
        fetchDueCards(filterSubject);
        fetchStats();
      }
    } catch { /* ignore */ } finally {
      setCreating(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch(`${API_BASE}/api/flashcards/generate`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ subject: genSubject, count: 10, topic: genTopic || undefined }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        fetchDueCards();
        fetchStats();
      }
    } catch {
      setError("AI生成闪卡失败");
    } finally {
      setGenerating(false);
    }
  };

  // iOS 26 样式
  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: '20px',
  };

  const inputStyle = {
    background: 'var(--glass-06)',
    border: '1px solid var(--glass-10)',
    borderRadius: '12px',
  };

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto"
            style={{ background: 'linear-gradient(135deg, color-mix(in srgb,var(--violet-500) 20%,transparent), color-mix(in srgb,var(--brand-500) 20%,transparent))' }}>
            🃏
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
          <h2 className="text-2xl font-bold text-white">间隔复习</h2>
          <p className="text-sm text-gray-400 mt-1">FSRS算法 · 科学记忆</p>
        </div>
        <button
          onClick={() => { fetchDueCards(filterSubject); fetchStats(); }}
          className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white transition-all"
          style={{ background: 'var(--glass-05)' }}
        >
          刷新
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-2xl text-center" style={cardStyle}>
          <div className="text-3xl font-bold text-red-400">{stats.due_now}</div>
          <div className="text-xs text-gray-400 mt-1">待复习</div>
        </div>
        <div className="p-5 rounded-2xl text-center" style={cardStyle}>
          <div className="text-3xl font-bold text-green-400">{stats.reviewed_today}</div>
          <div className="text-xs text-gray-400 mt-1">今日已复习</div>
        </div>
        <div className="p-5 rounded-2xl text-center" style={cardStyle}>
          <div className="text-3xl font-bold text-blue-400">{stats.total_cards}</div>
          <div className="text-xs text-gray-400 mt-1">总卡片</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {[{ key: "all", label: "全部" }, { key: "440", label: "440" }, { key: "334", label: "334" }, { key: "英语二", label: "英语" }, { key: "政治", label: "政治" }].map((s) => (
            <button
              key={s.key}
              onClick={() => { setFilterSubject(s.key); setCurrentIndex(0); setFlipped(false); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={filterSubject === s.key ? {
                background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))',
                color: 'var(--on-brand)',
              } : {
                background: 'var(--glass-05)',
                color: 'var(--text-muted)',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 rounded-xl text-xs font-medium text-blue-400 hover:text-blue-300 transition-all"
          style={{ background: 'color-mix(in srgb,var(--brand-500) 10%,transparent)' }}
        >
          + 手动添加
        </button>
      </div>

      {card ? (
        <>
          {/* Flashcard */}
          <div className="flex justify-center mb-8">
            <div
              className="w-full max-w-2xl cursor-pointer"
              onClick={() => setFlipped(!flipped)}
              style={{ perspective: 1000 }}
            >
              <div
                className="relative transition-all duration-500"
                style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none" }}
              >
                {/* Front */}
                <div
                  className="p-8 rounded-3xl min-h-[300px] flex flex-col"
                  style={{
                    ...cardStyle,
                    backfaceVisibility: "hidden",
                    background: 'linear-gradient(135deg, color-mix(in srgb,var(--brand-500) 10%,transparent), color-mix(in srgb,var(--violet-500) 10%,transparent))',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{ background: 'color-mix(in srgb,var(--brand-500) 20%,transparent)', color: 'var(--brand-400)' }}>
                      {card.subject || "通用"}
                    </span>
                    <span className="text-xs text-gray-400">复习{card.review_count}次</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-center text-white">{card.front}</h3>
                  </div>
                  <div className="text-center text-xs mt-4 text-gray-500">点击翻转查看答案</div>
                </div>

                {/* Back */}
                <div
                  className="p-8 rounded-3xl min-h-[300px] flex flex-col absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, color-mix(in srgb,var(--green-500) 10%,transparent), color-mix(in srgb,var(--brand-500) 10%,transparent))',
                    border: '1px solid var(--glass-06)',
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{ background: 'color-mix(in srgb,var(--green-500) 20%,transparent)', color: 'var(--green-500)' }}>
                      {card.card_type}
                    </span>
                    <span className="text-xs text-gray-400">稳定性 {card.stability.toFixed(1)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-200">{card.back}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Buttons */}
          {flipped && (
            <div className="flex justify-center gap-3 animate-fade-in mb-6">
              {[
                { rating: 1, label: "😵 重来", color: "var(--red-500)", bg: "color-mix(in srgb,var(--red-500) 10%,transparent)" },
                { rating: 2, label: "😐 困难", color: "var(--orange-500)", bg: "color-mix(in srgb,var(--orange-500) 10%,transparent)" },
                { rating: 3, label: "😊 良好", color: "var(--green-500)", bg: "color-mix(in srgb,var(--green-500) 10%,transparent)" },
                { rating: 4, label: "😎 简单", color: "var(--brand-500)", bg: "color-mix(in srgb,var(--brand-500) 10%,transparent)" },
              ].map((btn) => (
                <button
                  key={btn.rating}
                  onClick={() => handleRate(btn.rating)}
                  className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: btn.bg, color: btn.color, border: `1px solid ${btn.color}30` }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          {/* Progress */}
          <div className="text-center">
            <span className="text-xs text-gray-400">卡片 {currentIndex + 1}/{cards.length}</span>
            <div className="mt-2 max-w-md mx-auto h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--glass-05)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / cards.length) * 100}%`,
                  background: 'linear-gradient(90deg, var(--brand-500), var(--violet-500))',
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">🎉</div>
          <p className="text-lg font-semibold text-green-400">今日复习已完成！</p>
          <p className="text-sm mt-2 text-gray-400">所有到期卡片已复习完毕</p>
        </div>
      )}

      {/* AI Generate Section */}
      <div className="mt-8 p-6 rounded-2xl" style={cardStyle}>
        <h3 className="font-semibold mb-4 text-white">AI 生成闪卡</h3>
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
          <input
            type="text"
            placeholder="主题（可选）"
            value={genTopic}
            onChange={(e) => setGenTopic(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={inputStyle}
          />
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-6 py-3 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, var(--violet-500), var(--violet-500))',
              boxShadow: '0 4px 15px color-mix(in srgb,var(--violet-500) 40%,transparent)',
            }}
          >
            {generating ? "生成中..." : "生成10张"}
          </button>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'var(--overlay)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md p-6 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--glass-10)' }}>
            <h3 className="text-lg font-bold mb-4 text-white">手动创建闪卡</h3>
            <div className="space-y-3">
              <select
                value={newCard.subject}
                onChange={(e) => setNewCard({ ...newCard, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                style={inputStyle}
              >
                <option value="440">440 新传基础</option>
                <option value="334">334 新传综合</option>
                <option value="英语二">英语二</option>
                <option value="政治">政治</option>
              </select>
              <textarea
                placeholder="正面（问题）"
                value={newCard.front}
                onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={inputStyle}
                rows={3}
              />
              <textarea
                placeholder="背面（答案）"
                value={newCard.back}
                onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={inputStyle}
                rows={3}
              />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-300 transition-all"
                  style={{ background: 'var(--glass-05)' }}
                >
                  取消
                </button>
                <button
                  onClick={handleCreate}
                  disabled={creating || !newCard.front.trim() || !newCard.back.trim()}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))',
                    boxShadow: '0 4px 15px color-mix(in srgb,var(--brand-500) 40%,transparent)',
                  }}
                >
                  {creating ? "创建中..." : "创建"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
