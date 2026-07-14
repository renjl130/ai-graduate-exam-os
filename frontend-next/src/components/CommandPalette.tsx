"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export default function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return NAV_ITEMS;
    return NAV_ITEMS.filter((item) =>
      [item.label, item.description, ...(item.keywords ?? [])].join(" ").toLowerCase().includes(keyword),
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/75 px-4 pt-[10vh] backdrop-blur-md" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" aria-label="快速导航" className="command-panel w-full max-w-2xl overflow-hidden" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5">
          <Search size={20} className="text-slate-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && results[0]) {
                onNavigate(results[0].id);
                onClose();
              }
            }}
            placeholder="搜索功能，例如：错题、知识库、AI 导师…"
            className="h-16 min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-slate-600"
          />
          <button className="icon-button" onClick={onClose} aria-label="关闭"><X size={18} /></button>
        </div>
        <div className="max-h-[56vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-slate-500">没有找到相关功能，换个关键词试试。</div>
          ) : results.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-white/[0.06]"
                onClick={() => { onNavigate(item.id); onClose(); }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-blue-300"><Icon size={19} /></span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-sm font-medium text-slate-100">{item.label}</strong>
                  <span className="block truncate text-xs text-slate-500">{item.description}</span>
                </span>
                <ArrowRight size={17} className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-400" />
              </button>
            );
          })}
        </div>
        <div className="border-t border-white/[0.06] px-5 py-3 text-[11px] text-slate-600">按 Enter 打开首个结果 · Esc 关闭</div>
      </div>
    </div>
  );
}
