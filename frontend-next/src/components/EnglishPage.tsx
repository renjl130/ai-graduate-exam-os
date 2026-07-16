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

interface EnglishSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: { title: string; detail: string }[];
}

// 章节ID到图标和描述的映射
const chapterConfig: Record<string, { icon: string; description: string }> = {
  "ch_eng_read": { icon: "📖", description: "英语二阅读理解满分攻略" },
  "ch_eng_grammar": { icon: "📝", description: "英语语法核心知识点" },
  "ch_eng_long": { icon: "🔗", description: "长难句拆解方法" },
  "ch_eng_trans": { icon: "🔤", description: "英译汉翻译技巧" },
  "ch_eng_write": { icon: "✍️", description: "大小作文写作模板" },
  "ch_eng_new": { icon: "🆕", description: "信息匹配/标题匹配" },
  "ch_eng_vocab": { icon: "📚", description: "高频核心词汇" },
};

// 章节ID到标题的映射
const chapterTitles: Record<string, string> = {
  "ch_eng_read": "阅读理解",
  "ch_eng_grammar": "语法",
  "ch_eng_long": "长难句",
  "ch_eng_trans": "翻译",
  "ch_eng_write": "写作",
  "ch_eng_new": "新题型",
  "ch_eng_vocab": "词汇",
};

export default function EnglishPage() {
  const [sections, setSections] = useState<EnglishSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [showVocab, setShowVocab] = useState(false);
  const [vocabPoints, setVocabPoints] = useState<KnowledgePoint[]>([]);

  useEffect(() => {
    fetchEnglishKnowledge();
  }, []);

  async function fetchEnglishKnowledge() {
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // 获取所有英语章节的知识点
      const chapters = [
        "ch_eng_read", "ch_eng_grammar", "ch_eng_long",
        "ch_eng_trans", "ch_eng_write", "ch_eng_new", "ch_eng_vocab"
      ];

      const allSections: EnglishSection[] = [];
      const allVocab: KnowledgePoint[] = [];

      for (const chapterId of chapters) {
        const response = await fetch(`${API_BASE}/api/knowledge/chapters/${chapterId}/points`, { headers });
        if (response.ok) {
          const data = await response.json();
          const points: KnowledgePoint[] = data.knowledge_points || data.points || [];

          if (chapterId === "ch_eng_vocab") {
            setVocabPoints(points);
          } else {
            const config = chapterConfig[chapterId] || { icon: "📄", description: "" };
            const section: EnglishSection = {
              id: chapterId,
              title: chapterTitles[chapterId] || chapterId,
              icon: config.icon,
              description: config.description,
              content: points.map(p => ({
                title: p.title,
                detail: p.content,
              })),
            };
            allSections.push(section);
          }
        }
      }

      setSections(allSections);
      if (allSections.length > 0) {
        setActiveSection(allSections[0].id);
      }
    } catch (error) {
      console.error('获取英语知识点失败:', error);
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

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  if (loading) {
    return (
      <div className="animate-fade-in max-w-5xl mx-auto flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载英语知识点中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>英语二专项</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>阅读 · 完形 · 翻译 · 写作 · 新题型</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => { setActiveSection(s.id); setShowVocab(false); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
            style={activeSection === s.id && !showVocab ? {
              background: 'var(--green-500)', color: 'var(--on-brand)',
            } : { background: 'color-mix(in srgb,var(--on-brand) 50%,transparent)', color: 'var(--text-muted)' }}
          >
            <span>{s.icon}</span>
            {s.title}
          </button>
        ))}
        <button
          onClick={() => setShowVocab(!showVocab)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
          style={showVocab ? {
            background: 'var(--orange-500)', color: 'var(--on-brand)',
          } : { background: 'color-mix(in srgb,var(--on-brand) 50%,transparent)', color: 'var(--text-muted)' }}
        >
          <span>📚</span>
          核心词汇
        </button>
      </div>

      {showVocab ? (
        /* Vocabulary Section */
        <div className="space-y-3">
          <div className="p-5 rounded-2xl" style={cardStyle}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>考研英语二核心词汇</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>高频词汇，每日积累</p>
          </div>
          {vocabPoints.length === 0 ? (
            <div className="p-5 rounded-2xl text-center" style={cardStyle}>
              <p style={{ color: 'var(--text-muted)' }}>暂无词汇数据</p>
            </div>
          ) : vocabPoints.map((v) => (
            <div key={v.id} className="p-5 rounded-2xl" style={cardStyle}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold" style={{ color: 'var(--green-500)' }}>{v.title}</span>
              </div>
              <p className="text-sm mb-2 whitespace-pre-line" style={{ color: 'var(--text-primary)' }}>{v.content}</p>
              {v.exam_tips && (
                <p className="text-xs italic mt-2" style={{ color: 'var(--text-muted)' }}>💡 {v.exam_tips}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Section Content */
        <div className="space-y-4">
          {currentSection ? (
            <>
              <div className="p-6 rounded-2xl" style={cardStyle}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{currentSection.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{currentSection.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{currentSection.description}</p>
                  </div>
                </div>
              </div>

              {currentSection.content.length === 0 ? (
                <div className="p-6 rounded-2xl text-center" style={cardStyle}>
                  <p style={{ color: 'var(--text-muted)' }}>暂无该章节知识点</p>
                </div>
              ) : currentSection.content.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl" style={cardStyle}>
                  <h4 className="font-semibold mb-3" style={{ color: 'var(--green-500)' }}>{item.title}</h4>
                  <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-primary)' }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="p-6 rounded-2xl text-center" style={cardStyle}>
              <p style={{ color: 'var(--text-muted)' }}>暂无英语知识点数据</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
