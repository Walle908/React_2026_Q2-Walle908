import { type ReactNode } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import styles from './SearchSection.module.css';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export default function SearchSection({ onSearch, initialValue }: SearchSectionProps): ReactNode {
  return (
    <section className={styles.searchSection}>
      <h1 className={styles.mainTitle}>Rick and Morty</h1>
      <SearchForm onSearch={onSearch} initialValue={initialValue} />
    </section>
  );
}
