import { useCallback, useEffect, useState } from 'react';
import {
  getInitialTheme,
  getStoredTheme,
  setStoredTheme,
  applyThemeToDOM,
  type ThemeMode
} from '../helpers/themeHelpers';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  const [isLoaded, setIsLoaded] = useState(false);

  // Apply theme to DOM whenever theme changes
  useEffect(() => {
    applyThemeToDOM(theme);
    setIsLoaded(true);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      if (mediaQuery) {
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
          const newSystemTheme: ThemeMode = e.matches ? 'dark' : 'light';
          // Only update if no stored theme preference exists
          // Use the helper function instead of direct localStorage access
          const storedTheme = getStoredTheme();
          if (!storedTheme) {
            setTheme(newSystemTheme);
          }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
      }
    } catch (error) {
      // Ignore errors in test environment where matchMedia might not be available
      console.warn('Failed to set up system theme listener:', error);
    }

    // Return empty cleanup function if no mediaQuery was set up
    return () => {};
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setStoredTheme(newTheme);
  }, [theme]);

  const setThemeMode = useCallback((newTheme: ThemeMode) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
  }, []);

  return {
    theme,
    isDarkTheme: theme === 'dark',
    isLoaded,
    toggleTheme,
    setThemeMode
  };
};
