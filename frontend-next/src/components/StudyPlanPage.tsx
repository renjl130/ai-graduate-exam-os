"use client";

import { useCallback, useEffect, useState } from "react";
import { getToken, studyPlanApi } from "@/lib/api";
import {
  cacheStudyTasks,
  isLocalStudyTask,
  loadCachedStudyTasks,
  localDateKey,
  normalizePriority,
  normalizeStudyPlan,
  StudyTask,
  studyTaskFingerprint,
} from "@/lib/study-plan";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const defaultTasks: StudyTask[] = [
  { id: "1", title: "传播学教程 - 议程设置理论精读", subject: "440", duration: 60, priority: "high", completed: false, date: today() },
  { id: "2", title: "2024年英语二真题阅读 Text 1-2", subject: "英语二", duration: 90, priority: "high", completed: false, date: today() },
  { id: "3", title: "新闻采写编评 - 消息写作技巧", subject: "334", duration: 60, priority: "high", completed: false, date: today() },
  { id: "4", title: "马原 - 唯物辩证法选择题练习", subject: "政治", duration: 45, priority: "medium", completed: false, date: today() },
  { id: "5", title: "沉默的螺旋理论复习+闪卡", subject: "440", duration: 30, priority: "medium", completed: false, date: today() },
  { id: "6", title: "新闻评论写作练习（800字）", subject: "334", duration: 60, priority: "medium", completed: false, date: today() },
  { id: "7", title: "英语单词复习（考研词汇Unit 15）", subject: "英语二", duration: 30, priority: "low", completed: false, date: today() },
];

function today() {
  return localDateKey();
}

const subjectColors: Record<string, string> = {
  "440": "var(--orange-500)",
  "334": "var(--green-500)",
  "英语二": "var(--brand-500)",
  "政治": "var(--red-500)",
};

type SyncState = "syncing" | "synced" | "offline";

