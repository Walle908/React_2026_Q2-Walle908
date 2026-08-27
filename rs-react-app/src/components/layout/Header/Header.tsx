'use client';

import { type ReactNode } from 'react';
import LinkComponent from '@/components/ui/LinkComponent/LinkComponent';
import LanguageSwitcher from '@/components/features/languageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '@/components/features/themeSwitcher/ThemeSwitcher';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import styles from './Header.module.css';

export default function Header(): ReactNode {
  const t = useTranslations('App');
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';

  return (
    <header className={styles.header}>
      {isAboutPage ? (
        <LinkComponent className={styles.link} href="/">
          {t('mainPageLink')}
        </LinkComponent>
      ) : (
        <LinkComponent className={styles.link} href="/about">
          {t('aboutLink')}
        </LinkComponent>
      )}
      <ThemeSwitcher />
      <LanguageSwitcher />
    </header>
  );
}
