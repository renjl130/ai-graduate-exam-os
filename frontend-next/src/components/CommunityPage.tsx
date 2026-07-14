"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getToken } from "@/lib/api";

interface Post {
  id: string;
  user_id: string;
  author_name: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  created_at: string;
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterTag, setFilterTag] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: "" });

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
  };

  const getHeaders = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const fetchPosts = async (tag?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: "20" });
      if (tag && tag !== "all") params.set("tag", tag);

      const res = await fetch(`${API_BASE}/api/posts?${params}`, { headers: getHeaders() });
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(filterTag); }, [filterTag]);

  const handleCreate = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          tags: newPost.tags.split(",").map(t => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        setShowCreate(false);
        setNewPost({ title: "", content: "", tags: "" });
        fetchPosts(filterTag);
      }
    } catch { /* ignore */ }
  };

  const handleLike = async (postId: string) => {
    try {
      await fetch(`${API_BASE}/api/posts/${postId}/like`, {
        method: "POST",
        headers: getHeaders(),
      });
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    } catch { /* ignore */ }
  };

  const allTags = [...new Set(posts.flatMap((p) => p.tags))];

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">学习社区</h2>
          <p className="text-sm text-gray-400 mt-1">经验分享 · 资料交换 · 院校讨论</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
          }}
        >
          + 发帖
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterTag("all")}
          className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
          style={filterTag === "all" ? {
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff',
          } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}
        >
          全部
        </button>
        {allTags.slice(0, 10).map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={filterTag === tag ? {
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff',
            } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16" style={cardStyle}>
          <div className="animate-pulse text-gray-400">加载中...</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16" style={cardStyle}>
          <div className="text-5xl mb-4">💬</div>
          <p className="text-gray-400">暂无帖子，快来发第一帖吧！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-2xl transition-all duration-200 hover:scale-[1.01]" style={cardStyle}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))' }}>
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <span className="font-semibold text-sm text-white">{post.author_name}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(post.created_at).toLocaleDateString("zh-CN")}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-base mb-3 text-white">{post.title}</h3>
              <p className="text-sm mb-4 leading-relaxed text-gray-300">{post.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#6b7280' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 text-xs transition-all text-gray-400 hover:text-red-400"
                  >
                    🤍 {post.likes}
                  </button>
                  <span className="text-xs text-gray-400">💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 创建帖子弹窗 */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-lg p-6 rounded-2xl"
            style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="text-lg font-bold mb-4 text-white">发帖</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="标题"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={inputStyle}
              />
              <textarea
                placeholder="内容"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={inputStyle}
                rows={6}
              />
              <input
                type="text"
                placeholder="标签（逗号分隔）"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                style={inputStyle}
              />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-300 transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  取消
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
                  }}
                >
                  发布
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
