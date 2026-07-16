"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Command, Search, X } from "lucide-react";
import { NAV_GROUPS, NAV_ITEMS } from "@/lib/navigation";
import BrandLogo from "@/components/BrandLogo";

interface CommandPaletteProps { open: boolean; onClose: () => void; onNavigate: (id: string) => void; }

export default function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!open) return;
    setQuery("");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", onKeyDown); };
  }, [open, onClose]);

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return NAV_ITEMS;
    return NAV_ITEMS.filter((item) => [item.label, item.description, ...(item.keywords ?? [])].join(" ").toLowerCase().includes(keyword));
  }, [query]);
  if (!open) return null;

  return (
    <div className="command-overlay" onMouseDown={onClose}>
      <div role="dialog" aria-modal="true" aria-label="佳乐考研快捷命令" className="command-panel product-command-panel" onMouseDown={(event) => event.stopPropagation()}>
        <div className="command-brand"><BrandLogo /><button className="icon-button" onClick={onClose} aria-label="关闭快捷命令"><X size={18} /></button></div>
        <div className="command-search-row"><Search size={19} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && results[0]) { onNavigate(results[0].id); onClose(); } }} placeholder="搜索功能、知识库、AI 助手或考试工具…" /><kbd>ESC</kbd></div>
        <div className="command-results">
          {results.length === 0 ? <div className="command-empty"><Search size={24} /><strong>没有找到匹配功能</strong><span>尝试输入“知识库”“错题”“AI”或“计划”。</span></div> : NAV_GROUPS.map((group) => {
            const groupResults = results.filter((item) => group.items.some((entry) => entry.id === item.id));
            if (!groupResults.length) return null;
            return <section key={group.id}><p>{group.label}</p>{groupResults.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => { onNavigate(item.id); onClose(); }}><span className={`command-result-icon tone-${item.accent || "blue"}`}><Icon size={18} /></span><span><strong>{item.label}</strong><small>{item.description}</small></span><ArrowRight size={15} /></button>; })}</section>;
          })}
        </div>
        <div className="command-footer"><span><Command size={12} /> Enter 打开</span><span>↑ ↓ 选择</span><span>Esc 关闭</span></div>
      </div>
    </div>
  );
}