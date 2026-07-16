"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemeMode } from "@/lib/theme-context";

const options: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
  { value: "light", label: "浅色", icon: Sun },
  { value: "dark", label: "深色", icon: Moon },
  { value: "system", label: "跟随系统", icon: Monitor },
];

export default function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;
  return (
    <div className={`theme-switcher ${compact ? "is-compact" : ""}`}>
      {compact ? (
        <button
          type="button"
          className="icon-button"
          aria-label={`当前${resolvedTheme === "dark" ? "深色" : "浅色"}主题，点击切换`}
          title="切换主题"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <CurrentIcon size={18} />
        </button>
      ) : options.map(({ value, label, icon: Icon }) => (
        <button key={value} type="button" className={theme === value ? "is-active" : ""} onClick={() => setTheme(value)} aria-pressed={theme === value}>
          <Icon size={15} /><span>{label}</span>
        </button>
      ))}
    </div>
  );
}