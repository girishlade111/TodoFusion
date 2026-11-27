'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (next: ThemeMode) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  mounted: false,
});

const STORAGE_KEY = 'todofusion-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((next: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(next);
    root.setAttribute('data-theme', next);
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      const initial: ThemeMode = saved === 'light' || saved === 'dark' ? saved : 'dark';
      setThemeState(initial);
      applyTheme(initial);
    } catch {
      applyTheme('dark');
    }
    setMounted(true);
  }, [applyTheme]);

  const setTheme = useCallback(
    (next: ThemeMode) => {
      setThemeState(next);
      applyTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // storage unavailable
      }
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
