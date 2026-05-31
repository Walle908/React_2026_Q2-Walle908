import { type ReactNode } from 'react';
import ErrorButton from '@/components/features/error-handling/ErrorButton/ErrorButton';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import styles from './Header.module.css';

export default function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <LinkComponent className={styles.aboutLink} to="/about">
        About
      </LinkComponent>
      <ErrorButton />
    </header>
  );
}
