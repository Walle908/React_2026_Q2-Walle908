import { Component, type ReactNode } from 'react';
import SearchForm from '../SearchForm/SearchForm';

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

export default class SearchSection extends Component<SearchSectionProps> {
  override render(): ReactNode {
    return (
      <>
        <section>
          <h1>Rick and Morty</h1>
          <SearchForm onSearch={this.props.onSearch}></SearchForm>
        </section>
      </>
    );
  }
}
