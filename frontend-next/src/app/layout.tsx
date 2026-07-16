import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";
import "./design-system.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-graduate-exam-os.renjl130-ai-exam.workers.dev"),
  title: { default: "佳乐考研 · AI驱动的新一代考研学习平台", template: "%s · 佳乐考研" },
  description: "佳乐考研（Jiale Graduate）是AI驱动的新一代考研学习平台，提供知识库、学习计划、智能复习、模拟考试、错题诊断与 AI 学习助手。",
  applicationName: "佳乐考研",
  keywords: ["佳乐考研", "Jiale Graduate", "考研", "AI学习", "考研知识库", "智能复习"],
  authors: [{ name: "Jiale Graduate" }],
  creator: "Jiale Graduate",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "佳乐考研 · Jiale Graduate",
    title: "佳乐考研 · AI驱动的新一代考研学习平台",
    description: "专业、可信赖、现代化的考研学习平台。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F7FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0C1018" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('jiale-graduate-theme')||'light';var r=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.dataset.theme=r;document.documentElement.dataset.themeMode=t;document.documentElement.style.colorScheme=r;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}