"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { chatStream, organizeContent, getToken } from "@/lib/api";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

type Mode = "chat" | "organize";

const suggestedQuestions = [
  "传播学中议程设置理论和框架理论有什么区别？",
  "新闻价值的五个要素是什么？",
  "简述沉默的螺旋理论的核心观点",
  "中国新闻史上《解放日报》改版的意义是什么？",
  "帮我分析2024年深大440真题的出题规律",
];

export default function AiTutorPage() {
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [organizeTopic, setOrganizeTopic] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, statusText]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isStreaming) return;
    const userMsg: ChatMessage = { id: `user_${Date.now()}`, role: "user", content: msg, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);
    setStatusText("正在思考...");
    const aiMsgId = `ai_${Date.now()}`;
    setMessages((prev) => [...prev, { id: aiMsgId, role: "assistant", content: "", timestamp: new Date().toISOString() }]);
    let accumulatedContent = "";
    await chatStream(
      { message: msg, conversation_id: conversationId || undefined },
      {
        onStatus: (status) => setStatusText(status),
        onContent: (content) => {
          accumulatedContent += content;
          setMessages((prev) => prev.map((m) => (m.id === aiMsgId ? { ...m, content: accumulatedContent } : m)));
        },
        onDone: (data) => {
          if (data.conversation_id) setConversationId(data.conversation_id);
          setStatusText("");
        },
        onError: (error) => {
          setMessages((prev) => prev.map((m) => (m.id === aiMsgId ? { ...m, content: `⚠️ ${error}` } : m)));
          setStatusText("");
        },
      }
    );
    setIsStreaming(false);
  };

  const handleOrganize = async () => {
    const content = input.trim();
    if (!content || isStreaming) return;
    const userMsg: ChatMessage = { id: `user_${Date.now()}`, role: "user", content: `📋 整理资料${organizeTopic ? `（${organizeTopic}）` : ""}\n\n${content.slice(0, 200)}${content.length > 200 ? "..." : ""}`, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);
    setStatusText("正在整理...");
    try {
      const res = await organizeContent(content, organizeTopic || undefined);
      setMessages((prev) => [...prev, { id: `ai_${Date.now()}`, role: "assistant", content: res.result, timestamp: new Date().toISOString() }]);
    } catch {
      setMessages((prev) => [...prev, { id: `ai_${Date.now()}`, role: "assistant", content: "⚠️ 整理失败，请重试", timestamp: new Date().toISOString() }]);
    }
    setIsStreaming(false);
    setStatusText("");
  };

  const clearChat = () => { setMessages([]); setConversationId(null); setStatusText(""); };

  const mdComponents = {
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-lg font-bold mb-2 mt-3 text-white">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-base font-bold mb-2 mt-3 pb-1 text-white" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-sm font-semibold mb-1 mt-2 text-white">{children}</h3>,
    p: ({ children }: { children?: React.ReactNode }) => <p className="text-sm leading-relaxed mb-2 text-gray-300">{children}</p>,
    ul: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc pl-4 mb-2 space-y-1 text-sm text-gray-300">{children}</ul>,
    ol: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal pl-4 mb-2 space-y-1 text-sm text-gray-300">{children}</ol>,
    li: ({ children }: { children?: React.ReactNode }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="text-blue-400">{children}</em>,
    code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
      const isInline = !className;
      return isInline ? (
        <code className="px-1.5 py-0.5 rounded-md text-xs font-mono" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>{children}</code>
      ) : (
        <code className="block p-3 rounded-xl text-xs font-mono overflow-x-auto" style={{ background: 'rgba(0,0,0,0.3)', color: '#e5e7eb' }}>{children}</code>
      );
    },
    table: ({ children }: { children?: React.ReactNode }) => <div className="overflow-x-auto mb-3"><table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>{children}</table></div>,
    th: ({ children }: { children?: React.ReactNode }) => <th className="py-2 px-3 text-left font-semibold text-white" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{children}</th>,
    td: ({ children }: { children?: React.ReactNode }) => <td className="py-2 px-3 text-gray-300" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{children}</td>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="pl-4 mb-2 py-2 rounded-r-xl" style={{ borderLeft: "3px solid #3b82f6", background: 'rgba(59, 130, 246, 0.1)' }}>{children}</blockquote>,
    hr: () => <hr className="my-3" style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />,
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">AI 导师</h2>
            <span className="text-xs text-gray-400">{isStreaming ? "处理中..." : "DeepSeek V3"}</span>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white transition-all"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          新对话
        </button>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 px-6 pt-4">
        {([{ key: "chat" as Mode, label: "智能问答", icon: "💬" }, { key: "organize" as Mode, label: "资料整理", icon: "📋" }]).map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
            style={mode === m.key ? {
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
            } : {
              background: 'rgba(255,255,255,0.05)',
              color: '#9ca3af',
            }}
          >
            <span>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))' }}>
              {mode === "chat" ? "💬" : "📋"}
            </div>
            <h3 className="text-lg font-semibold text-white">
              {mode === "chat" ? "AI 考研导师" : "AI 资料整理"}
            </h3>
            <p className="text-sm text-center max-w-sm text-gray-400">
              {mode === "chat" ? "基于 DeepSeek 大模型，支持知识点讲解、真题分析、答题指导" : "粘贴笔记内容，AI 生成结构化复习笔记"}
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[80%] px-4 py-3 text-sm"
              style={{
                background: msg.role === "user"
                  ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: msg.role === "user" ? "#fff" : "#e5e7eb",
                borderRadius: msg.role === "user"
                  ? '20px 20px 4px 20px'
                  : '20px 20px 20px 4px',
                border: msg.role === "assistant" ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {msg.role === "user" ? (
                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
              ) : (
                <div>
                  {msg.content ? (
                    <ReactMarkdown components={mdComponents}>{msg.content}</ReactMarkdown>
                  ) : (
                    isStreaming && <span className="animate-pulse text-blue-400">▋</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {statusText && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-full text-xs"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}>
              {statusText}
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {mode === "chat" && messages.length === 0 && (
        <div className="px-6 pb-3">
          <div className="text-xs text-gray-500 mb-2">推荐问题</div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-2 rounded-xl text-gray-300 hover:text-white transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {mode === "organize" && (
          <input
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            placeholder="整理主题（可选）"
            value={organizeTopic}
            onChange={(e) => setOrganizeTopic(e.target.value)}
          />
        )}
        <div className="flex gap-3">
          <textarea
            className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            rows={2}
            placeholder={mode === "chat" ? "问我任何考研问题..." : "粘贴需要整理的内容..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                mode === "chat" ? sendMessage() : handleOrganize();
              }
            }}
            disabled={isStreaming}
          />
          <button
            className="self-end px-5 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 disabled:opacity-50"
            style={isStreaming ? {
              background: 'rgba(255,255,255,0.05)',
              color: '#9ca3af',
            } : {
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
            }}
            onClick={() => mode === "chat" ? sendMessage() : handleOrganize()}
            disabled={isStreaming}
          >
            {isStreaming ? "..." : "发送 →"}
          </button>
        </div>
      </div>
    </div>
  );
}
