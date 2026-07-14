"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface SearchResult {
  id: string;
  content_type: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  importance: number;
}

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<{ total: number; by_type: Record<string, number> } | null>(null);

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

  const getHeaders = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // 加载搜索统计
  useEffect(() => {
    fetch(`${API_BASE}/api/search/stats`, { headers: getHeaders() })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(data); })
      .catch(() => {});
  }, []);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({ q, limit: "20" });
      if (filterType !== "all") params.set("type", filterType);

      const res = await fetch(`${API_BASE}/api/search?${params}`, { headers: getHeaders() });
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
    if (query.trim()) {
      handleSearch(query);
    }
  };

  const typeColors: Record<string, string> = {
    "理论": "#8b5cf6", "概念": "#10b981", "热点": "#f59e0b", "书目": "#3b82f6",
  };

  const highlightText = (text: string, q: string) => {
    if (!q.trim()) return text;
    const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <span key={i} className="px-0.5 rounded" style={{ background: 'rgba(245,158,11,0.3)' }}>{part}</span>
      ) : part
    );
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">AI 搜索</h2>
        <p className="text-sm text-gray-400 mt-1">搜索理论、真题、热点、参考书</p>
      </div>

      {/* 搜索统计 */}
      {stats && (
        <div className="flex gap-4 mb-4">
          <span className="text-xs text-gray-400">索引总量: {stats.total}</span>
          {Object.entries(stats.by_type || {}).map(([type, count]) => (
            <span key={type} className="text-xs text-gray-400">{type}: {count}</span>
          ))}
        </div>
      )}

      <div className="mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="搜索理论、概念、真题、热点..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={{ ...inputStyle, fontSize: '16px', borderRadius: '16px' }}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "理论", "概念", "热点", "书目"].map((type) => (
          <button key={type} onClick={() => handleFilter(type)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={filterType === type ? {
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff',
            } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}>
            {type === "all" ? "全部" : type}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16" style={cardStyle}>
          <div className="animate-pulse text-gray-400">搜索中...</div>
        </div>
      ) : results.length === 0 && query.trim() ? (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-400">未找到相关内容</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">📚</div>
          <p className="text-gray-400">输入关键词开始搜索</p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl transition-all duration-200 hover:scale-[1.01]" style={cardStyle}>
              <div className="flex items-start gap-3 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{ background: `${typeColors[item.content_type] || '#6b7280'}20`, color: typeColors[item.content_type] || '#6b7280' }}>
                  {item.content_type}
                </span>
                {item.subject && <span className="text-xs text-gray-400">{item.subject}</span>}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{highlightText(item.title, query)}</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">{highlightText(item.content, query)}</p>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-xs"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#6b7280' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
