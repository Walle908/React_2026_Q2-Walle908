'use client';

import { type ReactNode } from 'react';
import SearchForm from '@/components/features/search/SearchForm/SearchForm';
import Text from '@/components/ui/Text/Text';
import styles from './SearchSection.module.css';

interface SearchSectionProps {
  initialValue: string;
}

export default function SearchSection({ initialValue }: SearchSectionProps): ReactNode {
  return (
    <section className={styles.searchSection}>
      <Text as="h1" className={styles.mainTitle} color="accent" size="xxl">
        Rick and Morty
      </Text>
      <SearchForm initialValue={initialValue} />
    </section>
  );
}
