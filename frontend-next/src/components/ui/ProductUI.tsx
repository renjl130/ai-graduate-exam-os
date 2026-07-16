import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductTone = "blue" | "green" | "orange" | "violet" | "cyan" | "red";

export function ProductCard({ tone, interactive, className, ...props }: HTMLAttributes<HTMLDivElement> & { tone?: ProductTone; interactive?: boolean }) {
  return <div className={cn("business-card", tone && `tone-${tone}`, interactive && "is-interactive", className)} {...props} />;
}

export function ProductButton({ variant = "primary", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "success" | "icon" }) {
  const variants = { primary: "primary-action", secondary: "secondary-action", success: "success-action", icon: "icon-action" };
  return <button className={cn(variants[variant], className)} {...props} />;
}

export function ProductBadge({ tone = "blue", children }: { tone?: ProductTone; children: ReactNode }) {
  return <span className={`product-badge tone-${tone}`}>{children}</span>;
}

export function ProductProgress({ value, tone = "blue", label }: { value: number; tone?: ProductTone; label?: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="product-progress" role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100} aria-label={label}><i className={`tone-${tone}`} style={{ width: `${safe}%` }} /></div>;
}

export function ProductSkeleton({ className = "" }: { className?: string }) { return <span className={cn("skeleton-block", className)} aria-hidden="true" />; }

export function ProductEmpty({ icon: Icon, title, description, action, onAction }: { icon: LucideIcon; title: string; description: string; action?: string; onAction?: () => void }) {
  return <div className="product-empty"><span><Icon size={23} /></span><strong>{title}</strong><p>{description}</p>{action && <button onClick={onAction}>{action}<ArrowRight size={13} /></button>}</div>;
}