"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getToken } from "@/lib/api";
import * as d3 from "d3";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  subject_id: string;
  subject_name: string;
  subject_color: string;
  chapter_id: string;
  chapter_name: string;
  importance: string;
  frequency: string;
  level: number;
  summary: string;
  parent_id?: string;
  // D3 computed
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface GraphEdge extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  type: string;
  description?: string;
  weight?: number;
}

interface SubjectInfo {
  name: string;
  color: string;
}

export default function KnowledgeGraphPage() {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [subjects, setSubjects] = useState<Record<string, SubjectInfo>>({});
  const [chapters, setChapters] = useState<{ id: string; name: string; subject_id: string }[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [chapterFilter, setChapterFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [graphStats, setGraphStats] = useState({ nodes: 0, edges: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphEdge> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 加载数据
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (subjectFilter) params.set("subject_id", subjectFilter);
    if (chapterFilter) params.set("chapter_id", chapterFilter);
    const url = `${API_BASE}/api/knowledge/graph?${params.toString()}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
        setSubjects(data.subjects || {});
        setChapters(data.chapters || []);
        setGraphStats({ nodes: (data.nodes || []).length, edges: (data.edges || []).length });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [subjectFilter, chapterFilter]);

  // D3 力导向图渲染
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 600;

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // 定义箭头标记
    const defs = svg.append("defs");

    // 发光滤镜
    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // 边类型颜色
    const edgeColors: Record<string, string> = {
      related: "var(--brand-500)",
      contrast: "var(--red-500)",
      evolution: "var(--green-500)",
      prerequisite: "var(--orange-500)",
      includes: "var(--violet-500)",
      parent_child: "var(--text-muted)",
    };

    // 重要性 -> 节点大小
    const importanceSize: Record<string, number> = {
      high: 18,
      medium: 12,
      low: 8,
    };

    // 搜索过滤高亮
    const matchesSearch = (node: GraphNode) => {
      if (!searchQuery) return true;
      return node.label.includes(searchQuery) || node.chapter_name.includes(searchQuery);
    };

    // 创建缩放行为
    const g = svg.append("g");

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // 创建力模拟
    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force("link", d3.forceLink<GraphNode, GraphEdge>(edges)
        .id((d) => d.id)
        .distance((d) => {
          const w = (d as any).weight || 1;
          return 80 / w;
        })
        .strength(0.3)
      )
      .force("charge", d3.forceManyBody()
        .strength(-200)
        .distanceMax(400)
      )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide()
        .radius((d) => (importanceSize[(d as GraphNode).importance] || 12) + 8)
      )
      // 按章节聚类：同一章节的节点相互吸引
      .force("x", d3.forceX<GraphNode>()
        .x((d) => {
          // 根据章节分配大致 x 位置
          const chapterIndex = chapters.findIndex((c) => c.id === d.chapter_id);
          const totalChapters = Math.max(chapters.length, 1);
          const spread = width * 0.7;
          return width / 2 - spread / 2 + (chapterIndex / totalChapters) * spread;
        })
        .strength(0.08)
      )
      .force("y", d3.forceY<GraphNode>()
        .y((d) => {
          // 根据学科分配大致 y 位置
          const subjectKeys = Object.keys(subjects);
          const subIndex = subjectKeys.indexOf(d.subject_id);
          const totalSubs = Math.max(subjectKeys.length, 1);
          const spread = height * 0.5;
          return height / 2 - spread / 2 + (subIndex / totalSubs) * spread;
        })
        .strength(0.08)
      );

    simulationRef.current = simulation;

    // 绘制边
    const link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", (d) => edgeColors[(d as any).type] || "var(--text-muted)")
      .attr("stroke-opacity", (d) => ((d as any).type === "parent_child" ? 0.2 : 0.4))
      .attr("stroke-width", (d) => ((d as any).type === "parent_child" ? 1 : 1.5))
      .attr("stroke-dasharray", (d) => ((d as any).type === "parent_child" ? "4,4" : "none"));

    // 绘制节点组
    const nodeGroup = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("cursor", "pointer")
      .call(d3.drag<SVGGElement, GraphNode>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // 节点光晕
    nodeGroup.append("circle")
      .attr("r", (d) => (importanceSize[d.importance] || 12) * 2)
      .attr("fill", (d) => d.subject_color)
      .attr("opacity", 0.1);

    // 节点主体
    const nodeCircles = nodeGroup.append("circle")
      .attr("r", (d) => importanceSize[d.importance] || 12)
      .attr("fill", (d) => d.subject_color)
      .attr("stroke", "var(--on-brand)")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.3)
      .attr("filter", "url(#glow)");

    // 节点标签
    const nodeLabels = nodeGroup.append("text")
      .text((d) => {
        const maxLen = d.importance === "high" ? 10 : d.importance === "medium" ? 8 : 6;
        return d.label.length > maxLen ? d.label.substring(0, maxLen) + "…" : d.label;
      })
      .attr("dy", (d) => (importanceSize[d.importance] || 12) + 14)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--text-secondary)")
      .attr("font-size", (d) => d.importance === "high" ? "12px" : "10px")
      .attr("font-weight", (d) => d.importance === "high" ? "600" : "400");

    // 事件处理
    nodeGroup
      .on("mouseover", function (event, d) {
        setHoveredNode(d);
        // 高亮当前节点
        d3.select(this).select("circle:nth-child(2)")
          .transition().duration(200)
          .attr("r", (importanceSize[d.importance] || 12) * 1.3)
          .attr("stroke-width", 3)
          .attr("stroke-opacity", 0.8);

        // 高亮相关边
        link
          .transition().duration(200)
          .attr("stroke-opacity", (l: any) => {
            return (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.05;
          })
          .attr("stroke-width", (l: any) => {
            return (l.source.id === d.id || l.target.id === d.id) ? 2.5 : 1;
          });

        // 降低无关节点透明度
        nodeGroup
          .transition().duration(200)
          .attr("opacity", (n: any) => {
            if (n.id === d.id) return 1;
            const isConnected = edges.some((e: any) =>
              (e.source.id === d.id && e.target.id === n.id) ||
              (e.target.id === d.id && e.source.id === n.id)
            );
            return isConnected ? 0.8 : 0.15;
          });
      })
      .on("mouseout", function () {
        setHoveredNode(null);
        d3.select(this).select("circle:nth-child(2)")
          .transition().duration(200)
          .attr("r", (d: any) => importanceSize[d.importance] || 12)
          .attr("stroke-width", 1.5)
          .attr("stroke-opacity", 0.3);

        link.transition().duration(200)
          .attr("stroke-opacity", (d: any) => (d.type === "parent_child" ? 0.2 : 0.4))
          .attr("stroke-width", (d: any) => (d.type === "parent_child" ? 1 : 1.5));

        nodeGroup.transition().duration(200).attr("opacity", 1);
      })
      .on("click", function (event, d) {
        setSelectedNode(d);
      });

    // 搜索时更新透明度
    if (searchQuery) {
      nodeGroup.attr("opacity", (d) => (matchesSearch(d) ? 1 : 0.1));
      link.attr("stroke-opacity", 0.05);
    }

    // 力模拟更新
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // 初始缩放适配
    setTimeout(() => {
      const bounds = g.node()?.getBBox();
      if (bounds) {
        const padding = 40;
        const fullWidth = bounds.width + padding * 2;
        const fullHeight = bounds.height + padding * 2;
        const scale = Math.min(width / fullWidth, height / fullHeight, 1.5);
        const tx = width / 2 - (bounds.x + bounds.width / 2) * scale;
        const ty = height / 2 - (bounds.y + bounds.height / 2) * scale;
        svg.transition().duration(500)
          .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
      }
    }, 2000);

    return () => {
      simulation.stop();
    };
  }, [nodes, edges, searchQuery, chapters, subjects]);

  const cardStyle = {
    background: "var(--surface)",
    backdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "16px",
  };

  const edgeTypeLabels: Record<string, string> = {
    related: "关联",
    contrast: "对比",
    evolution: "演进",
    prerequisite: "前置",
    includes: "包含",
    parent_child: "层级",
  };

  // 获取当前学科下的章节列表
  const filteredChapters = subjectFilter
    ? chapters.filter((c) => c.subject_id === subjectFilter)
    : chapters;

  return (
    <div className="animate-fade-in max-w-full mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white">🕸️ 知识图谱</h2>
          <p className="text-sm text-gray-400 mt-1">
            拖拽节点 · 滚轮缩放 · 点击查看详情 · 共 {graphStats.nodes} 个节点 {graphStats.edges} 条关系
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜索节点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
              style={{
                background: "var(--glass-06)",
                border: "1px solid var(--glass-08)",
                width: 180,
              }}
            />
            <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 学科筛选 */}
      <div className="flex items-center gap-2 mb-3 flex-wrap flex-shrink-0">
        <span className="text-xs text-gray-500 mr-1">学科：</span>
        <button
          onClick={() => { setSubjectFilter(""); setChapterFilter(""); }}
          className="px-3 py-1.5 rounded-lg text-xs transition-all"
          style={{
            background: !subjectFilter ? "color-mix(in srgb,var(--violet-500) 20%,transparent)" : "var(--glass-04)",
            color: !subjectFilter ? "var(--violet-500)" : "var(--text-muted)",
            border: "1px solid var(--glass-06)",
          }}
        >
          全部
        </button>
        {Object.entries(subjects).map(([id, info]) => (
          <button
            key={id}
            onClick={() => { setSubjectFilter(id); setChapterFilter(""); }}
            className="px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{
              background: subjectFilter === id ? `${info.color}30` : "var(--glass-04)",
              color: subjectFilter === id ? info.color : "var(--text-muted)",
              border: `1px solid ${subjectFilter === id ? `${info.color}40` : "var(--glass-06)"}`,
            }}
          >
            {info.name}
          </button>
        ))}
      </div>

      {/* 章节筛选 */}
      {subjectFilter && filteredChapters.length > 0 && (
        <div className="flex items-center gap-2 mb-3 flex-wrap flex-shrink-0">
          <span className="text-xs text-gray-500 mr-1">章节：</span>
          <button
            onClick={() => setChapterFilter("")}
            className="px-2.5 py-1 rounded-lg text-xs transition-all"
            style={{
              background: !chapterFilter ? "var(--glass-10)" : "var(--glass-03)",
              color: !chapterFilter ? "var(--on-brand)" : "var(--text-muted)",
              border: "1px solid var(--glass-06)",
            }}
          >
            全部章节
          </button>
          {filteredChapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setChapterFilter(ch.id)}
              className="px-2.5 py-1 rounded-lg text-xs transition-all"
              style={{
                background: chapterFilter === ch.id ? "var(--glass-10)" : "var(--glass-03)",
                color: chapterFilter === ch.id ? "var(--on-brand)" : "var(--text-muted)",
                border: "1px solid var(--glass-06)",
              }}
            >
              {ch.name}
            </button>
          ))}
        </div>
      )}

      {/* 主图谱区域 */}
      <div className="flex-1 grid grid-cols-4 gap-4 min-h-0">
        <div className="col-span-3 p-2 rounded-2xl flex flex-col" style={cardStyle}>
          {loading ? (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <div className="text-4xl animate-spin mb-3">⏳</div>
                <p className="text-gray-400 text-sm">加载知识图谱...</p>
              </div>
            </div>
          ) : nodes.length === 0 ? (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <div className="text-5xl mb-3">📭</div>
                <p className="text-gray-400">暂无知识点数据</p>
                <p className="text-gray-500 text-sm mt-1">请先在知识库中添加知识点，或导入文档</p>
              </div>
            </div>
          ) : (
            <div ref={containerRef} className="flex-1 relative" style={{ minHeight: 500 }}>
              <svg
                ref={svgRef}
                className="w-full h-full"
                style={{ background: "transparent" }}
              />
              {/* 悬停提示 */}
              {hoveredNode && (
                <div
                  className="absolute pointer-events-none z-10 px-3 py-2 rounded-xl text-sm max-w-xs"
                  style={{
                    left: "50%",
                    bottom: 16,
                    transform: "translateX(-50%)",
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--glass-10)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="text-white font-semibold">{hoveredNode.label}</div>
                  <div className="text-gray-400 text-xs mt-1">
                    {hoveredNode.chapter_name && `📂 ${hoveredNode.chapter_name}`}
                  </div>
                  {hoveredNode.summary && (
                    <div className="text-gray-500 text-xs mt-1">{hoveredNode.summary}</div>
                  )}
                </div>
              )}
            </div>
          )}
          {/* 图例 */}
          <div className="flex items-center justify-center gap-6 py-3 flex-wrap flex-shrink-0">
            {Object.entries(subjects).map(([id, info]) => (
              <div key={id} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: info.color }} />
                <span className="text-xs text-gray-400">{info.name}</span>
              </div>
            ))}
            <span className="text-xs text-gray-600">|</span>
            {Object.entries(edgeTypeLabels).map(([type, label]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className="w-6 h-0.5 rounded" style={{ background: {
                  related: "var(--brand-500)", contrast: "var(--red-500)", evolution: "var(--green-500)",
                  prerequisite: "var(--orange-500)", includes: "var(--violet-500)", parent_child: "var(--text-muted)",
                }[type] || "var(--text-muted)" }} />
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
            <span className="text-xs text-gray-600">|</span>
            <span className="text-xs text-gray-500">节点大小 = 重要程度</span>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* 节点详情 */}
          <div className="p-4 rounded-2xl flex-1" style={cardStyle}>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">📋 节点详情</h3>
            {selectedNode ? (
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{selectedNode.label}</h4>
                <p className="text-xs text-gray-500 mb-3">{selectedNode.subject_name} · {selectedNode.chapter_name}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">重要性</span>
                    <span style={{
                      color: selectedNode.importance === "high" ? "var(--red-500)" : selectedNode.importance === "medium" ? "var(--orange-500)" : "var(--green-500)"
                    }}>
                      {selectedNode.importance === "high" ? "⭐ 高" : selectedNode.importance === "medium" ? "中" : "低"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">频率</span>
                    <span className="text-white">{selectedNode.frequency === "high" ? "高频" : selectedNode.frequency === "medium" ? "中频" : "低频"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">层级</span>
                    <span className="text-white">第{selectedNode.level}级</span>
                  </div>
                </div>
                {selectedNode.summary && (
                  <div className="mt-3 p-3 rounded-lg text-xs text-gray-300" style={{ background: "var(--glass-03)" }}>
                    {selectedNode.summary}
                  </div>
                )}
                <button
                  className="w-full mt-4 px-4 py-2 rounded-xl text-sm text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, var(--brand-500), var(--violet-500))" }}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("navigate", { detail: "knowledge" }));
                  }}
                >
                  查看完整详情 →
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">🖱️</div>
                <p className="text-gray-500 text-xs">点击图谱中的节点查看详情</p>
              </div>
            )}
          </div>

          {/* 统计 */}
          <div className="p-4 rounded-2xl" style={cardStyle}>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">📊 统计</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">知识点总数</span>
                <span className="text-white font-mono">{graphStats.nodes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">关系总数</span>
                <span className="text-white font-mono">{graphStats.edges}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">学科数</span>
                <span className="text-white font-mono">{Object.keys(subjects).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">章节数</span>
                <span className="text-white font-mono">{chapters.length}</span>
              </div>
            </div>
          </div>

          {/* 操作提示 */}
          <div className="p-4 rounded-2xl" style={cardStyle}>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">💡 操作提示</h3>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p>🖱️ <span className="text-gray-400">拖拽</span> — 移动节点</p>
              <p>🔍 <span className="text-gray-400">滚轮</span> — 缩放视图</p>
              <p>👆 <span className="text-gray-400">点击</span> — 查看详情</p>
              <p>✋ <span className="text-gray-400">拖拽空白</span> — 平移视图</p>
              <p>⌨️ <span className="text-gray-400">搜索框</span> — 过滤节点</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
