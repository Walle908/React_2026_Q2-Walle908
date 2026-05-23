import { type ReactNode } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Text from '../Text/Text';
import styles from './SearchSection.module.css';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export default function SearchSection({ onSearch, initialValue }: SearchSectionProps): ReactNode {
  return (
    <section className={styles.searchSection}>
      <Text as="h1" className={styles.mainTitle}>
        Rick and Morty
      </Text>
      <SearchForm onSearch={onSearch} initialValue={initialValue} />
    </section>
  );
}
