"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Use local worker file (copied from pdfjs-dist to public/)
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageNumber(1);
    setScale(1.0);
    setError(null);
    setLoading(true);
  }, [url]);

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setLoading(false);
    setError(null);
  }, []);

  const onLoadError = useCallback((err: Error) => {
    setLoading(false);
    setError(`PDF 加载失败: ${err?.message || "未知错误"}`);
  }, []);

  // Download fallback
  const handleDownload = () => {
    window.open(url, "_blank");
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="text-4xl">📕</div>
        <p className="text-sm text-error">{error}</p>
        <div className="flex gap-2">
          <button className="btn btn-ghost text-xs" onClick={() => { setError(null); setLoading(true); }}>
            重试
          </button>
          <button className="btn btn-primary text-xs" onClick={handleDownload}>
            下载 PDF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4 sticky top-0 z-10 p-2 rounded-lg bg-secondary border-color" style={{ borderWidth: 1, borderStyle: "solid" }}>
        <button className="btn btn-ghost text-xs" onClick={() => setPageNumber(Math.max(1, pageNumber - 1))} disabled={pageNumber <= 1}>
          ← 上一页
        </button>
        <span className="text-sm text-secondary">
          {loading ? "- / -" : `${pageNumber} / ${numPages}`}
        </span>
        <button className="btn btn-ghost text-xs" onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))} disabled={pageNumber >= numPages || loading}>
          下一页 →
        </button>
        <div className="w-px h-4 bg-glass-3" />
        <button className="btn btn-ghost text-xs" onClick={() => setScale(Math.max(0.5, scale - 0.2))}>
          − 缩小
        </button>
        <span className="text-xs text-muted">{Math.round(scale * 100)}%</span>
        <button className="btn btn-ghost text-xs" onClick={() => setScale(Math.min(2.0, scale + 0.2))}>
          + 放大
        </button>
        <div className="w-px h-4 bg-glass-3" />
        <button className="btn btn-ghost text-xs" onClick={handleDownload}>
          下载
        </button>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex flex-col items-center py-12 gap-3">
          <div className="spinner" />
          <p className="text-sm text-muted">正在加载 PDF...</p>
        </div>
      )}

      {/* PDF Document */}
      <Document
        file={url}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={<div className="spinner" />}
        error={
          <div className="flex flex-col items-center py-12 gap-3">
            <p className="text-sm text-error">PDF 渲染失败</p>
            <button className="btn btn-primary text-xs" onClick={handleDownload}>
              下载 PDF
            </button>
          </div>
        }
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          loading={<div className="animate-pulse text-muted text-sm">加载页面...</div>}
          error={<div className="text-error text-sm">页面加载失败</div>}
        />
      </Document>
    </div>
  );
}
