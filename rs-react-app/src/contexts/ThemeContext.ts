import { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const initialThemeContext: ThemeContextType = {
  isDarkTheme: false,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initialThemeContext);

export const useTheme = () => useContext(ThemeContext);
