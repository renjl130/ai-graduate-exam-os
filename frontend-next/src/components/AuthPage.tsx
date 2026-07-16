"use client";

import { useState } from "react";
import { ArrowRight, BookOpenCheck, BrainCircuit, CheckCircle2, Eye, EyeOff, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import BrandLogo from "@/components/BrandLogo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const { login, register, error, clearError, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({ email: "", username: "", password: "", confirmPassword: "", target_school: "", target_major: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); clearError(); setFormError("");
    if (mode === "register") {
      if (formData.password !== formData.confirmPassword) return setFormError("两次输入的密码不一致");
      if (formData.password.length < 8) return setFormError("密码至少需要 8 位");
      await register({ email: formData.email, username: formData.username, password: formData.password, target_school: formData.target_school || undefined, target_major: formData.target_major || undefined });
    } else await login(formData.email, formData.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const switchMode = (next: AuthMode) => { setMode(next); clearError(); setFormError(""); };

  return (
    <main className="auth-shell">
      <div className="auth-theme"><ThemeSwitcher compact /></div>
      <section className="auth-brand-panel" aria-label="佳乐考研产品介绍">
        <div className="auth-brand-inner">
          <BrandLogo />
          <div className="auth-hero-copy">
            <span className="auth-kicker"><Sparkles size={15} /> AI 驱动的新一代考研学习平台</span>
            <h1>让每一次学习，<br /><em>都更接近上岸。</em></h1>
            <p>从计划、专注、理解、复习到检测与复盘，佳乐考研用可信赖的 AI 和系统化知识库陪伴你的完整备考旅程。</p>
          </div>
          <div className="auth-feature-grid">
            <AuthFeature icon={BrainCircuit} title="AI 学习助手" detail="知识讲解、错题诊断与学习建议" tone="violet" />
            <AuthFeature icon={BookOpenCheck} title="721+ 知识点" detail="新传、政治与英语完整知识体系" tone="green" />
            <AuthFeature icon={GraduationCap} title="科学备考闭环" detail="计划、复习、模考与成长分析" tone="orange" />
            <AuthFeature icon={ShieldCheck} title="数据安全隔离" detail="个人学习数据与导入资料专属保护" tone="blue" />
          </div>
          <div className="auth-trust-row"><span><CheckCircle2 size={15} /> Light / Dark 双主题</span><span><CheckCircle2 size={15} /> AI 个性化学习</span><span><CheckCircle2 size={15} /> 多端响应式体验</span></div>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-mobile-brand"><BrandLogo /></div>
        <div className="auth-form-wrap">
          <div className="auth-form-heading">
            <span className="eyebrow">WELCOME TO JIALE GRADUATE</span>
            <h2>{mode === "login" ? "欢迎回来" : "开启你的备考旅程"}</h2>
            <p>{mode === "login" ? "登录后继续今天的学习计划。" : "创建账号，建立属于你的考研学习系统。"}</p>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="账号操作">
            <button role="tab" aria-selected={mode === "login"} className={mode === "login" ? "is-active" : ""} onClick={() => switchMode("login")}>登录</button>
            <button role="tab" aria-selected={mode === "register"} className={mode === "register" ? "is-active" : ""} onClick={() => switchMode("register")}>注册</button>
          </div>

          {(error || formError) && <div role="alert" className="auth-error">{formError || error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "register" && <AuthInput label="用户名" name="username" value={formData.username} onChange={handleChange} placeholder="你的称呼" autoComplete="username" />}
            <AuthInput label="邮箱" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" type="email" autoComplete="email" />
            <label className="auth-field"><span>密码</span><div className="auth-password-wrap"><input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required placeholder={mode === "register" ? "至少 8 位密码" : "输入登录密码"} autoComplete={mode === "login" ? "current-password" : "new-password"} /><button type="button" aria-label={showPassword ? "隐藏密码" : "显示密码"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            {mode === "register" && <>
              <AuthInput label="确认密码" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="再次输入密码" type="password" autoComplete="new-password" />
              <div className="grid grid-cols-2 gap-3"><AuthInput label="目标院校（选填）" name="target_school" value={formData.target_school} onChange={handleChange} placeholder="例如：深圳大学" /><AuthInput label="目标专业（选填）" name="target_major" value={formData.target_major} onChange={handleChange} placeholder="例如：新闻与传播" /></div>
            </>}
            <button type="submit" disabled={isLoading} className="auth-submit">{isLoading ? <><span className="button-spinner" />处理中</> : <>{mode === "login" ? "登录佳乐考研" : "创建学习账号"}<ArrowRight size={17} /></>}</button>
          </form>
          <p className="auth-switch-copy">{mode === "login" ? "还没有账号？" : "已经拥有账号？"}<button onClick={() => switchMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "免费注册" : "立即登录"}</button></p>
          <p className="auth-legal">继续即表示你同意佳乐考研的服务条款与隐私说明。我们不会公开你的个人学习资料。</p>
        </div>
      </section>
    </main>
  );
}

function AuthInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className="auth-field"><span>{label}</span><input {...props} required={!label.includes("选填")} /></label>;
}

function AuthFeature({ icon: Icon, title, detail, tone }: { icon: typeof BrainCircuit; title: string; detail: string; tone: string }) {
  return <div className={`auth-feature tone-${tone}`}><span><Icon size={20} /></span><div><strong>{title}</strong><small>{detail}</small></div></div>;
}