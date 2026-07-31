'use client';

import { type ReactNode } from 'react';
import ErrorButton from '@/components/features/error-handling/ErrorButton/ErrorButton';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import LanguageSwitcher from '@/components/features/languageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '@/components/features/themeSwitcher/ThemeSwitcher';
import { useTranslations } from 'next-intl';
import styles from './Header.module.css';

export default function Header(): ReactNode {
  const t = useTranslations('App');

  return (
    <header className={styles.header}>
      <LinkComponent className={styles.aboutLink} href="/about">
        {t('aboutLink')}
      </LinkComponent>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <ErrorButton />
    </header>
  );
}
