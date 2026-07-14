/**
 * iOS 26 风格样式工具库
 * 统一的毛玻璃、圆角、渐变样式
 */

// 卡片样式
export const cardStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
};

// 输入框样式
export const inputStyle = {
  background: 'rgba(255, 255, 255, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
};

// 按钮样式
export const primaryButtonStyle = {
  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
  borderRadius: '12px',
};

// 渐变文字
export const gradientTextStyle = {
  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

// 页面标题样式
export const pageTitleClass = "text-2xl font-bold text-white mb-6";

// 卡片类名
export const cardClass = "p-5 rounded-2xl transition-all duration-200";

// 获取卡片样式（带hover效果）
export function getCardStyle(hover = false) {
  return {
    ...cardStyle,
    ...(hover ? { cursor: 'pointer' } : {}),
  };
}

// 统计卡片组件样式
export const statCardStyle = {
  ...cardStyle,
  padding: '20px',
};

// 标签样式
export const tagStyle = {
  background: 'rgba(59, 130, 246, 0.15)',
  color: '#60a5fa',
  borderRadius: '8px',
  padding: '4px 10px',
  fontSize: '12px',
};

// 空状态样式
export const emptyStateClass = "text-center py-12 text-gray-400";

// 加载状态样式
export const loadingClass = "flex items-center justify-center py-12";
