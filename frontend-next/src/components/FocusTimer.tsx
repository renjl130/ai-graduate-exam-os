"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Clock3, Pause, Play, RotateCcw, X } from "lucide-react";
import { getToken } from "@/lib/api";
import { readSettings } from "@/lib/preferences";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const TIMER_KEY = "exam_os_focus_timer";

interface TimerState {
  status: "idle" | "running" | "paused";
  elapsed: number;
  startedAt: number | null;
  sessionId: string | null;
  subject: string;
  targetMinutes: number;
}

const initialTimer = (): TimerState => ({
  status: "idle",
  elapsed: 0,
  startedAt: null,
  sessionId: null,
  subject: "专业课 440",
  targetMinutes: readSettings().focusMinutes || 50,
});

function loadTimer(): TimerState {
  if (typeof window === "undefined") return initialTimer();
  try {
    const saved = JSON.parse(window.localStorage.getItem(TIMER_KEY) || "null") as TimerState | null;
    return saved ? { ...initialTimer(), ...saved } : initialTimer();
  } catch {
    return initialTimer();
  }
}

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hours > 0
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function FocusTimer() {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState<TimerState>(() => loadTimer());
  const [now, setNow] = useState(Date.now());
  const [syncing, setSyncing] = useState(false);

  const elapsed = useMemo(() => {
    if (timer.status !== "running" || !timer.startedAt) return timer.elapsed;
    return timer.elapsed + Math.max(0, Math.floor((now - timer.startedAt) / 1000));
  }, [now, timer]);

  const progress = Math.min(100, (elapsed / Math.max(1, timer.targetMinutes * 60)) * 100);

  useEffect(() => {
    if (timer.status !== "running") return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [timer.status]);

  useEffect(() => {
    window.localStorage.setItem(TIMER_KEY, JSON.stringify(timer));
  }, [timer]);

  const authHeaders = () => {
    const token = getToken();
    return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  };

  const start = async () => {
    setSyncing(true);
    let sessionId: string | null = null;
    try {
      const response = await fetch(`${API_BASE}/api/study-sessions/start`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ subject: timer.subject, activity_type: "focus" }),
      });
      if (response.ok) sessionId = (await response.json()).session_id;
    } catch {
      // 离线时仍允许本地专注，稍后完成的数据保留在本地统计中。
    } finally {
      setSyncing(false);
    }
    setNow(Date.now());
    setTimer((current) => ({ ...current, status: "running", startedAt: Date.now(), sessionId }));
  };

  const stopActiveSegment = async (currentElapsed: number) => {
    const segmentSeconds = timer.startedAt ? Math.max(1, Math.floor((Date.now() - timer.startedAt) / 1000)) : currentElapsed;
    if (!timer.sessionId) return;
    try {
      await fetch(`${API_BASE}/api/study-sessions/${timer.sessionId}/stop`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ duration_seconds: segmentSeconds }),
      });
    } catch {
      // 本地计时不因后端短暂不可用而丢失。
    }
  };

  const pause = async () => {
    const currentElapsed = elapsed;
    setTimer((current) => ({ ...current, status: "paused", elapsed: currentElapsed, startedAt: null, sessionId: null }));
    await stopActiveSegment(currentElapsed);
  };

  const finish = async () => {
    const total = elapsed;
    if (timer.status === "running") await stopActiveSegment(total);
    window.dispatchEvent(new CustomEvent("exam-os-study-session-completed", { detail: { seconds: total, subject: timer.subject } }));
    setTimer(initialTimer());
    setNow(Date.now());
    setOpen(false);
  };

  const reset = async () => {
    if (timer.status === "running") await stopActiveSegment(elapsed);
    setTimer(initialTimer());
    setNow(Date.now());
  };

  return (
    <>
      <button className={`focus-pill ${timer.status === "running" ? "is-running" : ""}`} onClick={() => setOpen(true)}>
        <Clock3 size={16} />
        <span className="focus-label hidden sm:inline">{timer.status === "idle" ? "开始专注" : formatTime(elapsed)}</span>
        {timer.status === "running" && <span className="focus-live-dot" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md" onMouseDown={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="专注计时器" className="focus-panel w-full max-w-md p-6" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">Focus session</p>
                <h2 className="mt-1 text-xl font-semibold text-white">专注学习</h2>
              </div>
              <button className="icon-button" onClick={() => setOpen(false)} aria-label="关闭"><X size={18} /></button>
            </div>

            <div className="relative mx-auto my-7 flex h-56 w-56 items-center justify-center rounded-full" style={{ background: `conic-gradient(var(--brand-400) ${progress}%, var(--glass-06) ${progress}% 100%)` }}>
              <div className="absolute inset-[7px] rounded-full bg-[var(--surface-subtle)]" />
              <div className="relative text-center">
                <div className="font-mono text-4xl font-semibold tracking-tight text-white">{formatTime(elapsed)}</div>
                <p className="mt-2 text-xs text-slate-500">目标 {timer.targetMinutes} 分钟 · {Math.round(progress)}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="field-label">学习科目
                <select className="field-input mt-1.5" value={timer.subject} disabled={timer.status === "running"} onChange={(event) => setTimer((current) => ({ ...current, subject: event.target.value }))}>
                  <option>专业课 440</option><option>专业课 334</option><option>英语二</option><option>政治</option><option>知识复习</option><option>模考训练</option>
                </select>
              </label>
              <label className="field-label">本次目标
                <select className="field-input mt-1.5" value={timer.targetMinutes} disabled={timer.status === "running"} onChange={(event) => setTimer((current) => ({ ...current, targetMinutes: Number(event.target.value) }))}>
                  <option value={25}>25 分钟</option><option value={50}>50 分钟</option><option value={90}>90 分钟</option><option value={120}>120 分钟</option>
                </select>
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              {timer.status === "running" ? (
                <button className="secondary-action flex-1" onClick={pause}><Pause size={17} />暂停</button>
              ) : (
                <button className="primary-action flex-1" disabled={syncing} onClick={start}><Play size={17} />{timer.status === "paused" ? "继续" : "开始"}</button>
              )}
              {timer.status !== "idle" && <button className="success-action flex-1" onClick={finish}><Check size={17} />完成并记录</button>}
              <button className="icon-action" onClick={reset} title="重置"><RotateCcw size={17} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
