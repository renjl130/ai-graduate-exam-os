"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, LogOut, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getToken } from "@/lib/api";
import { NAV_GROUPS } from "@/lib/navigation";
import { daysUntil, readSettings, SETTINGS_UPDATED_EVENT } from "@/lib/preferences";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ activeTab, onTabChange, mobileOpen = false, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [dueCards, setDueCards] = useState(0);
  const [settings, setSettings] = useState(() => readSettings());
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    today: true,
    learn: true,
    practice: true,
    subjects: false,
    more: false,
  });

  useEffect(() => {
    const saved = window.localStorage.getItem("exam_os_sidebar_collapsed");
    if (saved) setCollapsed(saved === "true");

    const updateSettings = () => setSettings(readSettings());
    window.addEventListener(SETTINGS_UPDATED_EVENT, updateSettings);
    window.addEventListener("storage", updateSettings);
    return () => {
      window.removeEventListener(SETTINGS_UPDATED_EVENT, updateSettings);
      window.removeEventListener("storage", updateSettings);
    };
  }, []);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
    const token = getToken();
    fetch(`${API_BASE}/api/flashcards/stats`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setDueCards(data?.due_today ?? 0))
      .catch(() => undefined);
  }, []);

  const activeGroup = useMemo(
    () => NAV_GROUPS.find((group) => group.items.some((item) => item.id === activeTab))?.id,
    [activeTab],
  );

  useEffect(() => {
    if (activeGroup) setOpenGroups((current) => ({ ...current, [activeGroup]: true }));
  }, [activeGroup]);

  const changeTab = (id: string) => {
    onTabChange(id);
    onMobileClose?.();
  };

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    window.localStorage.setItem("exam_os_sidebar_collapsed", String(next));
  };

  const daysLeft = daysUntil(settings.examDate);
  const sidebarWidth = collapsed ? 84 : 276;

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="关闭导航"
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}
      <aside
        aria-label="主导航"
        className={`app-sidebar fixed inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: sidebarWidth }}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/[0.06] px-5">
          <button onClick={() => changeTab("dashboard")} className="flex min-w-0 flex-1 items-center gap-3 text-left">
            <span className="brand-mark">研</span>
            {!collapsed && (
              <span className="min-w-0">
                <strong className="block truncate text-sm font-semibold text-white">研途 AI</strong>
                <span className="block truncate text-xs text-slate-500">个人考研学习系统</span>
              </span>
            )}
          </button>
          <button aria-label="关闭导航" className="icon-button lg:hidden" onClick={onMobileClose}><X size={18} /></button>
        </div>

        {!collapsed && (
          <div className="mx-4 mt-4 rounded-2xl border border-blue-400/15 bg-blue-500/[0.08] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-300/70">Exam countdown</p>
                <p className="mt-1 text-2xl font-semibold text-white"><span className="text-blue-300">{daysLeft}</span><span className="ml-1 text-sm font-normal text-slate-400">天</span></p>
              </div>
              <span className="rounded-full bg-white/[0.06] px-2 py-1 text-[10px] text-slate-400">{settings.targetSchool || "目标院校"}</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400" style={{ width: `${Math.max(4, Math.min(100, 100 - daysLeft / 3.65))}%` }} />
            </div>
          </div>
        )}

        <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 py-4">
          {NAV_GROUPS.map((group) => {
            const isOpen = collapsed || openGroups[group.id];
            return (
              <section key={group.id} className="mb-2">
                {!collapsed && (
                  <button
                    className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500 hover:text-slate-300"
                    onClick={() => setOpenGroups((current) => ({ ...current, [group.id]: !current[group.id] }))}
                    aria-expanded={isOpen}
                  >
                    {group.label}
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`} />
                  </button>
                )}
                {isOpen && group.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.id === activeTab;
                  const badge = item.id === "flashcards" ? dueCards : 0;
                  return (
                    <button
                      key={item.id}
                      title={collapsed ? item.label : undefined}
                      onClick={() => changeTab(item.id)}
                      className={`sidebar-link ${active ? "is-active" : ""} ${collapsed ? "justify-center px-0" : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon size={19} strokeWidth={1.8} className="shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && badge > 0 && <span className="ml-auto rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white">{badge}</span>}
                    </button>
                  );
                })}
              </section>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-3">
          {!collapsed && (
            <div className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/25 to-violet-500/25 text-sm font-semibold text-blue-200">
                {(user?.username || "同").slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-slate-200">{user?.username || "同学"}</span>
                <span className="block truncate text-[11px] text-slate-500">{user?.target_major || settings.targetMajor}</span>
              </span>
              <button className="icon-button" title="退出登录" onClick={logout}><LogOut size={17} /></button>
            </div>
          )}
          <button onClick={toggleCollapsed} className="hidden w-full items-center justify-center rounded-xl py-2.5 text-slate-500 transition hover:bg-white/[0.05] hover:text-white lg:flex">
            <ChevronLeft size={18} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </aside>
    </>
  );
}
