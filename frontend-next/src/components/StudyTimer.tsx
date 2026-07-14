"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect, useRef } from "react";
import { getToken } from "@/lib/api";

interface StudyTimerProps {
  knowledgePointId?: string;
  subjectId?: string;
  onTimeUpdate?: (seconds: number) => void;
}

export default function StudyTimer({ knowledgePointId, subjectId, onTimeUpdate }: StudyTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (sessionId && isRunning) {
        stopTimer();
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          onTimeUpdate?.(newSeconds);
          return newSeconds;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  async function startTimer() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/api/study-sessions/start`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          knowledge_point_id: knowledgePointId,
          subject: subjectId,
          activity_type: 'study',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.session_id);
        setIsRunning(true);
        startTimeRef.current = new Date();
      }
    } catch (error) {
      console.error('启动计时失败:', error);
    }
  }

  async function stopTimer() {
    if (!sessionId) return;

    try {
      const token = getToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/api/study-sessions/${sessionId}/stop`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          duration_seconds: seconds,
        }),
      });

      if (response.ok) {
        setIsRunning(false);
        setSessionId(null);
        startTimeRef.current = null;
      }
    } catch (error) {
      console.error('停止计时失败:', error);
    }
  }

  function resetTimer() {
    setIsRunning(false);
    setSeconds(0);
    setSessionId(null);
    startTimeRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  const buttonStyle = {
    background: isRunning
      ? 'linear-gradient(135deg, #ef4444, #dc2626)'
      : 'linear-gradient(135deg, #10b981, #059669)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <div className="flex items-center gap-4">
      {/* 计时器显示 */}
      <div className="text-center">
        <div className="text-3xl font-mono font-bold" style={{ color: isRunning ? '#10b981' : '#9ca3af' }}>
          {formatTime(seconds)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {isRunning ? '学习中...' : seconds > 0 ? '已暂停' : '准备开始'}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={startTimer}
            style={buttonStyle}
            className="hover:opacity-90 transition-opacity"
          >
            ▶ 开始学习
          </button>
        ) : (
          <button
            onClick={stopTimer}
            style={buttonStyle}
            className="hover:opacity-90 transition-opacity"
          >
            ⏸ 暂停
          </button>
        )}

        {seconds > 0 && !isRunning && (
          <button
            onClick={resetTimer}
            className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#9ca3af' }}
          >
            ↻ 重置
          </button>
        )}
      </div>
    </div>
  );
}

// 学习统计组件
export function StudyStats() {
  const [stats, setStats] = useState<{
    today_minutes: number;
    week_minutes: number;
    total_minutes: number;
    streak_days: number;
  } | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/api/study-sessions/stats`, { headers });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('获取学习统计失败:', error);
    }
  }

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
  };

  if (!stats) return null;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 rounded-2xl text-center" style={cardStyle}>
        <div className="text-2xl font-bold text-blue-400">{stats.today_minutes}</div>
        <div className="text-xs text-gray-400 mt-1">今日学习（分钟）</div>
      </div>
      <div className="p-4 rounded-2xl text-center" style={cardStyle}>
        <div className="text-2xl font-bold text-green-400">{stats.week_minutes}</div>
        <div className="text-xs text-gray-400 mt-1">本周学习（分钟）</div>
      </div>
      <div className="p-4 rounded-2xl text-center" style={cardStyle}>
        <div className="text-2xl font-bold text-purple-400">{stats.total_minutes}</div>
        <div className="text-xs text-gray-400 mt-1">总学习（分钟）</div>
      </div>
      <div className="p-4 rounded-2xl text-center" style={cardStyle}>
        <div className="text-2xl font-bold text-orange-400">{stats.streak_days}</div>
        <div className="text-xs text-gray-400 mt-1">连续学习（天）</div>
      </div>
    </div>
  );
}
