"use client";

import { useEffect, useState } from "react";
import { Bell, Bot, CalendarClock, ChevronDown, Menu, Search, Settings, Sparkles, UserRound } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getToken } from "@/lib/api";
import type { NavItem } from "@/lib/navigation";
import { daysUntil, readSettings } from "@/lib/preferences";
import FocusTimer from "@/components/FocusTimer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { safeDisplayName, safeText } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function AppHeader({ activeItem, onMenu, onCommand, onNavigate }: {
  activeItem: NavItem;
  onMenu: () => void;
  onCommand: () => void;
  onNavigate: (tab: string) => void;
}) {
  const { user, logout } = useAuth();
  const displayName = safeDisplayName(user?.username);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [studyMinutes, setStudyMinutes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const settings = readSettings();
  const daysLeft = daysUntil(settings.examDate);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetch(`${API_BASE}/api/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data) return;
        const minutes = Number(data.today?.study_minutes || 0);
        const reviews = Number(data.today?.flashcards_reviewed || 0);
        const exams = Number(data.today?.exams_taken || 0);
        setStudyMinutes(minutes);
        setStreak(Number(data.performance?.streak_days || 0));
        setPoints(minutes + reviews * 2 + exams * 10);
      })
      .catch(() => undefined);
  }, []);

  return (
    <header className="app-topbar" aria-label="全局工具栏">
      <div className="topbar-title-group">
        <button className="icon-button lg:hidden" onClick={onMenu} aria-label="打开主导航"><Menu size={20} /></button>
        <div className="min-w-0">
          <div className="topbar-breadcrumb"><span>佳乐考研</span><span>/</span><span>{activeItem.label}</span></div>
          <h1>{activeItem.label}</h1>
        </div>
      </div>

      <button className="global-search" onClick={onCommand} aria-label="打开全局搜索">
        <Search size={17} />
        <span>搜索知识、功能与资料</span>
        <kbd>Ctrl K</kbd>
      </button>

      <div className="topbar-actions">
        <div className="header-study-status hidden 2xl:flex" title="今日学习状态">
          <span className="status-dot" />
          <span><strong>{studyMinutes}</strong> 分钟</span>
          <span className="header-divider" />
          <span>连续 <strong>{streak}</strong> 天</span>
        </div>

        <button className="header-points hidden xl:flex" title="学习积分由今日专注、复习和模考活动生成">
          <Sparkles size={15} /><span>{points} 积分</span>
        </button>

        <button className="exam-reminder hidden lg:flex" onClick={() => onNavigate("settings")} title={`距考试 ${daysLeft} 天`}>
          <CalendarClock size={17} /><span><strong>{daysLeft}</strong> 天</span>
        </button>

        <button className="ai-entry" onClick={() => onNavigate("tutor")} title="打开 AI 学习助手">
          <Bot size={18} /><span className="hidden xl:inline">AI 助手</span>
        </button>

        <FocusTimer />
        <ThemeSwitcher compact />

        <div className="header-popover-wrap">
          <button className="icon-button" aria-label="消息中心" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((value) => !value); setUserOpen(false); }}>
            <Bell size={18} /><span className="notification-dot" />
          </button>
          {notificationsOpen && (
            <div className="header-popover notification-popover">
              <div className="popover-heading"><div><strong>消息中心</strong><span>学习提醒与系统通知</span></div><span className="soft-badge">2 条</span></div>
              <button onClick={() => { onNavigate("plan"); setNotificationsOpen(false); }}><CalendarClock size={17} /><span><strong>今日学习计划</strong><small>{studyMinutes > 0 ? `已专注 ${studyMinutes} 分钟，继续保持。` : "今天还没有专注记录，开始第一项任务吧。"}</small></span></button>
              <button onClick={() => { onNavigate("recommendations"); setNotificationsOpen(false); }}><Sparkles size={17} /><span><strong>AI 学习建议已更新</strong><small>结合待复习队列查看下一步学习建议。</small></span></button>
            </div>
          )}
        </div>

        <div className="header-popover-wrap">
          <button className="user-menu-trigger" aria-label="打开用户菜单" aria-expanded={userOpen} onClick={() => { setUserOpen((value) => !value); setNotificationsOpen(false); }}>
            <span className="user-avatar">{displayName.slice(0, 1)}</span>
            <span className="hidden min-w-0 text-left xl:block"><strong>{displayName}</strong><small>备考学习者</small></span>
            <ChevronDown size={14} className="hidden xl:block" />
          </button>
          {userOpen && (
            <div className="header-popover user-popover">
              <div className="user-card"><span className="user-avatar is-large">{displayName.slice(0, 1)}</span><span><strong>{displayName}</strong><small>{safeText(user?.target_major, settings.targetMajor || "目标专业待设置")}</small></span></div>
              <button onClick={() => { onNavigate("settings"); setUserOpen(false); }}><Settings size={16} />个人设置</button>
              <button onClick={() => { onNavigate("dashboard"); setUserOpen(false); }}><UserRound size={16} />学习主页</button>
              <button className="danger-item" onClick={logout}>退出登录</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}