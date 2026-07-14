"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  CalendarCheck2,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Flame,
  GraduationCap,
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
  WalletCards,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getToken, studyPlanApi } from "@/lib/api";
import { daysUntil, formatExamDate, readSettings, SETTINGS_UPDATED_EVENT } from "@/lib/preferences";
import {
  cacheStudyTasks,
  isLocalStudyTask,
  loadCachedStudyTasks,
  localDateKey,
  normalizeStudyPlan,
  STUDY_PLAN_UPDATED_EVENT,
  StudyTask,
} from "@/lib/study-plan";

interface DashboardData {
  today: { chat_messages: number; flashcards_reviewed: number; total_activities: number; exams_taken: number; study_minutes: number };
  totals: { conversations: number; messages: number; flashcards: number; wrong_questions: number; exams: number };
  due: { flashcards: number; wrong_questions: number; knowledge_reviews: number };
  performance: { exam_avg_accuracy: number; streak_days: number };
  knowledge: { total_points: number; reviewed: number; due: number };
  vocabulary: { total: number; mastered: number };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 6) return "夜深了";
  if (hour < 11) return "早上好";
  if (hour < 14) return "中午好";
  if (hour < 18) return "下午好";
  return "晚上好";
}

export default function DashboardPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [settings, setSettings] = useState(() => readSettings());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const cachedTasks = loadCachedStudyTasks();
    setTasks(cachedTasks);
    const token = getToken();

    if (!token) {
      setError("登录状态已失效，请重新登录");
      setLoading(false);
      return;
    }

    const [statsResult, plansResult] = await Promise.allSettled([
      fetch(`${API_BASE}/api/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (response) => {
        if (!response.ok) throw new Error("学习数据暂时不可用");
        return response.json() as Promise<DashboardData>;
      }),
      studyPlanApi.list(),
    ]);

    if (statsResult.status === "fulfilled") {
      setData(statsResult.value);
    } else {
      setError(statsResult.reason instanceof Error ? statsResult.reason.message : "学习数据加载失败");
    }

    if (plansResult.status === "fulfilled") {
      const remoteTasks = plansResult.value.plans.map(normalizeStudyPlan);
      const hasPendingLocal = cachedTasks.some(isLocalStudyTask);
      if (remoteTasks.length > 0 || !hasPendingLocal) {
        setTasks(remoteTasks);
        cacheStudyTasks(remoteTasks, false);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const refresh = () => {
      setSettings(readSettings());
      setTasks(loadCachedStudyTasks());
      load();
    };
    window.addEventListener(SETTINGS_UPDATED_EVENT, refresh);
    window.addEventListener("exam-os-study-session-completed", refresh);
    window.addEventListener(STUDY_PLAN_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SETTINGS_UPDATED_EVENT, refresh);
      window.removeEventListener("exam-os-study-session-completed", refresh);
      window.removeEventListener(STUDY_PLAN_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [load]);

  const todayTasks = useMemo(() => tasks.filter((task) => task.date === localDateKey()), [tasks]);
  const completedTasks = todayTasks.filter((task) => task.completed);
  const nextTask = todayTasks.find((task) => !task.completed);
  const plannedMinutes = todayTasks.reduce((sum, task) => sum + Number(task.duration || 0), 0);
  const studyMinutes = data?.today.study_minutes ?? 0;
  const dailyGoalMinutes = settings.dailyGoalHours * 60;
  const timeProgress = Math.min(100, Math.round((studyMinutes / Math.max(1, dailyGoalMinutes)) * 100));
  const taskProgress = todayTasks.length ? Math.round((completedTasks.length / todayTasks.length) * 100) : 0;
  const daysLeft = daysUntil(settings.examDate);
  const dueTotal = (data?.due.flashcards ?? 0) + (data?.due.knowledge_reviews ?? 0) + (data?.totals.wrong_questions ?? 0);

  if (loading && !data) return <DashboardSkeleton />;

  return (
    <div className="dashboard-page mx-auto max-w-[1440px] animate-fade-in">
      <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">{new Intl.DateTimeFormat("zh-CN", { weekday: "long", month: "long", day: "numeric" }).format(new Date())} · Study cockpit</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{greeting()}，{user?.username || "同学"}</h2>
          <p className="mt-2 text-sm text-slate-400">
            {nextTask ? `今天还有 ${todayTasks.length - completedTasks.length} 项任务，先完成最重要的一项。` : todayTasks.length ? "今日计划已完成，可以进行复习或提前学习。" : "先建立今天的计划，再开始一段专注学习。"}
          </p>
        </div>
        <button className="countdown-chip" onClick={() => onNavigate?.("settings")}>
          <span><strong>{daysLeft}</strong> 天</span>
          <small>距考试 · {formatExamDate(settings.examDate)}</small>
        </button>
      </section>

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] px-4 py-3 text-sm text-amber-200">
          <CircleAlert size={17} /><span className="flex-1">{error}，当前展示本地计划。</span>
          <button className="inline-flex items-center gap-1.5 text-xs" onClick={load}><RefreshCw size={14} />重试</button>
        </div>
      )}

      <section className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
        <div className="hero-card relative overflow-hidden p-6 sm:p-7">
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow text-blue-300/80">Next best action</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{nextTask?.title || "创建今天的学习计划"}</h3>
              </div>
              <span className="hidden rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300 sm:block">{nextTask?.subject || "今日规划"}</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              {nextTask ? `预计 ${nextTask.duration} 分钟 · ${nextTask.priority === "high" ? "高优先级，建议现在开始" : "按计划稳步完成"}` : "把目标拆成可执行任务，系统才能为你计算进度并给出更准确的建议。"}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="primary-action" onClick={() => onNavigate?.(nextTask ? "plan" : "plan")}>
                {nextTask ? <><Clock3 size={17} />查看并开始</> : <><CalendarCheck2 size={17} />制定计划</>}
              </button>
              <button className="secondary-action" onClick={() => onNavigate?.("tutor")}><Bot size={17} />问 AI 导师</button>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-5">
              <MiniMetric label="计划任务" value={`${completedTasks.length}/${todayTasks.length}`} />
              <MiniMetric label="计划时长" value={plannedMinutes ? `${Math.floor(plannedMinutes / 60)}h ${plannedMinutes % 60}m` : "未安排"} />
              <MiniMetric label="今日专注" value={`${studyMinutes} min`} accent />
            </div>
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <div><p className="eyebrow">Daily momentum</p><h3 className="mt-1 text-lg font-semibold text-white">今日学习势能</h3></div>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-300"><Flame size={21} /></span>
          </div>
          <div className="mt-6 space-y-5">
            <ProgressRow label="任务完成" detail={`${completedTasks.length} / ${todayTasks.length} 项`} progress={taskProgress} color="from-blue-400 to-violet-400" />
            <ProgressRow label="专注时长" detail={`${studyMinutes} / ${dailyGoalMinutes} 分钟`} progress={timeProgress} color="from-emerald-400 to-cyan-400" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <MetricTile icon={Flame} label="连续学习" value={`${data?.performance.streak_days ?? 0} 天`} color="orange" />
            <MetricTile icon={Trophy} label="模考均分" value={`${data?.performance.exam_avg_accuracy ?? 0}%`} color="violet" />
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ActionStat icon={WalletCards} label="待复习闪卡" value={data?.due.flashcards ?? 0} action="开始复习" onClick={() => onNavigate?.("flashcards")} color="blue" />
        <ActionStat icon={BrainCircuit} label="待复习知识" value={data?.due.knowledge_reviews ?? 0} action="进入队列" onClick={() => onNavigate?.("knowledge-review")} color="violet" />
        <ActionStat icon={CircleAlert} label="错题沉淀" value={data?.totals.wrong_questions ?? 0} action="复盘错题" onClick={() => onNavigate?.("wrong")} color="rose" />
        <ActionStat icon={BookOpenCheck} label="知识库进度" value={`${data?.knowledge.reviewed ?? 0}/${data?.knowledge.total_points ?? 0}`} action="继续学习" onClick={() => onNavigate?.("knowledge")} color="emerald" />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <div><p className="eyebrow">Today plan</p><h3 className="mt-1 text-lg font-semibold text-white">今日任务</h3></div>
            <button className="text-link" onClick={() => onNavigate?.("plan")}>管理计划 <ArrowRight size={14} /></button>
          </div>
          <div className="mt-5 space-y-2">
            {todayTasks.length ? todayTasks.slice(0, 5).map((task) => (
              <button key={task.id} onClick={() => onNavigate?.("plan")} className="task-row group">
                {task.completed ? <CheckCircle2 size={18} className="text-emerald-400" /> : <span className="h-[18px] w-[18px] rounded-full border border-slate-600 group-hover:border-blue-400" />}
                <span className={`min-w-0 flex-1 truncate text-left text-sm ${task.completed ? "text-slate-600 line-through" : "text-slate-200"}`}>{task.title}</span>
                <span className="text-xs text-slate-600">{task.duration} min</span>
              </button>
            )) : (
              <div className="empty-inline"><CalendarCheck2 size={22} /><span>今天还没有任务</span><button onClick={() => onNavigate?.("plan")}>立即添加</button></div>
            )}
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <div><p className="eyebrow">Learning health</p><h3 className="mt-1 text-lg font-semibold text-white">学习健康度</h3></div>
            <Target size={20} className="text-blue-300" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <HealthMetric label="待处理队列" value={dueTotal} note={dueTotal ? "建议今天清理一部分" : "队列已清空"} />
            <HealthMetric label="AI 学习对话" value={data?.today.chat_messages ?? 0} note={`累计 ${data?.totals.conversations ?? 0} 个会话`} />
            <HealthMetric label="今日复习" value={data?.today.flashcards_reviewed ?? 0} note="闪卡复习数量" />
            <HealthMetric label="模考次数" value={data?.totals.exams ?? 0} note="用稳定输出检验掌握度" />
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/15 bg-violet-400/[0.07] py-3 text-sm text-violet-200 transition hover:bg-violet-400/[0.12]" onClick={() => onNavigate?.("recommendations")}><Sparkles size={16} />查看个性化建议</button>
        </div>
      </section>
    </div>
  );
}

function DashboardSkeleton() {
  return <div className="mx-auto max-w-[1440px] space-y-4"><div className="skeleton-block h-20" /><div className="grid gap-4 xl:grid-cols-[1.55fr_1fr]"><div className="skeleton-block h-80" /><div className="skeleton-block h-80" /></div><div className="grid grid-cols-2 gap-4 xl:grid-cols-4">{[1,2,3,4].map((item) => <div key={item} className="skeleton-block h-36" />)}</div></div>;
}

function MiniMetric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div><p className="text-[11px] text-slate-500">{label}</p><p className={`mt-1 truncate text-sm font-medium ${accent ? "text-emerald-300" : "text-slate-200"}`}>{value}</p></div>;
}

function ProgressRow({ label, detail, progress, color }: { label: string; detail: string; progress: number; color: string }) {
  return <div><div className="mb-2 flex items-center justify-between text-xs"><span className="text-slate-400">{label}</span><span className="text-slate-500">{detail}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/[0.05]"><div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`} style={{ width: `${progress}%` }} /></div></div>;
}

function MetricTile({ icon: Icon, label, value, color }: { icon: typeof Flame; label: string; value: string; color: "orange" | "violet" }) {
  const colors = color === "orange" ? "bg-orange-400/10 text-orange-300" : "bg-violet-400/10 text-violet-300";
  return <div className="rounded-2xl border border-white/[0.05] bg-white/[0.025] p-4"><Icon size={17} className={colors.split(" ").at(-1)} /><p className="mt-3 text-lg font-semibold text-white">{value}</p><p className="text-[11px] text-slate-500">{label}</p></div>;
}

function ActionStat({ icon: Icon, label, value, action, onClick, color }: { icon: typeof GraduationCap; label: string; value: number | string; action: string; onClick: () => void; color: "blue" | "violet" | "rose" | "emerald" }) {
  const colorMap = { blue: "bg-blue-400/10 text-blue-300", violet: "bg-violet-400/10 text-violet-300", rose: "bg-rose-400/10 text-rose-300", emerald: "bg-emerald-400/10 text-emerald-300" };
  return <button onClick={onClick} className="surface-card group p-5 text-left transition hover:-translate-y-0.5 hover:border-white/[0.12]"><div className="flex items-start justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorMap[color]}`}><Icon size={19} /></span><ArrowRight size={16} className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-400" /></div><p className="mt-4 text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p><p className="mt-3 text-xs text-slate-400">{action}</p></button>;
}

function HealthMetric({ label, value, note }: { label: string; value: number; note: string }) {
  return <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-4"><p className="text-xl font-semibold text-white">{value}</p><p className="mt-1 text-xs text-slate-400">{label}</p><p className="mt-2 truncate text-[10px] text-slate-600">{note}</p></div>;
}

