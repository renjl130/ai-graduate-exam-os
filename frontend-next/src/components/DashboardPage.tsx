"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BookOpenCheck, Bot, BrainCircuit, CalendarCheck2, CalendarDays,
  CheckCircle2, CircleAlert, Clock3, Flame, GraduationCap, LineChart, RefreshCw, Sparkles,
  Target, Trophy, WalletCards, Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getToken, studyPlanApi } from "@/lib/api";
import { daysUntil, formatExamDate, readSettings, SETTINGS_UPDATED_EVENT } from "@/lib/preferences";
import { safeDisplayName } from "@/lib/utils";
import { cacheStudyTasks, isLocalStudyTask, loadCachedStudyTasks, localDateKey, normalizeStudyPlan, STUDY_PLAN_UPDATED_EVENT, StudyTask } from "@/lib/study-plan";

interface DashboardData {
  today: { chat_messages: number; flashcards_reviewed: number; total_activities: number; exams_taken: number; study_minutes: number };
  totals: { conversations: number; messages: number; flashcards: number; wrong_questions: number; exams: number };
  due: { flashcards: number; wrong_questions: number; knowledge_reviews: number };
  performance: { exam_avg_accuracy: number; streak_days: number };
  knowledge: { total_points: number; reviewed: number; due: number };
  vocabulary: { total: number; mastered: number };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
function greeting() { const hour = new Date().getHours(); if (hour < 6) return "夜深了"; if (hour < 11) return "早上好"; if (hour < 14) return "中午好"; if (hour < 18) return "下午好"; return "晚上好"; }

export default function DashboardPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [settings, setSettings] = useState(() => readSettings());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    const cachedTasks = loadCachedStudyTasks(); setTasks(cachedTasks);
    const token = getToken();
    if (!token) { setError("登录状态已失效，请重新登录"); setLoading(false); return; }
    const [statsResult, plansResult] = await Promise.allSettled([
      fetch(`${API_BASE}/api/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(async (response) => { if (!response.ok) throw new Error("学习数据暂时不可用"); return response.json() as Promise<DashboardData>; }),
      studyPlanApi.list(),
    ]);
    if (statsResult.status === "fulfilled") setData(statsResult.value); else setError(statsResult.reason instanceof Error ? statsResult.reason.message : "学习数据加载失败");
    if (plansResult.status === "fulfilled") {
      const remoteTasks = plansResult.value.plans.map(normalizeStudyPlan);
      const hasPendingLocal = cachedTasks.some(isLocalStudyTask);
      if (remoteTasks.length > 0 || !hasPendingLocal) { setTasks(remoteTasks); cacheStudyTasks(remoteTasks, false); }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const refresh = () => { setSettings(readSettings()); setTasks(loadCachedStudyTasks()); load(); };
    window.addEventListener(SETTINGS_UPDATED_EVENT, refresh); window.addEventListener("exam-os-study-session-completed", refresh); window.addEventListener(STUDY_PLAN_UPDATED_EVENT, refresh); window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(SETTINGS_UPDATED_EVENT, refresh); window.removeEventListener("exam-os-study-session-completed", refresh); window.removeEventListener(STUDY_PLAN_UPDATED_EVENT, refresh); window.removeEventListener("storage", refresh); };
  }, [load]);

  const todayTasks = useMemo(() => tasks.filter((task) => task.date === localDateKey()), [tasks]);
  const completedTasks = todayTasks.filter((task) => task.completed);
  const nextTask = todayTasks.find((task) => !task.completed);
  const plannedMinutes = todayTasks.reduce((sum, task) => sum + Number(task.duration || 0), 0);
  const studyMinutes = data?.today.study_minutes ?? 0;
  const dailyGoalMinutes = settings.dailyGoalHours * 60;
  const timeProgress = Math.min(100, Math.round((studyMinutes / Math.max(1, dailyGoalMinutes)) * 100));
  const taskProgress = todayTasks.length ? Math.round((completedTasks.length / todayTasks.length) * 100) : 0;
  const knowledgeProgress = Math.min(100, Math.round(((data?.knowledge.reviewed ?? 0) / Math.max(1, data?.knowledge.total_points ?? 1)) * 100));
  const vocabularyProgress = Math.min(100, Math.round(((data?.vocabulary.mastered ?? 0) / Math.max(1, data?.vocabulary.total ?? 1)) * 100));
  const daysLeft = daysUntil(settings.examDate);
  const dueTotal = (data?.due.flashcards ?? 0) + (data?.due.knowledge_reviews ?? 0) + (data?.totals.wrong_questions ?? 0);

  const habitDays = useMemo(() => Array.from({ length: 14 }, (_, index) => {
    const date = new Date(); date.setDate(date.getDate() - (13 - index)); const key = localDateKey(date);
    const dayTasks = tasks.filter((task) => task.date === key); const done = dayTasks.filter((task) => task.completed);
    const minutes = done.reduce((sum, task) => sum + Number(task.duration || 0), 0);
    return { key, label: `${date.getMonth() + 1}/${date.getDate()}`, minutes, level: minutes === 0 ? 0 : minutes < 45 ? 1 : minutes < 90 ? 2 : minutes < 150 ? 3 : 4 };
  }), [tasks]);

  const aiAdvice = dueTotal > 10
    ? `待复习队列已有 ${dueTotal} 项，今天优先清理高频错题和到期知识点，避免记忆债务继续累积。`
    : nextTask
      ? `先完成“${nextTask.title}”，再安排 ${Math.max(20, Math.min(45, data?.due.flashcards ?? 0))} 分钟主动回忆，学习闭环会更完整。`
      : studyMinutes < dailyGoalMinutes
        ? `今日专注完成 ${timeProgress}%，建议开始一段 25 分钟深度学习，再用 5 分钟记录输出。`
        : "今日专注目标已经完成，可以用一次轻量复习或模拟题巩固成果。";

  if (loading && !data) return <DashboardSkeleton />;

  return (
    <div className="dashboard-page product-grid animate-fade-in">
      <section className="dashboard-welcome col-span-12">
        <div>
          <p className="eyebrow">{new Intl.DateTimeFormat("zh-CN", { weekday: "long", month: "long", day: "numeric" }).format(new Date())} · JIALE GRADUATE</p>
          <h2>{greeting()}，{safeDisplayName(user?.username)}</h2>
          <p>{nextTask ? `今天还有 ${todayTasks.length - completedTasks.length} 项任务。保持节奏，把最重要的一项先完成。` : todayTasks.length ? "今日计划已经完成，可以进入复习或提前学习。" : "从一个清晰、可执行的计划开始今天的备考。"}</p>
        </div>
        <div className="welcome-actions"><button className="secondary-action" onClick={() => onNavigate?.("plan")}><CalendarDays size={16} />查看计划</button><button className="primary-action" onClick={() => onNavigate?.("tutor")}><Bot size={16} />询问 AI 助手</button></div>
      </section>

      {error && <div className="system-alert col-span-12"><CircleAlert size={17} /><span className="flex-1">{error}，当前展示本地学习计划。</span><button onClick={load}><RefreshCw size={14} />重试</button></div>}

      <section className="dashboard-hero business-card tone-blue col-span-12 xl:col-span-8">
        <div className="card-highlight" />
        <div className="hero-heading"><div><span className="section-kicker"><Zap size={14} /> NEXT BEST ACTION</span><h3>{nextTask?.title || "建立今天的学习计划"}</h3><p>{nextTask ? `${nextTask.subject || "综合学习"} · 预计 ${nextTask.duration} 分钟 · ${nextTask.priority === "high" ? "高优先级" : "按计划推进"}` : "将长期目标拆解为今天可以完成的任务，佳乐考研会持续记录你的进展。"}</p></div><span className="hero-task-badge">{nextTask?.subject || "今日规划"}</span></div>
        <div className="hero-action-row"><button className="primary-action" onClick={() => onNavigate?.("plan")}><Clock3 size={17} />{nextTask ? "查看并开始" : "制定学习计划"}</button><button className="secondary-action" onClick={() => onNavigate?.("knowledge-review")}><BrainCircuit size={17} />进入今日复习</button></div>
        <div className="hero-metrics"><DashboardMiniMetric label="任务进度" value={`${completedTasks.length}/${todayTasks.length}`} note={`${taskProgress}% 已完成`} /><DashboardMiniMetric label="计划时长" value={plannedMinutes ? `${Math.floor(plannedMinutes / 60)}h ${plannedMinutes % 60}m` : "待安排"} note="今日计划" /><DashboardMiniMetric label="今日专注" value={`${studyMinutes} min`} note={`目标 ${dailyGoalMinutes} min`} /></div>
      </section>

      <section className="exam-countdown-card business-card tone-orange col-span-12 sm:col-span-6 xl:col-span-4" onClick={() => onNavigate?.("settings")}>
        <div className="countdown-top"><span className="section-kicker"><GraduationCap size={14} /> EXAM COUNTDOWN</span><ArrowUpRight size={18} /></div>
        <div className="countdown-number"><strong>{daysLeft}</strong><span>天</span></div>
        <p>距离 {formatExamDate(settings.examDate)}</p><small>{settings.targetSchool || "设置目标院校"} · {settings.targetMajor || "设置目标专业"}</small>
        <div className="countdown-timeline"><i style={{ width: `${Math.max(4, Math.min(100, 100 - daysLeft / 3.65))}%` }} /></div>
      </section>

      <MetricCard icon={Clock3} label="今日专注" value={`${studyMinutes}`} suffix="分钟" detail={`目标完成 ${timeProgress}%`} progress={timeProgress} tone="blue" />
      <MetricCard icon={Flame} label="连续学习" value={`${data?.performance.streak_days ?? 0}`} suffix="天" detail="保持稳定学习节奏" tone="orange" />
      <MetricCard icon={BookOpenCheck} label="知识掌握" value={`${knowledgeProgress}`} suffix="%" detail={`${data?.knowledge.reviewed ?? 0}/${data?.knowledge.total_points ?? 0} 个知识点`} progress={knowledgeProgress} tone="green" />
      <MetricCard icon={Trophy} label="模拟考试" value={`${data?.performance.exam_avg_accuracy ?? 0}`} suffix="%" detail={`累计 ${data?.totals.exams ?? 0} 次模考`} tone="violet" />

      <section className="business-card col-span-12 xl:col-span-7">
        <CardHeader kicker="TODAY PLAN" title="今日学习任务" action="管理计划" onAction={() => onNavigate?.("plan")} />
        <div className="task-list">
          {todayTasks.length ? todayTasks.slice(0, 6).map((task, index) => <button key={task.id} className="dashboard-task" onClick={() => onNavigate?.("plan")}><span className={`task-index ${task.completed ? "is-done" : ""}`}>{task.completed ? <CheckCircle2 size={17} /> : String(index + 1).padStart(2, "0")}</span><span className="task-main"><strong className={task.completed ? "line-through" : ""}>{task.title}</strong><small>{task.subject || "综合学习"} · {task.priority === "high" ? "高优先级" : "计划任务"}</small></span><span className="task-duration">{task.duration} min</span></button>) : <EmptyState icon={CalendarCheck2} title="今天还没有学习任务" detail="创建一份可执行的计划，让学习进度更清晰。" action="创建计划" onAction={() => onNavigate?.("plan")} />}
        </div>
      </section>

      <section className="business-card ai-insight-card tone-violet col-span-12 xl:col-span-5">
        <CardHeader kicker="AI STUDY INSIGHT" title="AI 今日学习建议" icon={Sparkles} />
        <div className="ai-advice"><span className="ai-advice-mark"><Sparkles size={20} /></span><p>{aiAdvice}</p></div>
        <div className="ai-suggestion-grid"><button onClick={() => onNavigate?.("knowledge-review")}><BrainCircuit size={17} /><span><strong>{data?.due.knowledge_reviews ?? 0} 个</strong><small>待复习知识</small></span></button><button onClick={() => onNavigate?.("flashcards")}><WalletCards size={17} /><span><strong>{data?.due.flashcards ?? 0} 张</strong><small>到期闪卡</small></span></button><button onClick={() => onNavigate?.("wrong")}><CircleAlert size={17} /><span><strong>{data?.totals.wrong_questions ?? 0} 道</strong><small>沉淀错题</small></span></button></div>
        <button className="ai-full-action" onClick={() => onNavigate?.("recommendations")}>查看完整学习画像与建议 <ArrowRight size={15} /></button>
      </section>

      <section className="business-card col-span-12 xl:col-span-8">
        <CardHeader kicker="LEARNING GROWTH" title="知识增长与学习习惯" icon={LineChart} />
        <div className="growth-layout"><div className="growth-bars">{habitDays.map((day) => <div key={day.key} title={`${day.key} · 完成 ${day.minutes} 分钟`}><span style={{ height: `${Math.max(8, day.level * 22)}%` }} className={`level-${day.level}`} /><small>{day.label}</small></div>)}</div><div className="growth-summary"><ProgressRing value={taskProgress} label="任务完成" tone="blue" /><ProgressRing value={knowledgeProgress} label="知识掌握" tone="green" /><ProgressRing value={vocabularyProgress} label="词汇掌握" tone="cyan" /></div></div>
        <div className="heatmap-row"><span>近 14 天学习热力</span><div>{habitDays.map((day) => <i key={day.key} className={`heat-level-${day.level}`} title={`${day.key} · ${day.minutes} 分钟`} />)}</div><small>少</small><i className="heat-level-1" /><i className="heat-level-3" /><small>多</small></div>
      </section>

      <section className="business-card col-span-12 xl:col-span-4">
        <CardHeader kicker="QUICK ACTIONS" title="考试与复盘" icon={Target} />
        <div className="quick-action-list"><QuickAction icon={Trophy} title="开始模拟考试" detail="用一次完整输出检验掌握度" tone="orange" onClick={() => onNavigate?.("exam")} /><QuickAction icon={CircleAlert} title="复盘最近错题" detail={`${data?.totals.wrong_questions ?? 0} 道错题等待处理`} tone="red" onClick={() => onNavigate?.("wrong")} /><QuickAction icon={Sparkles} title="查看成绩预测" detail="结合学习与模考数据分析趋势" tone="violet" onClick={() => onNavigate?.("exam-prediction")} /></div>
      </section>
    </div>
  );
}

function DashboardSkeleton() { return <div className="product-grid"><div className="skeleton-block col-span-12 h-24" /><div className="skeleton-block col-span-12 h-72 xl:col-span-8" /><div className="skeleton-block col-span-12 h-72 xl:col-span-4" />{[1,2,3,4].map((item) => <div key={item} className="skeleton-block col-span-6 h-36 xl:col-span-3" />)}</div>; }
function CardHeader({ kicker, title, action, onAction, icon: Icon }: { kicker: string; title: string; action?: string; onAction?: () => void; icon?: typeof Sparkles }) { return <div className="card-header"><div><span className="section-kicker">{Icon && <Icon size={14} />}{kicker}</span><h3>{title}</h3></div>{action && <button onClick={onAction}>{action}<ArrowRight size={14} /></button>}</div>; }
function DashboardMiniMetric({ label, value, note }: { label: string; value: string; note: string }) { return <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>; }
function MetricCard({ icon: Icon, label, value, suffix, detail, progress, tone }: { icon: typeof Clock3; label: string; value: string; suffix: string; detail: string; progress?: number; tone: string }) { return <section className={`metric-card business-card tone-${tone} col-span-6 xl:col-span-3`}><div className="metric-card-top"><span><Icon size={19} /></span><ArrowUpRight size={16} /></div><div className="metric-value"><strong>{value}</strong><small>{suffix}</small></div><p>{label}</p><div className="metric-detail"><span>{detail}</span>{progress !== undefined && <i><b style={{ width: `${progress}%` }} /></i>}</div></section>; }
function ProgressRing({ value, label, tone }: { value: number; label: string; tone: string }) { return <div className={`progress-ring tone-${tone}`} style={{ "--progress": `${value * 3.6}deg` } as React.CSSProperties}><span><strong>{value}%</strong><small>{label}</small></span></div>; }
function QuickAction({ icon: Icon, title, detail, tone, onClick }: { icon: typeof Trophy; title: string; detail: string; tone: string; onClick: () => void }) { return <button className={`quick-action tone-${tone}`} onClick={onClick}><span><Icon size={18} /></span><span><strong>{title}</strong><small>{detail}</small></span><ArrowRight size={15} /></button>; }
function EmptyState({ icon: Icon, title, detail, action, onAction }: { icon: typeof CalendarCheck2; title: string; detail: string; action: string; onAction: () => void }) { return <div className="product-empty"><span><Icon size={23} /></span><strong>{title}</strong><p>{detail}</p><button onClick={onAction}>{action}</button></div>; }