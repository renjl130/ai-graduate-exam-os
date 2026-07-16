"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface VocabularyWord {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  category: string;
  mastery: number;
  review_count: number;
  stability?: number;
  due_date?: string;
}

interface VocabStats {
  total: number;
  mastered: number;
  due_now: number;
  reviewed_today: number;
  by_category: Record<string, number>;
}

export default function VocabularyPage() {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [stats, setStats] = useState<VocabStats | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [filter, setFilter] = useState<"all" | "unmastered" | "mastered">("all");
  const [loading, setLoading] = useState(true);
  const [seeded, setSeeded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      await fetchStats();
      await fetchWords();
    } catch (e) {
      console.error("加载数据失败:", e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}/api/vocabulary/stats`, { headers });
    if (response.ok) {
      const data = await response.json();
      setStats(data);
    }
  }

  async function fetchWords(nextPage = page, nextQuery = searchQuery, nextCategory = category) {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const params = new URLSearchParams({ page: String(nextPage), limit: "100" });
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory) params.set("category", nextCategory);

    const response = await fetch(`${API_BASE}/api/vocabulary?${params.toString()}`, { headers });
    if (response.ok) {
      const data = await response.json();
      setWords(data.vocabulary || []);
      setPage(data.page || nextPage);
      setTotalPages(data.pages || 1);
      setSearchQuery(nextQuery);
      setCategory(nextCategory);
      setCurrentIndex(0);
      setShowMeaning(false);
    }
  }

  async function handleSeed() {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}/api/vocabulary/seed`, { method: `POST`, headers });
    if (response.ok) {
      setSeeded(true);
      await loadData();
    }
  }

  async function handleReview(wordId: string, rating: number) {
    const token = getToken();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}/api/vocabulary/${wordId}/review`, {
      method: "POST",
      headers,
      body: JSON.stringify({ rating }),
    });

    if (response.ok) {
      await fetchWords();
      await fetchStats();
      setShowMeaning(false);
      if (currentIndex < filteredWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }

  const filteredWords = words.filter((w) => {
    if (filter === "mastered") return w.mastery >= 80;
    if (filter === "unmastered") return w.mastery < 80;
    return true;
  });

  const currentWord = filteredWords[currentIndex];
  const masteredCount = stats?.mastered ?? words.filter((w) => w.mastery >= 80).length;
  const totalCount = stats?.total ?? words.length;
  const dueCount = stats?.due_now ?? 0;
  const progress = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
  };

  if (loading) {
    return (
      <div className="animate-fade-in max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">📚</div>
          <p className="text-gray-400">加载词汇数据...</p>
        </div>
      </div>
    );
  }

  if (words.length === 0 && !seeded) {
    return (
      <div className="animate-fade-in max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">词汇打卡</h2>
          <p className="text-sm text-gray-400 mt-1">考研英语二核心词汇 · FSRS 间隔复习</p>
        </div>
        <div className="text-center py-16 rounded-2xl" style={cardStyle}>
          <div className="text-5xl mb-4">📚</div>
          <p className="text-lg font-semibold text-white mb-2">还没有词汇数据</p>
          <p className="text-sm text-gray-400 mb-6">点击下方按钮初始化考研核心词汇</p>
          <button
            onClick={handleSeed}
            className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff" }}
          >
            初始化词汇数据
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">词汇打卡</h2>
        <p className="text-sm text-gray-400 mt-1">考研英语二核心词汇 · FSRS 间隔复习</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { value: totalCount, label: "总词汇", color: "#3B82F6" },
          { value: masteredCount, label: "已掌握", color: "#10B981" },
          { value: dueCount, label: "待复习", color: "#F59E0B" },
          { value: `${progress}%`, label: "完成度", color: "#8B5CF6" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl text-center" style={cardStyle}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 p-4 rounded-2xl" style={cardStyle}>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white">学习进度</span>
          <span style={{ color: "#10B981" }}>
            {masteredCount}/{totalCount}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #3B82F6, #8B5CF6)" }}
          />
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_180px_auto]">
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && fetchWords(1, searchInput.trim(), category)}
          placeholder={"\u641c\u7d22\u5355\u8bcd\u3001\u4e2d\u6587\u91ca\u4e49\u6216\u82f1\u82f1\u91ca\u4e49"}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
        />
        <select
          value={category}
          onChange={(event) => fetchWords(1, searchQuery, event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white"
        >
          <option value="">{"\u5168\u90e8\u8bcd\u6c47\u7c7b\u522b"}</option>
          {Object.keys(stats?.by_category || {}).map((item) => (
            <option key={item} value={item}>{item} ({stats?.by_category[item]})</option>
          ))}
        </select>
        <button
          onClick={() => fetchWords(1, searchInput.trim(), category)}
          className="rounded-xl bg-blue-500/20 px-5 py-2.5 text-sm font-medium text-blue-200 hover:bg-blue-500/30"
        >
          {"\u641c\u7d22"}
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {[
          { key: "all" as const, label: "全部" },
          { key: "unmastered" as const, label: "待学习" },
          { key: "mastered" as const, label: "已掌握" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setFilter(f.key);
              setCurrentIndex(0);
              setShowMeaning(false);
            }}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={
              filter === f.key
                ? { background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff" }
                : { background: "rgba(255,255,255,0.05)", color: "#9ca3af" }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {currentWord ? (
        <div className="space-y-4">
          <div
            className="p-8 rounded-2xl text-center cursor-pointer min-h-[250px] flex flex-col items-center justify-center"
            style={{
              ...cardStyle,
              background: showMeaning ? "rgba(59, 130, 246, 0.08)" : "rgba(255, 255, 255, 0.05)",
              border: showMeaning ? "1px solid rgba(59, 130, 246, 0.2)" : "1px solid rgba(255, 255, 255, 0.08)",
            }}
            onClick={() => setShowMeaning(!showMeaning)}
          >
            <div className="text-3xl font-bold mb-2 text-white">{currentWord.word}</div>
            {currentWord.phonetic && (
              <div className="text-sm mb-4 text-gray-400">{currentWord.phonetic}</div>
            )}
            {showMeaning ? (
              <div className="space-y-3 animate-fade-in">
                <div className="text-lg text-white">{currentWord.meaning}</div>
                {currentWord.example && (
                  <div className="text-sm italic text-gray-400">&ldquo;{currentWord.example}&rdquo;</div>
                )}
                <div className="text-xs text-gray-500">
                  掌握度: {currentWord.mastery}% | 复习次数: {currentWord.review_count}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-400">点击查看释义</div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleReview(currentWord.id, 1)}
              className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}
            >
              😅 忘记了
            </button>
            <button
              onClick={() => handleReview(currentWord.id, 2)}
              className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}
            >
              🤔 模糊
            </button>
            <button
              onClick={() => handleReview(currentWord.id, 3)}
              className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}
            >
              😊 记得
            </button>
            <button
              onClick={() => handleReview(currentWord.id, 4)}
              className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}
            >
              🤩 很熟
            </button>
          </div>

          <div className="text-center text-sm text-gray-400">
            {currentIndex + 1} / {filteredWords.length}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl" style={cardStyle}>
          <div className="text-5xl mb-4">🎉</div>
          <p className="text-lg font-semibold" style={{ color: "#10B981" }}>
            {filter === "mastered" ? "还没有已掌握的词汇" : "所有词汇已掌握！"}
          </p>
        </div>
      )}

      <div className="mt-8 space-y-2">
        <h3 className="font-semibold mb-3 text-white">词汇列表</h3>
        {filteredWords.map((w, i) => (
          <div
            key={w.id}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
            style={{
              ...cardStyle,
              background: i === currentIndex ? "rgba(59, 130, 246, 0.08)" : "rgba(255, 255, 255, 0.03)",
              opacity: w.mastery >= 80 ? 0.6 : 1,
            }}
            onClick={() => {
              setCurrentIndex(i);
              setShowMeaning(false);
            }}
          >
            <span className="text-sm font-medium text-white" style={{ minWidth: "100px" }}>
              {w.word}
            </span>
            <span className="text-xs flex-1 text-gray-400">{w.meaning}</span>
            <span className="text-xs text-gray-500">{w.mastery}%</span>
            {w.mastery >= 80 && <span className="text-xs" style={{ color: "#10B981" }}>✓</span>}
          </div>
        ))}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            disabled={page <= 1}
            onClick={() => fetchWords(page - 1, searchQuery, category)}
            className="rounded-lg bg-white/[0.06] px-4 py-2 text-xs text-slate-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {"\u4e0a\u4e00\u9875"}
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => fetchWords(page + 1, searchQuery, category)}
            className="rounded-lg bg-white/[0.06] px-4 py-2 text-xs text-slate-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {"\u4e0b\u4e00\u9875"}
          </button>
        </div>
      </div>
    </div>
  );
}
