import { type ReactNode } from 'react';
import { Link } from 'react-router';
import ErrorButton from '@/components/features/error-handling/ErrorButton/ErrorButton';
import styles from './Header.module.css';

export default function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <Link className={`link ${styles.aboutLink}`} to="/about">
        About
      </Link>
      <ErrorButton />
    </header>
  );
}
