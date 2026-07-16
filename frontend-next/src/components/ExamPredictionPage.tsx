"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/api";

interface Prediction {
  predicted_score: number;
  confidence: number;
  breakdown: {
    base_score: number;
    study_bonus: number;
    coverage_bonus: number;
    stability_bonus: number;
    mastery_bonus: number;
  };
  analysis: string[];
  data_summary: {
    study_hours: number;
    knowledge_coverage: number;
    avg_stability: number;
    wrong_count: number;
    wrong_mastery: number;
  };
}

interface TrendData {
  date: string;
  study_minutes: number;
  review_count: number;
}

export default function ExamPredictionPage() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [trend, setTrend] = useState<TrendData[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [subjectFilter]);

  async function fetchData() {
    setLoading(true);
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // 并行获取数据
      let predUrl = `${API_BASE}/api/predictions/score`;
      if (subjectFilter) predUrl += `?subject_id=${subjectFilter}`;

      const [predRes, trendRes] = await Promise.all([
        fetch(predUrl, { headers }),
        fetch(`${API_BASE}/api/predictions/trend?days=30`, { headers }),
      ]);

      if (predRes.ok) {
        const data = await predRes.json();
        setPrediction(data);
      }

      if (trendRes.ok) {
        const data = await trendRes.json();
        setTrend(data.trend || []);
      }
    } catch (error) {
      console.error('获取预测数据失败:', error);
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: '16px',
  };

  const subjectNames: Record<string, string> = {
    "": "全部",
    "subject_xinchuan": "新传",
    "subject_politics": "政治",
    "subject_english": "英语",
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "var(--green-500)";
    if (score >= 60) return "var(--orange-500)";
    return "var(--red-500)";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "优秀";
    if (score >= 80) return "良好";
    if (score >= 70) return "中等";
    if (score >= 60) return "及格";
    return "待提高";
  };

  if (loading) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">生成预测中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">考试预测</h2>
        <p className="text-sm text-gray-400 mt-1">基于学习数据的智能分数预测</p>
      </div>

      {/* 学科筛选 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["", "subject_xinchuan", "subject_politics", "subject_english"].map((s) => (
          <button
            key={s}
            onClick={() => setSubjectFilter(s)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={subjectFilter === s ? {
              background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))', color: 'var(--on-brand)',
            } : { background: 'var(--glass-05)', color: 'var(--text-muted)' }}
          >
            {subjectNames[s]}
          </button>
        ))}
      </div>

      {prediction && (
        <>
          {/* 预测分数卡片 */}
          <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">预测分数</h3>
                <p className="text-sm text-gray-400">基于你的学习数据智能预测</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold" style={{ color: getScoreColor(prediction.predicted_score) }}>
                  {prediction.predicted_score}
                </div>
                <div className="text-sm" style={{ color: getScoreColor(prediction.predicted_score) }}>
                  {getScoreLabel(prediction.predicted_score)}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">置信度</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${prediction.confidence * 100}%`,
                      background: 'linear-gradient(90deg, var(--brand-500), var(--violet-500))',
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{(prediction.confidence * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>

          {/* 分数构成 */}
          <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
            <h3 className="text-lg font-semibold text-white mb-4">分数构成</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{prediction.breakdown.base_score}</div>
                <div className="text-xs text-gray-400 mt-1">基础分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">+{prediction.breakdown.study_bonus}</div>
                <div className="text-xs text-gray-400 mt-1">学习加成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">+{prediction.breakdown.coverage_bonus}</div>
                <div className="text-xs text-gray-400 mt-1">覆盖加成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">+{prediction.breakdown.stability_bonus}</div>
                <div className="text-xs text-gray-400 mt-1">稳定性加成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">+{prediction.breakdown.mastery_bonus}</div>
                <div className="text-xs text-gray-400 mt-1">掌握度加成</div>
              </div>
            </div>
          </div>

          {/* 数据摘要 */}
          <div className="p-6 rounded-2xl mb-6" style={cardStyle}>
            <h3 className="text-lg font-semibold text-white mb-4">数据摘要</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ background: 'var(--glass-03)' }}>
                <div className="text-sm text-gray-400 mb-1">学习时长</div>
                <div className="text-2xl font-bold text-blue-400">{prediction.data_summary.study_hours} 小时</div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'var(--glass-03)' }}>
                <div className="text-sm text-gray-400 mb-1">知识覆盖</div>
                <div className="text-2xl font-bold text-green-400">{prediction.data_summary.knowledge_coverage}%</div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'var(--glass-03)' }}>
                <div className="text-sm text-gray-400 mb-1">记忆稳定性</div>
                <div className="text-2xl font-bold text-purple-400">{prediction.data_summary.avg_stability}</div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'var(--glass-03)' }}>
                <div className="text-sm text-gray-400 mb-1">错题掌握</div>
                <div className="text-2xl font-bold text-orange-400">{prediction.data_summary.wrong_mastery}%</div>
              </div>
            </div>
          </div>

          {/* 分析建议 */}
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <h3 className="text-lg font-semibold text-white mb-4">分析建议</h3>
            <div className="space-y-3">
              {prediction.analysis.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--glass-03)' }}>
                  <span className="text-blue-400 mt-0.5">•</span>
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 学习趋势 */}
      {trend.length > 0 && (
        <div className="p-6 rounded-2xl mt-6" style={cardStyle}>
          <h3 className="text-lg font-semibold text-white mb-4">学习趋势（近30天）</h3>
          <div className="h-48 flex items-end gap-1">
            {trend.map((day, index) => {
              const maxMinutes = Math.max(...trend.map(d => d.study_minutes), 1);
              const height = (day.study_minutes / maxMinutes) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full rounded-t-sm transition-all duration-300"
                    style={{
                      height: `${height}%`,
                      background: day.study_minutes > 0 ? 'linear-gradient(180deg, var(--brand-500), var(--brand-500))' : 'var(--glass-05)',
                      minHeight: '4px',
                    }}
                  />
                  {index % 5 === 0 && (
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                      {day.date.slice(5)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>30天前</span>
            <span>今天</span>
          </div>
        </div>
      )}
    </div>
  );
}
