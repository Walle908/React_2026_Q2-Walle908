import { type ReactNode, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import styles from './ThemeContextProvider.module.css';

const DARK_THEME_CLASS = 'dark';
const THEME_LS_KEY = 'theme_walle908';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<string>(THEME_LS_KEY, 'light');

  const isDarkTheme = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add(DARK_THEME_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_THEME_CLASS);
    }
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <div className={`${styles.container} ${isDarkTheme ? DARK_THEME_CLASS : ''}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
