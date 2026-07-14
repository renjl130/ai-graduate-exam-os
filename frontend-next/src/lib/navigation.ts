import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  CalendarDays,
  CircleHelp,
  FileSearch,
  FileUp,
  Flame,
  GraduationCap,
  Languages,
  LibraryBig,
  MessageCircleMore,
  Network,
  NotebookPen,
  Search,
  Settings,
  Sparkles,
  Target,
  Trophy,
  Users,
  WalletCards,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  keywords?: string[];
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "today",
    label: "今日学习",
    items: [
      { id: "dashboard", label: "学习总览", description: "今日任务、进度与行动建议", icon: BarChart3, keywords: ["首页", "仪表盘"] },
      { id: "plan", label: "学习计划", description: "规划每日任务与时间", icon: CalendarDays },
      { id: "recommendations", label: "智能推荐", description: "根据薄弱项安排下一步", icon: Sparkles },
    ],
  },
  {
    id: "learn",
    label: "知识学习",
    items: [
      { id: "knowledge", label: "知识库", description: "按学科和章节系统学习", icon: LibraryBig },
      { id: "tutor", label: "AI 导师", description: "提问、讲解与答题训练", icon: Bot },
      { id: "vector-search", label: "语义检索", description: "用自然语言检索知识点", icon: BrainCircuit },
      { id: "search", label: "资料搜索", description: "搜索本地学习资料", icon: Search },
      { id: "resources", label: "资料库", description: "管理 PDF、笔记和文档", icon: BookOpen },
      { id: "document-import", label: "文档导入", description: "将资料转为结构化知识", icon: FileUp },
      { id: "graph", label: "知识图谱", description: "查看概念之间的联系", icon: Network },
    ],
  },
  {
    id: "practice",
    label: "复习与训练",
    items: [
      { id: "knowledge-review", label: "知识复习", description: "按遗忘曲线复习知识点", icon: NotebookPen },
      { id: "flashcards", label: "闪卡复习", description: "快速巩固核心记忆", icon: WalletCards },
      { id: "exam", label: "模拟考试", description: "限时训练并自动评分", icon: Trophy },
      { id: "wrong", label: "错题本", description: "复盘错误并消除薄弱点", icon: CircleHelp },
      { id: "exam-prediction", label: "成绩预测", description: "查看分数趋势与风险", icon: Target },
      { id: "vocabulary", label: "词汇打卡", description: "英语词汇间隔复习", icon: Languages },
    ],
  },
  {
    id: "subjects",
    label: "专项内容",
    items: [
      { id: "theories", label: "核心理论", description: "新传高频理论精讲", icon: BrainCircuit },
      { id: "hotspots", label: "热点专题", description: "热点事件与答题框架", icon: Flame },
      { id: "english", label: "英语专项", description: "阅读、写作与翻译", icon: Languages },
      { id: "politics", label: "政治专项", description: "知识框架与刷题", icon: GraduationCap },
      { id: "school", label: "院校情报", description: "目标院校与专业信息", icon: FileSearch },
    ],
  },
  {
    id: "more",
    label: "更多",
    items: [
      { id: "community", label: "学习社区", description: "交流经验与学习动态", icon: Users },
      { id: "settings", label: "偏好设置", description: "目标、日期与数据管理", icon: Settings },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export function getNavItem(id: string) {
  return NAV_ITEMS.find((item) => item.id === id) ?? NAV_ITEMS[0];
}
