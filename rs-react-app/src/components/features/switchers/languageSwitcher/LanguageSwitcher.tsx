'use client';

import { type ChangeEvent } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { type Locale } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextLocale = event.target.value as Locale;
    const currentQueryObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      currentQueryObj[key] = value;
    });
    router.replace({ pathname, query: currentQueryObj }, { locale: nextLocale, scroll: false });
  };

  return (
    <div className={styles.langContainer}>
      {languages.map((lang) => (
        <label key={lang.code} className={styles.langLabel}>
          <input
            type="radio"
            name="language"
            value={lang.code}
            checked={locale === lang.code}
            onChange={onChange}
            className={styles.radioInput}
          />

          <span className={styles.customButton}>{lang.label}</span>
        </label>
      ))}
    </div>
  );
}
