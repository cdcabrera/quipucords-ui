import React, { createContext, useContext } from 'react';
import type { ThemeMode } from '../helpers/themeHelpers';
import { useTheme } from '../hooks/useTheme';

interface ThemeContextType {
  theme: ThemeMode;
  isDarkTheme: boolean;
  isLoaded: boolean;
  toggleTheme: () => void;
  setThemeMode: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeData = useTheme();

  return <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
