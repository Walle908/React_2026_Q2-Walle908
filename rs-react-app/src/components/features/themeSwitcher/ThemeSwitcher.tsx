'use client';

import { type ReactNode, useSyncExternalStore } from 'react';
import Button from '@/components/ui/Button/Button';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './ThemeSwitcher.module.css';

const subscribeEmpty = () => () => {};
const getSnapshotClient = () => true;
const getSnapshotServer = () => false;

export default function ThemeSwitcher(): ReactNode {
  const { isDarkTheme, toggleTheme } = useTheme();

  const isMounted = useSyncExternalStore(subscribeEmpty, getSnapshotClient, getSnapshotServer);

  if (!isMounted) {
    return <div className={styles.togglePlaceholder} />;
  }

  return (
    <Button className={styles.switcher} variant="plain" color="no" onClick={toggleTheme}>
      {isDarkTheme ? '☀️' : '🌙'}
    </Button>
  );
}
