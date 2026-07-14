"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi, setToken, getToken, clearToken, ApiError } from "./api";

interface User {
  id: string;
  email: string;
  username: string;
  target_school?: string;
  target_major?: string;
  exam_date?: string;
  is_premium?: boolean;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
    target_school?: string;
    target_major?: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 初始化：检查token并获取用户信息
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await authApi.getMe();
          setUser(userData);
        } catch (err) {
          // Token无效或过期
          clearToken();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // 登录
  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await authApi.login({ email, password });
      setToken(response.access_token);
      setUser(response.user);
    } catch (err) {
      const message = err instanceof ApiError ? err.detail : "登录失败，请重试";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 注册
  const register = useCallback(async (data: {
    email: string;
    username: string;
    password: string;
    target_school?: string;
    target_major?: string;
  }) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await authApi.register(data);
      setToken(response.access_token);
      setUser(response.user);
    } catch (err) {
      const message = err instanceof ApiError ? err.detail : "注册失败，请重试";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 登出
  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  // 更新用户信息
  const updateUser = useCallback(async (data: Partial<User>) => {
    try {
      await authApi.updateMe(data);
      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      const message = err instanceof ApiError ? err.detail : "更新失败";
      setError(message);
      throw err;
    }
  }, []);

  // 清除错误
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// 可选：不抛出错误的版本
export function useOptionalAuth() {
  return useContext(AuthContext);
}
