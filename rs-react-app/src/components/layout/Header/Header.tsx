'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import ErrorButton from '@/components/features/error-handling/ErrorButton/ErrorButton';
import Button from '@/components/ui/Button/Button';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Header.module.css';

function ThemeToggleRaw(): ReactNode {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <Button className={styles.switcher} variant="plain" color="no" onClick={toggleTheme}>
      {isDarkTheme ? '☀️' : '🌙'}
    </Button>
  );
}

const ThemeToggle = dynamic(() => Promise.resolve(ThemeToggleRaw), {
  ssr: false,
  loading: () => (
    <Button color="no" variant="plain" className={styles.switcher}>
      🌙
    </Button>
  ),
});

export default function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <ThemeToggle />
      <LinkComponent className={styles.aboutLink} href="/about">
        About
      </LinkComponent>
      <ErrorButton />
    </header>
  );
}
