import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 考研OS · 一站式AI考研学习平台",
  description: "一站式 AI 考研学习操作系统 - 智能问答、闪卡复习、模拟考试、错题管理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <AuthProvider>
            <div style={{ position: "relative", zIndex: 0 }}>
              {children}
            </div>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
