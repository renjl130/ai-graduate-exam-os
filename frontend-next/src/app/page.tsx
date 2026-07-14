"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bot, CalendarDays, Home, Menu, NotebookPen, Search } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import AuthPage from "@/components/AuthPage";
import Sidebar from "@/components/Sidebar";
import DashboardPage from "@/components/DashboardPage";
import CommandPalette from "@/components/CommandPalette";
import FocusTimer from "@/components/FocusTimer";
import { getNavItem, NAV_ITEMS } from "@/lib/navigation";

const pageLoader = () => <div className="page-skeleton"><span /><span /><span /></div>;
const AiTutorPage = dynamic(() => import("@/components/AiTutorPage"), { loading: pageLoader });
const FlashcardsPage = dynamic(() => import("@/components/FlashcardsPage"), { loading: pageLoader });
const StudyPlanPage = dynamic(() => import("@/components/StudyPlanPage"), { loading: pageLoader });
const ResourceLibraryPage = dynamic(() => import("@/components/ResourceLibraryPage"), { loading: pageLoader });
const AISearchPage = dynamic(() => import("@/components/AISearchPage"), { loading: pageLoader });
const CoreTheoriesPage = dynamic(() => import("@/components/CoreTheoriesPage"), { loading: pageLoader });
const HotTopicsPage = dynamic(() => import("@/components/HotTopicsPage"), { loading: pageLoader });
const MockExamPage = dynamic(() => import("@/components/MockExamPage"), { loading: pageLoader });
const WrongQuestionsPage = dynamic(() => import("@/components/WrongQuestionsPage"), { loading: pageLoader });
const SchoolInfoPage = dynamic(() => import("@/components/SchoolInfoPage"), { loading: pageLoader });
const SettingsPage = dynamic(() => import("@/components/SettingsPage"), { loading: pageLoader });
const EnglishPage = dynamic(() => import("@/components/EnglishPage"), { loading: pageLoader });
const PoliticsPage = dynamic(() => import("@/components/PoliticsPage"), { loading: pageLoader });
const VocabularyPage = dynamic(() => import("@/components/VocabularyPage"), { loading: pageLoader });
const KnowledgeBrowserPage = dynamic(() => import("@/components/KnowledgeBrowserPage"), { loading: pageLoader });
const KnowledgeGraphPage = dynamic(() => import("@/components/KnowledgeGraphPage"), { loading: pageLoader });
const DocumentImportPage = dynamic(() => import("@/components/DocumentImportPage"), { loading: pageLoader });
const VectorSearchPage = dynamic(() => import("@/components/VectorSearchPage"), { loading: pageLoader });
const KnowledgeReviewPage = dynamic(() => import("@/components/KnowledgeReviewPage"), { loading: pageLoader });
const RecommendationsPage = dynamic(() => import("@/components/RecommendationsPage"), { loading: pageLoader });
const ExamPredictionPage = dynamic(() => import("@/components/ExamPredictionPage"), { loading: pageLoader });
const CommunityPage = dynamic(() => import("@/components/CommunityPage"), { loading: pageLoader });

const PAGE_COMPONENTS: Record<string, React.ComponentType> = {
  tutor: AiTutorPage,
  flashcards: FlashcardsPage,
  plan: StudyPlanPage,
  resources: ResourceLibraryPage,
  search: AISearchPage,
  theories: CoreTheoriesPage,
  hotspots: HotTopicsPage,
  exam: MockExamPage,
  wrong: WrongQuestionsPage,
  school: SchoolInfoPage,
  english: EnglishPage,
  politics: PoliticsPage,
  vocabulary: VocabularyPage,
  knowledge: KnowledgeBrowserPage,
  graph: KnowledgeGraphPage,
  "document-import": DocumentImportPage,
  "vector-search": VectorSearchPage,
  "knowledge-review": KnowledgeReviewPage,
  recommendations: RecommendationsPage,
  "exam-prediction": ExamPredictionPage,
  community: CommunityPage,
  settings: SettingsPage,
};

export default function HomePage() {
  const { isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const saved = window.localStorage.getItem("exam_os_active_tab");
    const initial = [hash, saved].find((value) => value && NAV_ITEMS.some((item) => item.id === value));
    if (initial) setActiveTab(initial);
  }, []);

  const navigate = useCallback((tab: string) => {
    if (!NAV_ITEMS.some((item) => item.id === tab)) tab = "dashboard";
    setActiveTab(tab);
    setMobileOpen(false);
    window.localStorage.setItem("exam_os_active_tab", tab);
    window.history.replaceState(null, "", `#${tab}`);
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeItem = useMemo(() => getNavItem(activeTab), [activeTab]);
  const ActivePage = PAGE_COMPONENTS[activeTab];

  if (isLoading) {
    return (
      <div className="app-loading">
        <span className="brand-mark brand-mark-lg">研</span>
        <div className="mt-5 h-1 w-32 overflow-hidden rounded-full bg-white/[0.06]"><span className="loading-bar block h-full" /></div>
        <p className="mt-3 text-sm text-slate-500">正在载入你的学习空间…</p>
      </div>
    );
  }

  if (!isAuthenticated) return <AuthPage />;

  return (
    <div className="app-shell">
      <Sidebar activeTab={activeTab} onTabChange={navigate} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <div className="app-content flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="app-topbar">
          <div className="flex min-w-0 items-center gap-3">
            <button className="icon-button lg:hidden" onClick={() => setMobileOpen(true)} aria-label="打开导航"><Menu size={20} /></button>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-slate-100">{activeItem.label}</h1>
              <p className="hidden truncate text-xs text-slate-500 sm:block">{activeItem.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="search-trigger" onClick={() => setCommandOpen(true)}>
              <Search size={16} />
              <span className="hidden md:inline">搜索功能</span>
              <kbd className="hidden lg:inline">Ctrl K</kbd>
            </button>
            <FocusTimer />
          </div>
        </header>

        <main className="app-main">
          <ErrorBoundary key={activeTab}>
            {activeTab === "dashboard" ? <DashboardPage onNavigate={navigate} /> : ActivePage ? <ActivePage /> : <DashboardPage onNavigate={navigate} />}
          </ErrorBoundary>
        </main>
      </div>

      <nav className="mobile-bottom-nav lg:hidden" aria-label="移动端快捷导航">
        {[
          { id: "dashboard", label: "总览", icon: Home },
          { id: "plan", label: "计划", icon: CalendarDays },
          { id: "tutor", label: "AI导师", icon: Bot },
          { id: "knowledge-review", label: "复习", icon: NotebookPen },
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return <button key={item.id} className={active ? "is-active" : ""} onClick={() => navigate(item.id)}><Icon size={20} /><span>{item.label}</span></button>;
        })}
        <button onClick={() => setMobileOpen(true)}><Menu size={20} /><span>更多</span></button>
      </nav>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} onNavigate={navigate} />
    </div>
  );
}
