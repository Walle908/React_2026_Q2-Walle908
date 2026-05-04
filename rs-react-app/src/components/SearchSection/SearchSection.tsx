import { Component, type ReactNode } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './SearchSection.css';

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

export default class SearchSection extends Component<SearchSectionProps> {
  override render(): ReactNode {
    return (
      <>
        <section className="search-section">
          <h1 className="main-title">Rick and Morty</h1>
          <SearchForm onSearch={this.props.onSearch}></SearchForm>
        </section>
      </>
    );
  }
}
