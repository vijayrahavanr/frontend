import { useCallback, useEffect, useState } from 'react';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants/api.constants';

/**
 * Manages light/dark theme mode.
 * Persists the choice to localStorage and toggles Tailwind's `dark`
 * class on <html>, so both Tailwind and MUI (via ThemeProvider) stay
 * in sync off a single source of truth.
 */
export const useThemeMode = () => {
  const [mode, setMode] = useState(() => {
    const stored = storage.get(STORAGE_KEYS.THEME_MODE);
    if (stored) return stored;
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    storage.set(STORAGE_KEYS.THEME_MODE, mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { mode, setMode, toggleMode, isDark: mode === 'dark' };
};

export default useThemeMode;
