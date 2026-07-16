"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface KnowledgePoint {
  id: string;
  title: string;
  content: string;
  importance: string;
  frequency: string;
  tags: string[];
  exam_tips: string;
  ai_explanation: string;
  chapter_id: string;
  subject_id: string;
}

interface HotTopic {
  id: string;
  title: string;
  heat: number;
  subject: string;
  keywords: string[];
  summary: string;
  examAngle: string;
  relatedTheories: string[];
  sampleOutline: string;
}

// 从内容中提取关键词
function extractKeywords(content: string, title: string): string[] {
  const keywords: string[] = [];
  const commonKeywords = [
    "ChatGPT", "AI", "算法", "短视频", "直播", "融媒体", "全媒体",
    "社交媒体", "大数据", "人工智能", "深度伪造", "元宇宙", "VR",
    "数字鸿沟", "信息茧房", "舆论", "网络暴力", "数据新闻",
    "国际传播", "话语权", "媒介融合", "县级融媒体", "AIGC", "Sora"
  ];

  for (const kw of commonKeywords) {
    if (content.includes(kw) || title.includes(kw)) {
      keywords.push(kw);
    }
  }

  // 如果关键词不足，从标签中补充
  if (keywords.length < 3) {
    const tagKeywords = ["传播学", "新闻学", "新媒体", "网络传播", "广告", "公关"];
    for (const kw of tagKeywords) {
      if (content.includes(kw) && !keywords.includes(kw)) {
        keywords.push(kw);
      }
    }
  }

  return keywords.slice(0, 5);
}

// 根据重要度计算热度
function calculateHeat(importance: string, frequency: string): number {
  let base = 70;
  if (importance === "high") base = 90;
  else if (importance === "medium") base = 80;

  if (frequency === "high") base += 5;
  else if (frequency === "low") base -= 5;

  return Math.min(99, Math.max(60, base));
}

// 从内容中提取答题框架
function extractFramework(content: string): string {
  const lines = content.split('\n');
  const frameworkLines: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.match(/^\d+\./) || trimmed.match(/^[-•]/) || trimmed.match(/^\*\*/)) {
      inList = true;
      frameworkLines.push(trimmed);
    } else if (inList && trimmed === '') {
      break;
    }
  }

  if (frameworkLines.length > 0) {
    return frameworkLines.slice(0, 5).join('\n');
  }

  return "1. 概念定义\n2. 现状分析\n3. 影响因素\n4. 积极影响\n5. 消极影响\n6. 应对策略";
}

export default function HotTopicsPage() {
  const [hotTopics, setHotTopics] = useState<HotTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState("all");

  useEffect(() => {
    fetchHotTopics();
  }, []);

  async function fetchHotTopics() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // 获取新媒体热点专题章节的知识点
      const response = await fetch(`${API_BASE}/api/knowledge/chapters/ch_xc_wl_newmedia/points`, { headers });
      if (response.ok) {
        const data = await response.json();
        const points: KnowledgePoint[] = data.knowledge_points || data.points || [];

        const mappedTopics: HotTopic[] = points.map(p => {
          const keywords = extractKeywords(p.content, p.title);
          const heat = calculateHeat(p.importance, p.frequency);

          return {
            id: p.id,
            title: p.title,
            heat,
            subject: "334/440",
            keywords,
            summary: p.content.substring(0, 150) + (p.content.length > 150 ? '...' : ''),
            examAngle: p.exam_tips || "论述题：结合实例分析",
            relatedTheories: keywords.slice(0, 3),
            sampleOutline: extractFramework(p.content),
          };
        });

        setHotTopics(mappedTopics);
      }
    } catch (error) {
      console.error('获取热点专题失败:', error);
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: '16px',
  };

  const filtered = hotTopics.filter((t) => {
    if (filterSubject !== "all" && !t.subject.includes(filterSubject)) return false;
    return true;
  });

  const heatColor = (heat: number) => {
    if (heat >= 90) return "var(--red-500)";
    if (heat >= 80) return "var(--orange-500)";
    if (heat >= 70) return "var(--brand-500)";
    return "var(--text-muted)";
  };

  if (loading) {
    return (
      <div className="animate-fade-in max-w-5xl mx-auto flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载热点专题中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">热点专题</h2>
        <p className="text-sm text-gray-400 mt-1">2025-2026新传考研热点 · 含考题角度和答题框架</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "334", "440", "政治"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterSubject(s)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={filterSubject === s ? {
              background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))', color: 'var(--on-brand)',
            } : { background: 'var(--glass-05)', color: 'var(--text-muted)' }}
          >
            {s === "all" ? "全部" : s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-16" style={cardStyle}>
            <div className="text-5xl mb-4">🔥</div>
            <p className="text-gray-400">暂无热点专题数据</p>
          </div>
        ) : filtered.map((topic) => (
          <div key={topic.id} className="rounded-2xl overflow-hidden" style={cardStyle}>
            <button
              onClick={() => setExpandedId(expandedId === topic.id ? null : topic.id)}
              className="w-full p-5 text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-sm text-white">{topic.title}</span>
                <span className="text-xs px-2 py-1 rounded-lg font-bold"
                  style={{ background: `${heatColor(topic.heat)}20`, color: heatColor(topic.heat) }}>
                  🔥 {topic.heat}%
                </span>
              </div>
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {topic.keywords.slice(0, 3).map((kw) => (
                  <span key={kw} className="text-xs px-2 py-0.5 rounded-md"
                    style={{ background: 'var(--glass-05)', color: 'var(--text-muted)' }}>
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">{topic.summary}</p>
              <div className="text-xs mt-2 text-gray-500">{topic.subject} · 点击展开详情</div>
            </button>

            {expandedId === topic.id && (
              <div className="px-5 pb-5 space-y-3 animate-fade-in">
                <div className="p-4 rounded-xl" style={{ background: 'var(--glass-03)' }}>
                  <h4 className="text-sm font-semibold text-white mb-2">📋 考题角度</h4>
                  <p className="text-sm text-gray-300">{topic.examAngle}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'color-mix(in srgb,var(--brand-500) 8%,transparent)', border: '1px solid color-mix(in srgb,var(--brand-500) 20%,transparent)' }}>
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">🔗 相关理论</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.relatedTheories.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: 'color-mix(in srgb,var(--brand-500) 15%,transparent)', color: 'var(--brand-400)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'color-mix(in srgb,var(--green-500) 8%,transparent)', border: '1px solid color-mix(in srgb,var(--green-500) 20%,transparent)' }}>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">📝 答题框架</h4>
                  <pre className="text-xs text-gray-300 whitespace-pre-line">{topic.sampleOutline}</pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
