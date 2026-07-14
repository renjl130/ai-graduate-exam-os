"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState } from "react";
import { getToken } from "@/lib/api";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  subject_id: string;
  chapter_id: string;
  similarity: number;
  search_type: string;
}

export default function VectorSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchMethod, setSearchMethod] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function handleSearch() {
    if (!query.trim()) return;

    setSearching(true);
    setResults([]);
    setSearchMethod("");

    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(
        `${API_BASE}/api/knowledge/vector-search?q=${encodeURIComponent(query)}&top_k=10`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
        setSearchMethod(data.search_method || "");
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setSearching(false);
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

  const subjectColors: Record<string, { bg: string; text: string }> = {
    "subject_xinchuan": { bg: 'rgba(16,185,129,0.15)', text: '#34d399' },
    "subject_politics": { bg: 'rgba(239,68,68,0.15)', text: '#f87171' },
    "subject_english": { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa' },
  };

  const subjectNames: Record<string, string> = {
    "subject_xinchuan": "新传",
    "subject_politics": "政治",
    "subject_english": "英语",
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">智能搜索</h2>
        <p className="text-sm text-gray-400 mt-1">基于 TF-IDF 和余弦相似度的语义搜索</p>
      </div>

      {/* 搜索框 */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="输入关键词或问题..."
            className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={inputStyle}
          />
          <button
            onClick={handleSearch}
            disabled={searching || !query.trim()}
            className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{
              background: searching || !query.trim() ? 'rgba(59, 130, 246, 0.3)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#fff',
              cursor: searching || !query.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            {searching ? "搜索中..." : "搜索"}
          </button>
        </div>
        {searchMethod && (
          <p className="text-xs text-gray-500 mt-2">搜索方法: {searchMethod}</p>
        )}
      </div>

      {/* 搜索结果 */}
      {results.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">找到 {results.length} 个相关知识点</p>

          {results.map((result) => {
            const colors = subjectColors[result.subject_id] || subjectColors["subject_xinchuan"];
            const subjectName = subjectNames[result.subject_id] || result.subject_id;

            return (
              <div key={result.id} className="rounded-2xl overflow-hidden" style={cardStyle}>
                <button
                  onClick={() => setExpandedId(expandedId === result.id ? null : result.id)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-white">{result.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: colors.bg, color: colors.text }}>
                          {subjectName}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
                          {result.search_type === 'vector' ? '语义' : '关键词'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{result.content}</p>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <span className="text-xs text-gray-500">相似度</span>
                      <span className="text-sm font-semibold text-blue-400">{(result.similarity * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </button>

                {expandedId === result.id && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <h4 className="text-sm font-semibold text-white mb-2">详细内容</h4>
                      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{result.content}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : query && !searching ? (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-400">未找到相关知识点</p>
          <p className="text-xs text-gray-500 mt-2">尝试使用不同的关键词</p>
        </div>
      ) : !query ? (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">💡</div>
          <p className="text-gray-400">输入关键词开始搜索</p>
          <p className="text-xs text-gray-500 mt-2">支持语义搜索，找到相关知识点</p>
        </div>
      ) : null}
    </div>
  );
}
