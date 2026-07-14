"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface ImportJob {
  id: string;
  filename: string;
  file_type: string;
  status: string;
  knowledge_count: number;
  created_at: string;
}

export default function DocumentImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [subjectId, setSubjectId] = useState("subject_xinchuan");
  const [chapterId, setChapterId] = useState("");
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ message: string; knowledge_count: number } | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<ImportJob[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/api/knowledge/import/history`, { headers });
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('获取导入历史失败:', error);
    }
  }

  async function handleImport() {
    if (!file) {
      setError("请选择文件");
      return;
    }

    setImporting(true);
    setError("");
    setResult(null);

    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subject_id", subjectId);
      if (chapterId) formData.append("chapter_id", chapterId);

      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/api/knowledge/import`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setFile(null);
        fetchHistory();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "导入失败");
      }
    } catch (error) {
      setError("导入失败，请检查网络连接");
    } finally {
      setImporting(false);
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

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">文档导入</h2>
        <p className="text-sm text-gray-400 mt-1">将 PDF/Word/MD/TXT 文件导入知识库</p>
      </div>

      {/* 导入表单 */}
      <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
        <h3 className="text-lg font-semibold text-white mb-4">导入新文档</h3>

        <div className="space-y-4">
          {/* 文件选择 */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">选择文件</label>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.md,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white"
              style={inputStyle}
            />
            {file && (
              <p className="text-xs text-gray-400 mt-2">
                已选择: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* 学科选择 */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">目标学科</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white"
              style={inputStyle}
            >
              <option value="subject_xinchuan">新传 (334/440)</option>
              <option value="subject_politics">政治 (101)</option>
              <option value="subject_english">英语 (204)</option>
            </select>
          </div>

          {/* 章节选择（可选） */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">目标章节（可选）</label>
            <input
              type="text"
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              placeholder="留空则自动匹配"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500"
              style={inputStyle}
            />
          </div>

          {/* 导入按钮 */}
          <button
            onClick={handleImport}
            disabled={importing || !file}
            className="w-full px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{
              background: importing || !file ? 'rgba(59, 130, 246, 0.3)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#fff',
              cursor: importing || !file ? 'not-allowed' : 'pointer',
            }}
          >
            {importing ? "导入中..." : "开始导入"}
          </button>
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* 成功信息 */}
        {result && (
          <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <p className="text-sm text-green-400">{result.message}</p>
            <p className="text-xs text-gray-400 mt-1">导入了 {result.knowledge_count} 个知识点</p>
          </div>
        )}
      </div>

      {/* 导入历史 */}
      <div className="p-6 rounded-2xl" style={cardStyle}>
        <h3 className="text-lg font-semibold text-white mb-4">导入历史</h3>

        {history.length === 0 ? (
          <p className="text-sm text-gray-400">暂无导入记录</p>
        ) : (
          <div className="space-y-3">
            {history.map((job) => (
              <div key={job.id} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{job.filename}</p>
                    <p className="text-xs text-gray-400">
                      {job.file_type} · {job.knowledge_count} 个知识点
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg" style={{
                    background: job.status === 'completed' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                    color: job.status === 'completed' ? '#34d399' : '#f87171',
                  }}>
                    {job.status === 'completed' ? '完成' : '失败'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{job.created_at}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
