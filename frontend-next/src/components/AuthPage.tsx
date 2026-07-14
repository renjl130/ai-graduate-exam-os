"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const { login, register, error, clearError, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    target_school: "",
    target_major: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (mode === "register") {
      if (formData.password !== formData.confirmPassword) {
        alert("两次输入的密码不一致");
        return;
      }
      if (formData.password.length < 6) {
        alert("密码长度至少6位");
        return;
      }
      await register({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        target_school: formData.target_school || undefined,
        target_major: formData.target_major || undefined,
      });
    } else {
      await login(formData.email, formData.password);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#0B0F1A' }}
    >
      {/* 背景光晕 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
            }}
          >
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">
            AI 考研OS
          </h1>
          <p className="text-lg text-gray-400">智能备考，高效学习</p>
        </div>

        {/* 液态玻璃卡片 */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl opacity-20 blur-xl"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }} />

          <div className="relative rounded-3xl p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(40px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* 模式切换 */}
            <div className="flex mb-8 p-1.5 rounded-2xl"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <button
                type="button"
                onClick={() => { setMode("login"); clearError(); }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={mode === "login" ? {
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  color: '#fff',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                } : { color: '#9CA3AF' }}
              >
                登录
              </button>
              <button
                type="button"
                onClick={() => { setMode("register"); clearError(); }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={mode === "register" ? {
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  color: '#fff',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                } : { color: '#9CA3AF' }}
              >
                注册
              </button>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl text-sm flex items-center gap-3"
                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <span className="text-lg">⚠️</span>
                <span className="text-red-400">{error}</span>
              </div>
            )}

            {/* 表单 */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">邮箱地址</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@exam.os"
                  className="w-full px-5 py-4 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                />
              </div>

              {mode === "register" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">用户名</label>
                  <input
                    type="text"
                    name="username"
                    autoComplete="name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="给自己取个名字"
                    className="w-full px-5 py-4 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">密码</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full px-5 py-4 pr-14 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">确认密码</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="再次输入密码"
                    className="w-full px-5 py-4 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  />
                </div>
              )}

              {mode === "register" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      目标院校 <span className="text-gray-500">(选填)</span>
                    </label>
                    <input
                      type="text"
                      name="target_school"
                      value={formData.target_school}
                      onChange={handleChange}
                      placeholder="深圳大学"
                      className="w-full px-4 py-3.5 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      目标专业 <span className="text-gray-500">(选填)</span>
                    </label>
                    <input
                      type="text"
                      name="target_major"
                      value={formData.target_major}
                      onChange={handleChange}
                      placeholder="新闻与传播"
                      className="w-full px-4 py-3.5 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    处理中...
                  </span>
                ) : mode === "login" ? "登 录" : "注 册"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
              {mode === "login" ? (
                <span className="text-gray-400">
                  还没有账号？{" "}
                  <button type="button" onClick={() => setMode("register")}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    立即注册
                  </button>
                </span>
              ) : (
                <span className="text-gray-400">
                  已有账号？{" "}
                  <button type="button" onClick={() => setMode("login")}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    立即登录
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            测试账号：admin@exam.os / admin123
          </p>
        </div>
      </div>
    </div>
  );
}


