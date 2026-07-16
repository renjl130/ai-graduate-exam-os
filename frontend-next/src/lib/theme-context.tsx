"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "jiale-graduate-theme";

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode !== "system") return mode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  const applyTheme = useCallback((mode: ThemeMode) => {
    const resolved = resolveTheme(mode);
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.style.colorScheme = resolved;
    setResolvedTheme(resolved);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const initial = saved === "dark" || saved === "system" || saved === "light" ? saved : "light";
    setThemeState(initial);
    applyTheme(initial);
  }, [applyTheme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => theme === "system" && applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [applyTheme, theme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
  }, [applyTheme]);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within ThemeProvider");
  return value;
}