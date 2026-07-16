"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, LogOut, PanelLeftClose, Sparkles, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getToken } from "@/lib/api";
import { NAV_GROUPS } from "@/lib/navigation";
import { daysUntil, readSettings, SETTINGS_UPDATED_EVENT } from "@/lib/preferences";
import BrandLogo from "@/components/BrandLogo";
import { safeDisplayName, safeText } from "@/lib/utils";

interface SidebarProps { activeTab: string; onTabChange: (tab: string) => void; mobileOpen?: boolean; onMobileClose?: () => void; }

export default function Sidebar({ activeTab, onTabChange, mobileOpen = false, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const displayName = safeDisplayName(user?.username);
  const [collapsed, setCollapsed] = useState(false);
  const [dueCards, setDueCards] = useState(0);
  const [settings, setSettings] = useState(() => readSettings());
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ study: true, "exam-zone": true, "ai-zone": true, "resources-zone": false, "personal-zone": false });

  useEffect(() => {
    const saved = window.localStorage.getItem("jiale-sidebar-collapsed") ?? window.localStorage.getItem("exam_os_sidebar_collapsed");
    if (saved) setCollapsed(saved === "true");
    const updateSettings = () => setSettings(readSettings());
    window.addEventListener(SETTINGS_UPDATED_EVENT, updateSettings);
    window.addEventListener("storage", updateSettings);
    return () => { window.removeEventListener(SETTINGS_UPDATED_EVENT, updateSettings); window.removeEventListener("storage", updateSettings); };
  }, []);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
    const token = getToken();
    fetch(`${API_BASE}/api/flashcards/stats`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setDueCards(data?.due ?? data?.due_today ?? 0))
      .catch(() => undefined);
  }, []);

  const activeGroup = useMemo(() => NAV_GROUPS.find((group) => group.items.some((item) => item.id === activeTab))?.id, [activeTab]);
  useEffect(() => { if (activeGroup) setOpenGroups((current) => ({ ...current, [activeGroup]: true })); }, [activeGroup]);

  const changeTab = (id: string) => { onTabChange(id); onMobileClose?.(); };
  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    window.localStorage.setItem("jiale-sidebar-collapsed", String(next));
  };
  const daysLeft = daysUntil(settings.examDate);
  const progress = Math.max(3, Math.min(100, 100 - daysLeft / 3.65));

  return (
    <>
      {mobileOpen && <button aria-label="关闭导航遮罩" className="sidebar-backdrop lg:hidden" onClick={onMobileClose} />}
      <aside aria-label="主导航" className={`app-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
        <div className="sidebar-brand-row">
          <button onClick={() => changeTab("dashboard")} className="min-w-0 flex-1 text-left" aria-label="返回学习驾驶舱">
            <BrandLogo compact={collapsed} />
          </button>
          <button aria-label="关闭导航" className="icon-button lg:hidden" onClick={onMobileClose}><X size={18} /></button>
        </div>

        {!collapsed && (
          <button className="sidebar-exam-card" onClick={() => changeTab("settings")}>
            <span className="sidebar-exam-label">2027 考研倒计时</span>
            <span className="sidebar-exam-value"><strong>{daysLeft}</strong><small>天</small></span>
            <span className="sidebar-exam-school">{settings.targetSchool || "设置目标院校"}</span>
            <span className="sidebar-progress"><i style={{ width: `${progress}%` }} /></span>
          </button>
        )}

        {!collapsed && (
          <button className="sidebar-ai-card" onClick={() => changeTab("tutor")}>
            <span className="sidebar-ai-icon"><Sparkles size={17} /></span>
            <span><strong>AI 今日建议</strong><small>根据学习进度规划下一步</small></span>
            <ChevronDown size={14} className="-rotate-90" />
          </button>
        )}

        <nav className="sidebar-scroll" aria-label="功能分组">
          {NAV_GROUPS.map((group) => {
            const isOpen = collapsed || openGroups[group.id];
            return (
              <section key={group.id} className="sidebar-group">
                {!collapsed && (
                  <button className="sidebar-group-trigger" onClick={() => setOpenGroups((current) => ({ ...current, [group.id]: !current[group.id] }))} aria-expanded={isOpen}>
                    <span>{group.label}</span><ChevronDown size={14} className={isOpen ? "" : "-rotate-90"} />
                  </button>
                )}
                <div className={`sidebar-group-items ${isOpen ? "is-open" : ""}`}>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = item.id === activeTab;
                    const badge = item.id === "flashcards" ? dueCards : 0;
                    return (
                      <button key={item.id} title={collapsed ? `${item.label} · ${item.description}` : undefined} onClick={() => changeTab(item.id)} className={`sidebar-link accent-${item.accent || "blue"} ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}>
                        <span className="sidebar-link-icon"><Icon size={18} strokeWidth={1.85} /></span>
                        {!collapsed && <><span className="sidebar-link-copy"><strong>{item.label}</strong><small>{active ? item.description : ""}</small></span>{badge > 0 && <span className="nav-badge">{badge > 99 ? "99+" : badge}</span>}</>}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          {!collapsed && (
            <div className="sidebar-user-card">
              <span className="user-avatar">{displayName.slice(0, 1)}</span>
              <span className="min-w-0 flex-1"><strong>{displayName}</strong><small>{safeText(user?.target_major, settings.targetMajor || "目标专业待设置")}</small></span>
              <button className="icon-button" title="退出登录" aria-label="退出登录" onClick={logout}><LogOut size={17} /></button>
            </div>
          )}
          <button onClick={toggleCollapsed} className="sidebar-collapse-button" aria-label={collapsed ? "展开侧边栏" : "收起侧边栏"} title={collapsed ? "展开侧边栏" : "收起侧边栏"}>
            {collapsed ? <PanelLeftClose size={18} className="rotate-180" /> : <><ChevronLeft size={18} /><span>收起导航</span></>}
          </button>
        </div>
      </aside>
    </>
  );
}