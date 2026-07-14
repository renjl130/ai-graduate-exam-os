"use client";

import { useEffect, useState } from "react";
import { Check, Download, RotateCcw, Save, ShieldCheck, Target, UserRound } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { DEFAULT_SETTINGS, ExamSettings, readSettings, SETTINGS_STORAGE_KEY, writeSettings } from "@/lib/preferences";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState<ExamSettings>(() => readSettings());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = readSettings();
    setSettings({
      ...stored,
      name: stored.name === DEFAULT_SETTINGS.name ? (user?.username || stored.name) : stored.name,
      targetSchool: stored.targetSchool || user?.target_school || "",
      targetMajor: stored.targetMajor || user?.target_major || "",
    });
  }, [user]);

  const update = <K extends keyof ExamSettings>(key: K, value: ExamSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      writeSettings(settings);
      await updateUser({
        username: settings.name,
        target_school: settings.targetSchool,
        target_major: settings.targetMajor,
      });
      setSaved(true);
      setMessage("设置已保存，并同步到个人资料。");
    } catch {
      writeSettings(settings);
      setMessage("本地设置已保存，个人资料暂未同步。");
    } finally {
      setSaving(false);
      window.setTimeout(() => setSaved(false), 2500);
    }
  };

  const exportData = () => {
    const payload: Record<string, unknown> = { exportedAt: new Date().toISOString(), version: 1 };
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (key?.startsWith("exam_os_")) payload[key] = window.localStorage.getItem(key);
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `研途AI-本地数据-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("本地学习数据已导出。");
  };

  const resetPreferences = () => {
    if (!window.confirm("恢复默认偏好？学习记录和登录状态不会被清除。")) return;
    const next = { ...DEFAULT_SETTINGS, name: user?.username || DEFAULT_SETTINGS.name, targetSchool: user?.target_school || DEFAULT_SETTINGS.targetSchool, targetMajor: user?.target_major || DEFAULT_SETTINGS.targetMajor };
    setSettings(next);
    writeSettings(next);
    setMessage("偏好已恢复为默认值。");
  };

  const clearLocalStudyData = () => {
    if (!window.confirm("确定清除本机上的计划、计时器和界面偏好吗？云端账户数据不会被删除。")) return;
    const keys = Object.keys(window.localStorage).filter((key) => key.startsWith("exam_os_") && key !== SETTINGS_STORAGE_KEY);
    keys.forEach((key) => window.localStorage.removeItem(key));
    setMessage(`已清除 ${keys.length} 项本地缓存，登录状态保持不变。`);
  };

  const totalScore = Object.values(settings.targetScore).reduce((sum, score) => sum + Number(score), 0);

  return (
    <div className="mx-auto max-w-5xl animate-fade-in pb-10">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="eyebrow">Preferences</p><h2 className="mt-2 text-2xl font-semibold text-white">学习设置</h2><p className="mt-1 text-sm text-slate-500">目标越清晰，计划、倒计时和推荐越准确。</p></div>
        <button className="primary-action" disabled={saving} onClick={save}>{saved ? <Check size={17} /> : <Save size={17} />}{saving ? "保存中…" : saved ? "已保存" : "保存设置"}</button>
      </div>

      {message && <div className="mb-4 rounded-xl border border-blue-400/15 bg-blue-400/[0.06] px-4 py-3 text-sm text-blue-200">{message}</div>}

      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <section className="surface-card p-6">
          <SectionTitle icon={UserRound} title="个人与报考信息" description="这些信息会用于首页问候和 AI 个性化建议。" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <TextField label="昵称" value={settings.name} onChange={(value) => update("name", value)} />
            <TextField label="本科学校" value={settings.school} onChange={(value) => update("school", value)} placeholder="选填" />
            <TextField label="本科专业" value={settings.major} onChange={(value) => update("major", value)} placeholder="选填" />
            <TextField label="目标院校" value={settings.targetSchool} onChange={(value) => update("targetSchool", value)} />
            <TextField label="目标专业" value={settings.targetMajor} onChange={(value) => update("targetMajor", value)} />
            <TextField label="初试日期" type="date" value={settings.examDate} onChange={(value) => update("examDate", value)} />
          </div>
        </section>

        <section className="surface-card p-6">
          <SectionTitle icon={Target} title="学习节奏" description="建议设置可持续的目标，而不是一次性冲刺。" />
          <div className="mt-6 space-y-6">
            <RangeField label="每日有效学习目标" value={settings.dailyGoalHours} min={1} max={14} suffix="小时" onChange={(value) => update("dailyGoalHours", value)} />
            <div>
              <div className="mb-3 flex items-center justify-between"><span className="text-sm text-slate-300">默认专注时长</span><strong className="text-blue-300">{settings.focusMinutes} 分钟</strong></div>
              <div className="grid grid-cols-4 gap-2">{[25, 50, 90, 120].map((minutes) => <button key={minutes} onClick={() => update("focusMinutes", minutes)} className={`rounded-xl border py-2.5 text-sm transition ${settings.focusMinutes === minutes ? "border-blue-400/35 bg-blue-400/10 text-blue-200" : "border-white/[0.06] bg-white/[0.025] text-slate-500 hover:text-slate-300"}`}>{minutes}</button>)}</div>
            </div>
          </div>
        </section>
      </div>

      <section className="surface-card mt-4 p-6">
        <SectionTitle icon={Target} title="目标分数" description={`当前总目标 ${totalScore} / 500 分`} />
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { key: "politics" as const, label: "政治", max: 100, color: "text-rose-300" },
            { key: "english" as const, label: "英语二", max: 100, color: "text-blue-300" },
            { key: "major1" as const, label: "专业课 334", max: 150, color: "text-emerald-300" },
            { key: "major2" as const, label: "专业课 440", max: 150, color: "text-amber-300" },
          ].map((subject) => (
            <label key={subject.key} className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
              <span className="block text-xs text-slate-500">{subject.label} · 满分 {subject.max}</span>
              <input type="number" min={0} max={subject.max} value={settings.targetScore[subject.key]} onChange={(event) => update("targetScore", { ...settings.targetScore, [subject.key]: Math.min(subject.max, Math.max(0, Number(event.target.value))) })} className={`mt-2 w-full bg-transparent text-2xl font-semibold outline-none ${subject.color}`} />
            </label>
          ))}
        </div>
      </section>

      <section className="surface-card mt-4 p-6">
        <SectionTitle icon={ShieldCheck} title="数据与隐私" description="账户数据存储于本地后端；计划与部分界面偏好同时保留浏览器缓存。" />
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <DataAction icon={Download} title="导出本地数据" description="下载计划、偏好和本地记录的 JSON 备份。" onClick={exportData} />
          <DataAction icon={RotateCcw} title="恢复默认偏好" description="保留学习记录，仅重置目标和界面设置。" onClick={resetPreferences} />
          <DataAction icon={ShieldCheck} title="清理本地缓存" description="不退出登录，也不会删除云端账户数据。" onClick={clearLocalStudyData} danger />
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, description }: { icon: typeof UserRound; title: string; description: string }) {
  return <div className="flex gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300"><Icon size={19} /></span><div><h3 className="font-medium text-slate-100">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div></div>;
}

function TextField({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  return <label className="field-label">{label}<input className="field-input mt-1.5" type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

function RangeField({ label, value, min, max, suffix, onChange }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) {
  return <label><span className="mb-3 flex items-center justify-between text-sm"><span className="text-slate-300">{label}</span><strong className="text-blue-300">{value} {suffix}</strong></span><input className="w-full accent-blue-500" type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}

function DataAction({ icon: Icon, title, description, onClick, danger = false }: { icon: typeof Download; title: string; description: string; onClick: () => void; danger?: boolean }) {
  return <button onClick={onClick} className={`rounded-2xl border p-4 text-left transition ${danger ? "border-rose-400/10 bg-rose-400/[0.04] hover:bg-rose-400/[0.08]" : "border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.05]"}`}><Icon size={18} className={danger ? "text-rose-300" : "text-slate-400"} /><strong className={`mt-3 block text-sm ${danger ? "text-rose-200" : "text-slate-200"}`}>{title}</strong><span className="mt-1 block text-xs leading-5 text-slate-600">{description}</span></button>;
}
