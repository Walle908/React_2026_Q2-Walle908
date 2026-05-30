import { type ReactNode } from 'react';
import ErrorButton from '@/components/features/error-handling/ErrorButton/ErrorButton';
import Button from '@/components/ui/Button/Button';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Header.module.css';

export default function Header(): ReactNode {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <Button className={styles.switcher} onClick={toggleTheme} variant="plain" color="noBg">
        {isDarkTheme === false ? '🌙' : '☀️'}
      </Button>
      <LinkComponent className={styles.aboutLink} to="/about">
        About
      </LinkComponent>
      <ErrorButton />
    </header>
  );
}
