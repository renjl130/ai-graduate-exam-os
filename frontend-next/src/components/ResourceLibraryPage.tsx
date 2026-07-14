"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import { getFileContent, getPdfUrl, analyzeFile, organizeFile, getToken } from "@/lib/api";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false, loading: () => <div className="text-center py-12 text-gray-400">加载 PDF...</div> });

interface FileInfo {
  name: string;
  path: string;
  size: number;
  size_display: string;
  modified: string;
  type: string;
  extension: string;
}

const typeIcons: Record<string, React.ReactNode> = {
  markdown: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  text: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  pdf: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  data: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.5 3.75c-.621 0-1.125-.504-1.125-1.125" /></svg>,
  other: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>,
};

const typeColors: Record<string, string> = {
  markdown: "#8b5cf6", text: "#3b82f6", pdf: "#ef4444",
  data: "#10b981", other: "#6b7280",
};

export default function ResourceLibraryPage() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingFile, setViewingFile] = useState<FileInfo | null>(null);
  const [viewContent, setViewContent] = useState("");
  const [viewLoading, setViewLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

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

  const getHeaders = (): Record<string, string> => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/files`, { headers: getHeaders() });
      const data = await res.json();
      setFiles(data.files || []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  const viewFile = async (file: FileInfo) => {
    setViewingFile(file);
    setViewContent("");
    setAiResult("");
    if (file.type === "pdf") return;
    try {
      setViewLoading(true);
      const data = await getFileContent(file.path);
      setViewContent(data.content);
    } catch {
      setUploadMsg("读取文件失败");
      setTimeout(() => setUploadMsg(""), 3000);
    } finally {
      setViewLoading(false);
    }
  };

  const handleAiAnalyze = async () => {
    if (!viewingFile || aiLoading) return;
    setAiLoading(true);
    setAiResult("");
    try {
      const res = await analyzeFile(viewingFile.path);
      setAiResult(res.result);
    } catch {
      setAiResult("AI 分析失败，请重试");
    } finally {
      setAiLoading(false);
    }
  };

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setUploadMsg("");
    let ok = 0, fail = 0;
    for (let i = 0; i < fileList.length; i++) {
      const fd = new FormData();
      fd.append("file", fileList[i]);
      try {
        const res = await fetch(`${API_BASE}/api/files/upload`, {
          method: "POST",
          headers: getHeaders(),
          body: fd,
        });
        if (res.ok) ok++; else fail++;
      } catch { fail++; }
    }
    setUploading(false);
    setUploadMsg(ok > 0 ? `上传成功 ${ok} 个${fail > 0 ? `，${fail} 失败` : ""}` : "上传失败");
    if (ok > 0) fetchFiles();
    setTimeout(() => setUploadMsg(""), 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  const deleteFile = async (file: FileInfo) => {
    if (!confirm(`确定删除 "${file.name}"？`)) return;
    const encoded = file.path.split("/").map(encodeURIComponent).join("/");
    try {
      await fetch(`${API_BASE}/api/files/${encoded}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      fetchFiles();
      if (viewingFile?.path === file.path) setViewingFile(null);
    } catch { /* ignore */ }
  };

  const filtered = files.filter((f) => {
    if (filterType !== "all" && f.type !== filterType) return false;
    if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // File Viewer
  if (viewingFile) {
    const isMarkdown = viewingFile.name.endsWith(".md");
    const isPdf = viewingFile.type === "pdf";

    return (
      <div className="animate-fade-in h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewingFile(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white transition-all"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              ← 返回
            </button>
            <span className="font-medium text-sm text-white">{viewingFile.name}</span>
            <span className="text-xs px-2 py-1 rounded-lg text-gray-400"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              {viewingFile.size_display}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAiAnalyze}
              disabled={aiLoading}
              className="px-4 py-2 rounded-xl text-xs font-medium text-white transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
              }}
            >
              {aiLoading ? "分析中..." : "AI 分析"}
            </button>
          </div>
        </div>

        <div className="flex-1 flex gap-4 min-h-0">
          <div className="flex-1 overflow-y-auto p-6 rounded-2xl"
            style={{ ...cardStyle, borderRadius: '20px' }}>
            {viewLoading ? (
              <div className="text-center py-12 text-gray-400">
                <div className="animate-pulse">加载中...</div>
              </div>
            ) : isPdf ? (
              <PdfViewer url={getPdfUrl(viewingFile.path)} />
            ) : isMarkdown ? (
              <div className="max-w-none prose prose-invert">
                <ReactMarkdown>{viewContent}</ReactMarkdown>
              </div>
            ) : (
              <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed text-gray-200">
                {viewContent}
              </pre>
            )}
          </div>

          {(aiResult || aiLoading) && (
            <div className="w-80 flex-shrink-0 overflow-y-auto p-5 rounded-2xl"
              style={{ ...cardStyle, borderColor: 'rgba(59,130,246,0.3)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">🤖</span>
                <span className="text-sm font-medium text-blue-400">AI 分析</span>
              </div>
              {aiLoading ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="animate-pulse">分析中...</div>
                </div>
              ) : aiResult ? (
                <div className="text-sm text-gray-300 leading-relaxed">
                  <ReactMarkdown>{aiResult}</ReactMarkdown>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }

  // File List
  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">资料库</h2>
          <p className="text-sm text-gray-400 mt-1">上传 · 在线查看 · AI 分析</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
          }}
        >
          {uploading ? "上传中..." : "+ 上传"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".md,.txt,.pdf,.doc,.docx,.csv,.json,.png,.jpg,.jpeg"
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
        />
      </div>

      {uploadMsg && (
        <div className="mb-4 p-4 rounded-xl text-sm"
          style={{
            background: uploadMsg.includes("成功") ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${uploadMsg.includes("成功") ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
            color: uploadMsg.includes("成功") ? '#34d399' : '#f87171',
          }}>
          {uploadMsg}
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className="mb-6 p-8 rounded-2xl text-center transition-all cursor-pointer"
        style={{
          background: dragOver ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.02)',
          border: `2px dashed ${dragOver ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '20px',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-3xl mb-3">{uploading ? "⏳" : "📁"}</div>
        <p className="text-sm text-gray-300">{uploading ? "上传中..." : "拖拽文件或点击上传"}</p>
        <p className="text-xs mt-1 text-gray-500">.md .txt .pdf .doc .csv .json .png .jpg</p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="搜索文件..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          style={inputStyle}
        />
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterType("all")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={filterType === "all" ? {
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: '#fff',
          } : {
            background: 'rgba(255,255,255,0.05)',
            color: '#9ca3af',
          }}
        >
          全部 ({files.length})
        </button>
        {Object.keys(typeIcons).map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={filterType === t ? {
              background: `${typeColors[t]}20`,
              color: typeColors[t],
            } : {
              background: 'rgba(255,255,255,0.05)',
              color: '#9ca3af',
            }}
          >
            {t} ({files.filter((f) => f.type === t).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">
          <div className="animate-pulse">加载中...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">📂</div>
          <p className="text-gray-400">暂无资料</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((file) => (
            <div
              key={file.path}
              className="p-5 rounded-2xl transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
              style={cardStyle}
              onClick={() => viewFile(file)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${typeColors[file.type] || '#6b7280'}20`, color: typeColors[file.type] || '#6b7280' }}>
                  {typeIcons[file.type] || typeIcons.other}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate text-white">{file.name}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{file.size_display}</span>
                    <span>·</span>
                    <span>{new Date(file.modified).toLocaleDateString("zh-CN")}</span>
                  </div>
                </div>
                {file.path.startsWith("uploads/") && (
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteFile(file); }}
                    className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded-lg text-xs text-red-400 hover:text-red-300 transition-all"
                    style={{ background: 'rgba(239,68,68,0.1)' }}
                  >
                    删除
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
