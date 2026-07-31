'use client';

import { type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import SearchForm from '@/components/features/search/SearchForm/SearchForm';
import Text from '@/components/ui/Text/Text';
import styles from './SearchSection.module.css';

interface SearchSectionProps {
  initialValue: string;
}

export default function SearchSection({ initialValue }: SearchSectionProps): ReactNode {
  const t = useTranslations('App');

  return (
    <section className={styles.searchSection}>
      <Text as="h1" className={styles.mainTitle} color="accent" size="xxl">
        {t('mainTitle')}
      </Text>
      <SearchForm initialValue={initialValue} />
    </section>
  );
}
