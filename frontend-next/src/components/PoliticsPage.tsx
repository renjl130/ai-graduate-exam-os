"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface KnowledgePoint {
  id: string;
  title: string;
  content: string;
  importance: string;
  tags: string[];
  exam_tips: string;
  chapter_id: string;
}

interface PoliticsSubject {
  id: string;
  title: string;
  icon: string;
  description: string;
  score: number;
  chapters: { name: string; keyPoints: KnowledgePoint[] }[];
}

// 学科配置
const subjectConfig: Record<string, { title: string; icon: string; description: string; score: number; chapters: string[] }> = {
  "marxism": {
    title: "马克思主义基本原理",
    icon: "📕",
    description: "马原 · 约24分",
    score: 24,
    chapters: ["ch_pol_my_phil", "ch_pol_my_pe", "ch_pol_my_soc"],
  },
  "maozhongte": {
    title: "毛泽东思想和中国特色社会主义理论体系概论",
    icon: "📗",
    description: "毛中特 · 约24分",
    score: 24,
    chapters: ["ch_pol_mao", "ch_pol_deng", "ch_pol_xi"],
  },
  "shigang": {
    title: "中国近现代史纲要",
    icon: "📘",
    description: "史纲 · 约14分",
    score: 14,
    chapters: ["ch_pol_hist_old", "ch_pol_hist_new", "ch_pol_hist_soc"],
  },
  "sixiu": {
    title: "思想道德与法治",
    icon: "📙",
    description: "思修 · 约16分",
    score: 16,
    chapters: ["ch_pol_thought", "ch_pol_law"],
  },
};

// 章节ID到名称的映射
const chapterNames: Record<string, string> = {
  "ch_pol_my_phil": "马克思主义哲学",
  "ch_pol_my_pe": "马克思主义政治经济学",
  "ch_pol_my_soc": "科学社会主义",
  "ch_pol_mao": "毛泽东思想",
  "ch_pol_deng": "邓小平理论",
  "ch_pol_xi": "习近平新时代",
  "ch_pol_hist_old": "旧民主主义革命",
  "ch_pol_hist_new": "新民主主义革命",
  "ch_pol_hist_soc": "社会主义建设",
  "ch_pol_thought": "思想道德修养",
  "ch_pol_law": "法治素养",
};

export default function PoliticsPage() {
  const [subjects, setSubjects] = useState<PoliticsSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubject, setActiveSubject] = useState("marxism");

  useEffect(() => {
    fetchPoliticsKnowledge();
  }, []);

  async function fetchPoliticsKnowledge() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const allSubjects: PoliticsSubject[] = [];

      for (const [subjectId, config] of Object.entries(subjectConfig)) {
        const chapters: { name: string; keyPoints: KnowledgePoint[] }[] = [];

        for (const chapterId of config.chapters) {
          const response = await fetch(`${API_BASE}/api/knowledge/chapters/${chapterId}/points`, { headers });
          if (response.ok) {
            const data = await response.json();
            const points: KnowledgePoint[] = data.knowledge_points || data.points || [];
            chapters.push({
              name: chapterNames[chapterId] || chapterId,
              keyPoints: points,
            });
          }
        }

        allSubjects.push({
          id: subjectId,
          title: config.title,
          icon: config.icon,
          description: config.description,
          score: config.score,
          chapters,
        });
      }

      setSubjects(allSubjects);
    } catch (error) {
      console.error('获取政治知识点失败:', error);
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: '16px',
    boxShadow: "var(--shadow-xs)",
  };

  const currentSubject = subjects.find(s => s.id === activeSubject) || subjects[0];

  if (loading) {
    return (
      <div className="animate-fade-in max-w-5xl mx-auto flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载政治知识点中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>政治专项</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>马原 · 毛中特 · 史纲 · 思修 · 时政</p>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSubject(s.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
            style={activeSubject === s.id ? {
              background: 'var(--green-500)', color: 'var(--on-brand)',
            } : { background: 'color-mix(in srgb,var(--on-brand) 50%,transparent)', color: 'var(--text-muted)' }}
          >
            <span>{s.icon}</span>
            {s.title.substring(0, 6)}
          </button>
        ))}
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {subjects.map((s) => (
          <div key={s.id} className="p-4 rounded-2xl text-center" style={cardStyle}>
            <div className="text-2xl font-bold" style={{ color: 'var(--green-500)' }}>{s.score}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.title.substring(0, 4)}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      {currentSubject ? (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{currentSubject.icon}</span>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{currentSubject.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{currentSubject.description}</p>
              </div>
            </div>
          </div>

          {currentSubject.chapters.map((chapter, i) => (
            <div key={i} className="p-6 rounded-2xl" style={cardStyle}>
              <h4 className="font-semibold mb-3" style={{ color: 'var(--green-500)' }}>
                {chapter.name}
              </h4>
              <div className="space-y-3">
                {chapter.keyPoints.length === 0 ? (
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>暂无知识点</p>
                ) : chapter.keyPoints.map((point) => (
                  <div key={point.id} className="p-3 rounded-xl" style={{ background: 'color-mix(in srgb,var(--green-500) 5%,transparent)' }}>
                    <div className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{point.title}</div>
                    <div className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-muted)' }}>
                      {point.content.length > 200 ? point.content.substring(0, 200) + '...' : point.content}
                    </div>
                    {point.exam_tips && (
                      <div className="text-xs mt-2" style={{ color: 'var(--orange-500)' }}>💡 {point.exam_tips}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-2xl text-center" style={cardStyle}>
          <p style={{ color: 'var(--text-muted)' }}>暂无政治知识点数据</p>
        </div>
      )}

      {/* Exam Tips */}
      <div className="mt-6 p-6 rounded-2xl" style={{ ...cardStyle, background: 'color-mix(in srgb,var(--green-500) 8%,transparent)', border: '1px solid color-mix(in srgb,var(--green-500) 15%,transparent)' }}>
        <h4 className="font-semibold mb-3" style={{ color: 'var(--green-500)' }}>📝 备考建议</h4>
        <div className="space-y-2 text-sm" style={{ color: 'var(--text-primary)' }}>
          <p>• <strong>选择题</strong>：重点掌握马原辩证法、认识论，毛中特新思想，史纲重要事件时间线</p>
          <p>• <strong>分析题</strong>：背诵肖四肖八，掌握答题框架（原理+分析+总结）</p>
          <p>• <strong>时政</strong>：关注二十大报告、政府工作报告、重大时事</p>
          <p>• <strong>时间安排</strong>：9-10月基础，11月强化，12月冲刺背诵</p>
        </div>
      </div>
    </div>
  );
}
