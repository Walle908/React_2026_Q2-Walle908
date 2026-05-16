import { type ReactNode } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './SearchSection.css';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export default function SearchSection({ onSearch, initialValue }: SearchSectionProps): ReactNode {
  return (
    <section className="search-section">
      <h1 className="main-title">Rick and Morty</h1>
      <SearchForm onSearch={onSearch} initialValue={initialValue} />
    </section>
  );
}
