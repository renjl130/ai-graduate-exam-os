import type { LucideIcon } from "lucide-react";
import {
  BarChart3, BookOpen, Bot, BrainCircuit, CalendarDays, CircleHelp, FileSearch, FileUp,
  Flame, GraduationCap, Languages, LibraryBig, Network, NotebookPen, Search, Settings,
  Sparkles, Target, Trophy, Users, WalletCards,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  keywords?: string[];
  accent?: "blue" | "green" | "orange" | "violet" | "cyan";
}

export interface NavGroup {
  id: string;
  label: string;
  description: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "study",
    label: "学习专区",
    description: "计划、知识与日常学习",
    items: [
      { id: "dashboard", label: "学习驾驶舱", description: "今日任务、成长趋势与行动建议", icon: BarChart3, keywords: ["首页", "仪表盘", "总览"], accent: "blue" },
      { id: "plan", label: "学习计划", description: "规划每日任务与学习节奏", icon: CalendarDays, accent: "blue" },
      { id: "knowledge", label: "知识库", description: "按学科和章节系统学习", icon: LibraryBig, accent: "green" },
      { id: "knowledge-review", label: "知识复习", description: "按照记忆规律复习知识点", icon: NotebookPen, accent: "green" },
      { id: "flashcards", label: "闪卡复习", description: "快速巩固核心记忆", icon: WalletCards, accent: "cyan" },
      { id: "vocabulary", label: "词汇打卡", description: "考研英语词汇间隔复习", icon: Languages, accent: "cyan" },
      { id: "english", label: "英语专项", description: "阅读、语法、写作与翻译", icon: Languages, accent: "cyan" },
      { id: "politics", label: "政治专项", description: "理论框架、材料分析与训练", icon: GraduationCap, accent: "orange" },
      { id: "theories", label: "核心理论", description: "新传高频理论精讲", icon: BrainCircuit, accent: "green" },
    ],
  },
  {
    id: "exam-zone",
    label: "考试专区",
    description: "训练、诊断与院校目标",
    items: [
      { id: "exam", label: "模拟考试", description: "限时训练并记录考试表现", icon: Trophy, accent: "orange" },
      { id: "wrong", label: "错题本", description: "复盘错误并消除薄弱点", icon: CircleHelp, accent: "orange" },
      { id: "exam-prediction", label: "成绩预测", description: "查看趋势、风险与冲刺方向", icon: Target, accent: "orange" },
      { id: "school", label: "院校情报", description: "目标院校与专业信息", icon: FileSearch, accent: "orange" },
    ],
  },
  {
    id: "ai-zone",
    label: "AI 专区",
    description: "智能辅导与学习决策",
    items: [
      { id: "tutor", label: "AI 学习助手", description: "提问、讲解与答题训练", icon: Bot, keywords: ["AI导师", "问答"], accent: "violet" },
      { id: "recommendations", label: "AI 学习建议", description: "根据薄弱项安排下一步", icon: Sparkles, accent: "violet" },
      { id: "vector-search", label: "AI 语义检索", description: "使用自然语言检索知识点", icon: BrainCircuit, accent: "violet" },
      { id: "graph", label: "知识图谱", description: "查看概念之间的联系", icon: Network, accent: "violet" },
    ],
  },
  {
    id: "resources-zone",
    label: "资源中心",
    description: "资料、导入与热点内容",
    items: [
      { id: "resources", label: "资料库", description: "管理 PDF、笔记和文档", icon: BookOpen, accent: "green" },
      { id: "document-import", label: "文档导入", description: "将资料转为结构化知识", icon: FileUp, accent: "green" },
      { id: "search", label: "全局资料搜索", description: "搜索知识点与学习资料", icon: Search, accent: "cyan" },
      { id: "hotspots", label: "热点专题", description: "热点事件与答题框架", icon: Flame, accent: "orange" },
    ],
  },
  {
    id: "personal-zone",
    label: "个人中心",
    description: "社区、偏好与账号",
    items: [
      { id: "community", label: "学习社区", description: "交流经验与学习动态", icon: Users, accent: "blue" },
      { id: "settings", label: "个人设置", description: "目标、主题与数据管理", icon: Settings, accent: "blue" },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);
export function getNavItem(id: string) { return NAV_ITEMS.find((item) => item.id === id) ?? NAV_ITEMS[0]; }