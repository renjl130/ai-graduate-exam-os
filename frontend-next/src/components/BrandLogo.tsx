import type { SVGProps } from "react";

export function JialeMark({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} {...props}>
      <defs>
        <linearGradient id="jiale-gradient" x1="7" y1="5" x2="41" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--brand-400)" />
          <stop offset="0.56" stopColor="var(--brand-500)" />
          <stop offset="1" stopColor="var(--violet-500)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="14" fill="url(#jiale-gradient)" />
      <path d="M15 15.5h18v4.4H21.2v7.4c0 4.6 2.1 6.9 6.3 6.9 2.4 0 4.4-.7 6-2.1v5c-1.9 1.2-4.3 1.8-7.2 1.8-3.8 0-6.7-1-8.6-3.1-1.8-2-2.7-5-2.7-8.9V15.5Z" fill="var(--on-brand)" />
      <path d="M31.5 11.3 33 14l2.8 1.5-2.8 1.4-1.5 2.8-1.4-2.8-2.8-1.4 2.8-1.5 1.4-2.7Z" fill="var(--brand-highlight)" />
    </svg>
  );
}

export default function BrandLogo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <span className={`jiale-brand ${compact ? "is-compact" : ""} ${className}`}>
      <JialeMark className="jiale-brand-mark" />
      {!compact && (
        <span className="jiale-brand-copy">
          <strong>佳乐考研</strong>
          <span>Jiale Graduate</span>
        </span>
      )}
    </span>
  );
}