"use client";

import { useState } from "react";
import { schools, getSchoolById, type SchoolInfo } from "@/lib/school-data";

export default function SchoolInfoPage() {
  const [selectedSchoolId, setSelectedSchoolId] = useState("szu");
  const [activeTab, setActiveTab] = useState<"overview" | "scores" | "books" | "analysis">("overview");

  const schoolData = getSchoolById(selectedSchoolId) || schools[0];

  const cardStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border-subtle)",
    borderRadius: '16px',
  };

  const inputStyle = {
    background: 'var(--glass-06)',
    border: '1px solid var(--glass-10)',
    borderRadius: '12px',
  };

  const tabs = [
    { id: "overview" as const, label: "院校概况", icon: "🏫" },
    { id: "scores" as const, label: "分数线", icon: "📊" },
    { id: "books" as const, label: "参考书", icon: "📚" },
    { id: "analysis" as const, label: "考情分析", icon: "📈" },
  ];

  const importanceStars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  const latestScore = schoolData.scoreLines[0];
  const reportRatio = latestScore ? Math.round(latestScore.applicants / latestScore.enrolled) : 0;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">院校情报</h2>
          <p className="text-sm text-gray-400 mt-1">{schoolData.name} · {schoolData.major}</p>
        </div>
        <select
          value={selectedSchoolId}
          onChange={(e) => setSelectedSchoolId(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none"
          style={{ ...inputStyle, appearance: 'none' }}
        >
          {schools.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { value: `~${reportRatio}:1`, label: "报录比", color: "var(--red-500)" },
          { value: `${latestScore?.enrolled || 0}+`, label: "年录取", color: "var(--green-500)" },
          { value: `${(latestScore?.total || 0) + 15}+`, label: "建议目标", color: "var(--orange-500)" },
          { value: "500分", label: "满分", color: "var(--brand-500)" },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-2xl text-center" style={cardStyle}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
            style={activeTab === tab.id ? {
              background: 'linear-gradient(135deg, var(--brand-500), var(--brand-500))', color: 'var(--on-brand)',
            } : { background: 'var(--glass-05)', color: 'var(--text-muted)' }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <h3 className="font-semibold mb-4 text-white">基本信息</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "院校名称", value: schoolData.name },
                { label: "专业名称", value: schoolData.major },
                { label: "专业代码", value: schoolData.code },
                { label: "所属院系", value: schoolData.department },
                { label: "院校层次", value: schoolData.level },
                { label: "所在地区", value: schoolData.location },
                { label: "学制", value: schoolData.duration },
                { label: "学费", value: schoolData.tuition },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--glass-05)' }}>
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <h3 className="font-semibold mb-4 text-white">考试科目</h3>
            <div className="space-y-3">
              {schoolData.examSubjects.map((sub) => (
                <div key={sub.code} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--glass-03)' }}>
                  <span className="text-xs px-2 py-1 rounded-lg font-mono"
                    style={{ background: 'color-mix(in srgb,var(--brand-500) 15%,transparent)', color: 'var(--brand-400)' }}>
                    {sub.code}
                  </span>
                  <span className="flex-1 text-sm text-gray-200">{sub.name}</span>
                  <span className="text-sm font-semibold text-white">{sub.score}分</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <h3 className="font-semibold mb-4 text-white">学科特色</h3>
            <div className="space-y-2">
              {schoolData.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "scores" && (
        <div className="p-6 rounded-2xl" style={cardStyle}>
          <h3 className="font-semibold mb-4 text-white">历年分数线</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--glass-10)' }}>
                  <th className="py-3 px-4 text-left font-semibold text-gray-300">年份</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-300">总分线</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-300">政治</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-300">英语</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-300">专业课</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-300">录取</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-300">报考</th>
                </tr>
              </thead>
              <tbody>
                {schoolData.scoreLines.map((line) => (
                  <tr key={line.year} style={{ borderBottom: '1px solid var(--glass-05)' }}>
                    <td className="py-3 px-4 font-semibold text-white">{line.year}</td>
                    <td className="py-3 px-4 text-center font-bold text-blue-400">{line.total}</td>
                    <td className="py-3 px-4 text-center text-gray-300">{line.politics}</td>
                    <td className="py-3 px-4 text-center text-gray-300">{line.english}</td>
                    <td className="py-3 px-4 text-center text-gray-300">{line.major}</td>
                    <td className="py-3 px-4 text-center text-green-400">{line.enrolled}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{line.applicants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "books" && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <h3 className="font-semibold mb-4 text-white">334 参考书目</h3>
            <div className="space-y-3">
              {schoolData.referenceBooks334.map((book) => (
                <div key={book.name} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--glass-03)' }}>
                  <span className="text-yellow-400 text-xs">{importanceStars(book.importance)}</span>
                  <div className="flex-1">
                    <span className="text-sm text-white">{book.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{book.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <h3 className="font-semibold mb-4 text-white">440 参考书目</h3>
            <div className="space-y-3">
              {schoolData.referenceBooks440.map((book) => (
                <div key={book.name} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--glass-03)' }}>
                  <span className="text-yellow-400 text-xs">{importanceStars(book.importance)}</span>
                  <div className="flex-1">
                    <span className="text-sm text-white">{book.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{book.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "analysis" && (
        <div className="p-6 rounded-2xl" style={cardStyle}>
          <h3 className="font-semibold mb-4 text-white">考情分析</h3>
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p><strong className="text-white">{schoolData.name}</strong>{schoolData.major}是{schoolData.level}，竞争较为激烈。</p>
            <p><strong className="text-white">报录比分析：</strong>近年来报录比约{reportRatio}:1，录取人数稳定在{latestScore?.enrolled || 0}人左右，报考人数逐年增加。</p>
            <p><strong className="text-white">分数线趋势：</strong>总分线在{schoolData.scoreLines[schoolData.scoreLines.length - 1]?.total || 0}-{schoolData.scoreLines[0]?.total || 0}之间波动，建议目标分数{(latestScore?.total || 0) + 15}+较为稳妥。</p>
            <p><strong className="text-white">备考建议：</strong>重点掌握传播学理论和新闻实务，334注重实务能力，440注重理论功底。</p>
          </div>
        </div>
      )}
    </div>
  );
}
