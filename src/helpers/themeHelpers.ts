export const THEME_STORAGE_KEY = 'quipucords-theme';
export const THEME_COOKIE_KEY = 'quipucords-theme-preference';

export type ThemeMode = 'light' | 'dark';

export const getStoredTheme = (): ThemeMode | null => {
  try {
    // Try localStorage first
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    // Try sessionStorage as backup
    const sessionStored = sessionStorage.getItem(THEME_STORAGE_KEY);
    if (sessionStored === 'light' || sessionStored === 'dark') {
      return sessionStored;
    }

    // Try cookie as last resort
    const cookies = document.cookie.split(';');
    const themeCookie = cookies.find(cookie => cookie.trim().startsWith(`${THEME_COOKIE_KEY}=`));
    if (themeCookie) {
      const themeValue = themeCookie.split('=')[1];
      if (themeValue === 'light' || themeValue === 'dark') {
        return themeValue;
      }
    }

    return null;
  } catch (error) {
    console.warn('Failed to read theme from storage:', error);
    return null;
  }
};

export const setStoredTheme = (theme: ThemeMode): void => {
  try {
    // Store in localStorage (primary)
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Store in sessionStorage (backup)
    sessionStorage.setItem(THEME_STORAGE_KEY, theme);

    // Store in cookie (last resort, expires in 1 year)
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${THEME_COOKIE_KEY}=${theme}; expires=${expires.toUTCString()}; path=/`;
  } catch (error) {
    console.warn('Failed to save theme to storage:', error);
  }
};

export const getSystemTheme = (): ThemeMode => {
  try {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (error) {
    // Fallback to light theme if matchMedia is not available (e.g., in test environment)
    return 'light';
  }
};

export const getInitialTheme = (): ThemeMode => {
  // Priority: stored theme > system theme > light (fallback)
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  // If no stored theme, use system theme
  const systemTheme = getSystemTheme();
  if (systemTheme) {
    return systemTheme;
  }

  // Final fallback to light theme
  return 'light';
};

export const applyThemeToDOM = (theme: ThemeMode): void => {
  const htmlElement = document.getElementsByTagName('html')[0];
  if (htmlElement) {
    if (theme === 'dark') {
      htmlElement.classList.add('pf-v6-theme-dark');
    } else {
      htmlElement.classList.remove('pf-v6-theme-dark');
    }
  }
};