export default function StudyPlanPage() {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState<{ title: string; subject: string; duration: number; priority: "high" | "medium" | "low" }>({ title: "", subject: "440", duration: 30, priority: "medium" });
  const [selectedDate, setSelectedDate] = useState(today());
  const [generating, setGenerating] = useState(false);
  const [genHours, setGenHours] = useState(10);
  const [genError, setGenError] = useState("");
  const [syncState, setSyncState] = useState<SyncState>("syncing");
  const [syncMessage, setSyncMessage] = useState("正在同步云端计划…");

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "20px",
  };

  const inputStyle = {
    background: "var(--glass-06)",
    border: "1px solid var(--glass-10)",
    borderRadius: "12px",
  };

  const save = useCallback((nextTasks: StudyTask[]) => {
    setTasks(nextTasks);
    cacheStudyTasks(nextTasks);
  }, []);

  const createRemoteTask = useCallback(async (task: StudyTask) => {
    const created = await studyPlanApi.create({
      title: task.title,
      subject: task.subject,
      duration: task.duration,
      priority: task.priority,
      date: task.date,
    });
    if (task.completed) await studyPlanApi.toggle(created.id);
    return { ...task, id: created.id };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const cached = loadCachedStudyTasks();
    const initialTasks = cached.length > 0 ? cached : defaultTasks;
    setTasks(initialTasks);
    cacheStudyTasks(initialTasks, false);

    const reconcile = async () => {
      if (!getToken()) {
        setSyncState("offline");
        setSyncMessage("未登录云端，当前使用本地计划");
        return;
      }

      setSyncState("syncing");
      setSyncMessage("正在同步云端计划…");
      try {
        const response = await studyPlanApi.list();
        if (cancelled) return;

        const remoteTasks = response.plans.map(normalizeStudyPlan);
        const remoteFingerprints = new Set(remoteTasks.map(studyTaskFingerprint));
        const pendingLocal = initialTasks.filter(
          (task) => isLocalStudyTask(task) && !remoteFingerprints.has(studyTaskFingerprint(task)),
        );

        const syncedLocal: StudyTask[] = [];
        const failedLocal: StudyTask[] = [];
        if (pendingLocal.length) {
          const results = await Promise.allSettled(pendingLocal.map(createRemoteTask));
          results.forEach((result, index) => {
            if (result.status === "fulfilled") syncedLocal.push(result.value);
            else failedLocal.push(pendingLocal[index]);
          });
        }
        if (cancelled) return;

        const merged = [...remoteTasks, ...syncedLocal, ...failedLocal];
        save(merged);
        if (failedLocal.length) {
          setSyncState("offline");
          setSyncMessage(`${failedLocal.length} 个任务已保存在本地，联网后将继续同步`);
        } else {
          setSyncState("synced");
          setSyncMessage(`已同步 ${merged.length} 个学习任务`);
        }
      } catch {
        if (cancelled) return;
        setSyncState("offline");
        setSyncMessage("云端暂不可用，修改会安全保存在本地");
      }
    };

    void reconcile();
    return () => {
      cancelled = true;
    };
  }, [createRemoteTask, save]);

  const toggleTask = async (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    const updatedTask = { ...task, completed: !task.completed };
    const previous = tasks;
    save(tasks.map((item) => (item.id === id ? updatedTask : item)));

    if (!getToken()) return;
    try {
      if (isLocalStudyTask(task)) {
        const synced = await createRemoteTask(updatedTask);
        save(tasks.map((item) => (item.id === id ? synced : item)));
      } else {
        await studyPlanApi.toggle(id);
      }
      setSyncState("synced");
      setSyncMessage("任务进度已同步");
    } catch {
      save(previous);
      setSyncState("offline");
      setSyncMessage("同步失败，已恢复任务原状态");
    }
  };

  const deleteTask = async (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    const previous = tasks;
    save(tasks.filter((item) => item.id !== id));

    if (!getToken() || isLocalStudyTask(task)) return;
    try {
      await studyPlanApi.delete(id);
      setSyncState("synced");
      setSyncMessage("任务已从云端删除");
    } catch {
      save(previous);
      setSyncState("offline");
      setSyncMessage("删除同步失败，任务已恢复");
    }
  };

  const addTask = async () => {
    if (!newTask.title.trim()) return;
    const task: StudyTask = {
      id: `local_${crypto.randomUUID()}`,
      ...newTask,
      title: newTask.title.trim(),
      completed: false,
      date: selectedDate,
    };
    const nextTasks = [...tasks, task];
    save(nextTasks);
    setNewTask({ title: "", subject: "440", duration: 30, priority: "medium" });
    setShowAdd(false);

    if (!getToken()) return;
    setSyncState("syncing");
    setSyncMessage("正在保存新任务…");
    try {
      const synced = await createRemoteTask(task);
      save(nextTasks.map((item) => (item.id === task.id ? synced : item)));
      setSyncState("synced");
      setSyncMessage("新任务已同步");
    } catch {
      setSyncState("offline");
      setSyncMessage("新任务已保存在本地，联网后可继续同步");
    }
  };

  useEffect(() => {
    if (!showAdd) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowAdd(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showAdd]);

  const handleAiGenerate = async () => {
    setGenerating(true);
    setGenError("");
    const token = getToken();
    try {
      const res = await fetch(`${API_BASE}/api/study-plan/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ hours_per_day: genHours, days: 7 }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setGenError(data.error || data.detail || "AI 生成失败，请稍后重试");
        return;
      }

      const startDate = new Date(`${today()}T12:00:00`);
      const generatedTasks: StudyTask[] = [];
      (data.plan || []).forEach((day: { day?: number; tasks?: { title: string; subject?: string; duration?: number; priority?: string }[] }, dayIndex: number) => {
        const date = new Date(startDate);
        const dayOffset = Math.max(0, Number(day.day ?? dayIndex + 1) - 1);
        date.setDate(date.getDate() + dayOffset);
        const dateStr = localDateKey(date);
        (day.tasks || []).forEach((item) => {
          if (!item.title?.trim()) return;
          generatedTasks.push({
            id: `local_${crypto.randomUUID()}`,
            title: item.title.trim(),
            subject: item.subject || "440",
            duration: Math.max(15, Number(item.duration) || 30),
            priority: normalizePriority(item.priority),
            completed: false,
            date: dateStr,
          });
        });
      });

      if (!generatedTasks.length) {
        setGenError("AI 未生成有效任务，请重试");
        return;
      }

      const baseTasks = [...tasks, ...generatedTasks];
      save(baseTasks);
      if (!token) return;

      setSyncState("syncing");
      setSyncMessage(`正在同步 ${generatedTasks.length} 个 AI 任务…`);
      const results = await Promise.allSettled(generatedTasks.map(createRemoteTask));
      const replacements = new Map<string, StudyTask>();
      let failed = 0;
      results.forEach((result, index) => {
        if (result.status === "fulfilled") replacements.set(generatedTasks[index].id, result.value);
        else failed += 1;
      });
      save(baseTasks.map((task) => replacements.get(task.id) || task));
      if (failed) {
        setSyncState("offline");
        setSyncMessage(`${failed} 个 AI 任务待联网同步，其余已保存`);
      } else {
        setSyncState("synced");
        setSyncMessage("AI 学习计划已同步到云端");
      }
    } catch {
      setGenError("AI 生成失败，请检查后端服务或网络连接");
    } finally {
      setGenerating(false);
    }
  };

  const dayTasks = tasks.filter((t) => t.date === selectedDate);
  const completedCount = dayTasks.filter((t) => t.completed).length;
  const totalMinutes = dayTasks.reduce((sum, t) => sum + t.duration, 0);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + i);
    return localDateKey(d);
  });

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">学习计划</h2>
          <p className="text-sm text-gray-400 mt-1">每日任务管理 · 合理分配四科时间</p>
          <div className={`mt-2 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] ${
            syncState === "synced"
              ? "bg-emerald-400/10 text-emerald-300"
              : syncState === "syncing"
                ? "bg-blue-400/10 text-blue-300"
                : "bg-amber-400/10 text-amber-300"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${syncState === "synced" ? "bg-emerald-300" : syncState === "syncing" ? "animate-pulse bg-blue-300" : "bg-amber-300"}`} />
            {syncMessage}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={genHours}
            onChange={(e) => setGenHours(Number(e.target.value))}
            className="px-3 py-2 rounded-xl text-sm text-white focus:outline-none"
            style={{ ...inputStyle, width: 'auto', appearance: 'none' }}
          >
            <option value={6}>6h/天</option>
            <option value={8}>8h/天</option>
            <option value={10}>10h/天</option>
            <option value={12}>12h/天</option>
          </select>
          <button
            onClick={handleAiGenerate}
            disabled={generating}
            className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, var(--violet-500), var(--violet-500))',
              boxShadow: '0 4px 15px color-mix(in srgb,var(--violet-500) 40%,transparent)',
            }}
          >
            {generating ? "生成中..." : "AI 生成计划"}
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))',
              boxShadow: '0 4px 15px color-mix(in srgb,var(--brand-500) 40%,transparent)',
            }}
          >
            + 添加任务
          </button>
        </div>
      </div>

      {genError && (
        <div className="mb-4 p-4 rounded-xl text-sm text-red-400"
          style={{ background: 'color-mix(in srgb,var(--red-500) 8%,transparent)', border: '1px solid color-mix(in srgb,var(--red-500) 20%,transparent)' }}>
          {genError}
        </div>
      )}

      {generating && (
        <div className="mb-4 p-4 rounded-xl text-sm text-gray-400"
          style={{ background: 'color-mix(in srgb,var(--green-500) 8%,transparent)', border: '1px solid color-mix(in srgb,var(--green-500) 20%,transparent)' }}>
          AI 正在生成一周学习计划，预计需要 30-60 秒...
        </div>
      )}

      {/* Week Selector */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {weekDays.map((d) => {
          const dayTaskCount = tasks.filter((t) => t.date === d).length;
          const dayCompleted = tasks.filter((t) => t.date === d && t.completed).length;
          const isToday = d === today();
          const isSelected = d === selectedDate;
          const dateObj = new Date(d + "T00:00:00");
          const dayNames = ["日", "一", "二", "三", "四", "五", "六"];
          return (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className="min-w-16 flex-1 rounded-xl p-3 text-center transition-all"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, var(--brand-500), var(--brand-500))'
                  : isToday
                  ? 'var(--glass-06)'
                  : 'var(--glass-03)',
                border: `1px solid ${isSelected ? 'color-mix(in srgb,var(--brand-500) 30%,transparent)' : 'var(--glass-06)'}`,
                color: isSelected ? 'var(--on-brand)' : 'var(--text-secondary)',
              }}
            >
              <div className="text-xs opacity-70">周{dayNames[dateObj.getDay()]}</div>
              <div className="text-lg font-bold">{dateObj.getDate()}</div>
              {dayTaskCount > 0 && (
                <div className="text-xs mt-1 opacity-70">{dayCompleted}/{dayTaskCount}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress Overview */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: dayTasks.length, label: "今日任务", color: "var(--brand-500)" },
          { value: completedCount, label: "已完成", color: "var(--green-500)" },
          { value: `${Math.floor(totalMinutes / 60)}h${totalMinutes % 60}m`, label: "计划时长", color: "var(--orange-500)" },
          { value: `${dayTasks.length > 0 ? Math.round((completedCount / dayTasks.length) * 100) : 0}%`, label: "完成率", color: "var(--violet-500)" },
        ].map(s => (
          <div key={s.label} className="p-5 rounded-2xl text-center" style={cardStyle}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Time Distribution */}
      <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
        <h3 className="font-semibold mb-4 text-white">今日时间分配</h3>
        <div className="flex gap-1 h-3 rounded-full overflow-hidden" style={{ background: 'var(--glass-05)' }}>
          {dayTasks.map((t) => (
            <div
              key={t.id}
              className="h-full rounded-full transition-all"
              style={{
                width: `${(t.duration / Math.max(totalMinutes, 1)) * 100}%`,
                background: t.completed ? subjectColors[t.subject] || 'var(--brand-500)' : 'var(--glass-10)',
                opacity: t.completed ? 1 : 0.4,
              }}
              title={`${t.title} (${t.duration}分钟)`}
            />
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          {Object.entries(subjectColors).map(([sub, color]) => {
            const subTasks = dayTasks.filter((t) => t.subject === sub);
            if (subTasks.length === 0) return null;
            const subMinutes = subTasks.reduce((s, t) => s + t.duration, 0);
            return (
              <div key={sub} className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                {sub}: {subMinutes}分钟
              </div>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {dayTasks.length === 0 ? (
          <div className="text-center py-16" style={cardStyle}>
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-400">暂无任务，点击右上角添加</p>
          </div>
        ) : (
          dayTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 p-4 rounded-xl transition-all"
              style={{
                background: task.completed ? 'var(--glass-02)' : 'var(--glass-03)',
                border: '1px solid var(--glass-06)',
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              <button
                type="button"
                aria-label={`${task.completed ? "标记为未完成" : "标记为已完成"}：${task.title}`}
                aria-pressed={task.completed}
                onClick={() => toggleTask(task.id)}
                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs transition-all"
                style={{
                  background: task.completed ? 'var(--green-500)' : 'transparent',
                  border: task.completed ? 'none' : '2px solid var(--glass-10)',
                  color: task.completed ? 'var(--on-brand)' : 'transparent',
                }}
              >
                ✓
              </button>
              <div className="flex-1 min-w-0">
                <span
                  className="text-sm block truncate text-white"
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.title}
                </span>
                <span className="text-xs text-gray-400">{task.subject} · {task.duration}分钟</span>
              </div>
              <span
                className="text-xs px-2 py-1 rounded-lg"
                style={{
                  background: task.priority === 'high'
                    ? 'color-mix(in srgb,var(--red-500) 12%,transparent)'
                    : task.priority === 'medium'
                    ? 'color-mix(in srgb,var(--orange-500) 12%,transparent)'
                    : 'color-mix(in srgb,var(--brand-500) 12%,transparent)',
                  color: task.priority === 'high'
                    ? 'var(--red-500)'
                    : task.priority === 'medium'
                    ? 'var(--orange-500)'
                    : 'var(--brand-400)',
                }}
              >
                {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
              </span>
              <button
                type="button"
                aria-label={`删除任务：${task.title}`}
                onClick={() => deleteTask(task.id)}
                className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                style={{ background: 'var(--glass-03)' }}
              >
                删除
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAdd(false); }}
          style={{ background: 'var(--overlay)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md p-6 rounded-2xl" role="dialog" aria-modal="true" aria-labelledby="add-task-title"
            style={{ background: 'var(--surface)', border: '1px solid var(--glass-10)' }}>
            <h3 className="text-lg font-bold mb-4 text-white">添加学习任务</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="任务内容"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={inputStyle}
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newTask.subject}
                  onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                  className="px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                  style={{ ...inputStyle, appearance: 'none' }}
                >
                  <option value="440">440 新传基础</option>
                  <option value="334">334 新传综合</option>
                  <option value="英语二">英语二</option>
                  <option value="政治">政治</option>
                </select>
                <select
                  value={newTask.duration}
                  onChange={(e) => setNewTask({ ...newTask, duration: Number(e.target.value) })}
                  className="px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                  style={{ ...inputStyle, appearance: 'none' }}
                >
                  <option value={15}>15分钟</option>
                  <option value={30}>30分钟</option>
                  <option value={45}>45分钟</option>
                  <option value={60}>60分钟</option>
                  <option value={90}>90分钟</option>
                  <option value={120}>120分钟</option>
                </select>
              </div>
              <div className="flex gap-2">
                {(["high", "medium", "low"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setNewTask({ ...newTask, priority: p })}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: newTask.priority === p
                        ? 'linear-gradient(135deg, var(--brand-500), var(--brand-500))'
                        : 'var(--glass-05)',
                      color: newTask.priority === p ? 'var(--on-brand)' : 'var(--text-muted)',
                    }}
                  >
                    {p === "high" ? "高优先" : p === "medium" ? "中优先" : "低优先"}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-300 transition-all"
                  style={{ background: 'var(--glass-05)' }}
                >
                  取消
                </button>
                <button
                  onClick={addTask}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))',
                    boxShadow: '0 4px 15px color-mix(in srgb,var(--brand-500) 40%,transparent)',
                  }}
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
