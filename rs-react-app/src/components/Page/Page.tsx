import { Component, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { getChars } from '../../api/api';
import { ErrorMessage, localStorageKey } from '../../constants/constants';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';

interface PageProps {
  query?: string;
}

interface PageState {
  chars: Character[] | [];
  errorMessage: ErrorMessage;
  query: string;
}

export default class Page extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      chars: [],
      errorMessage: ErrorMessage.NO_ERROR,
      query: localStorage.getItem(localStorageKey) || '',
    };
  }

  onSearch = async (query: string) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === this.state.query) {
      return;
    }

    this.setState({ query: trimmedQuery, errorMessage: ErrorMessage.NO_ERROR });
    localStorage.setItem(localStorageKey, trimmedQuery);

    try {
      const data = await getChars(trimmedQuery);
      if (data.length === 0) {
        this.setState({ chars: [], errorMessage: ErrorMessage.NOT_FOUND });
      } else {
        this.setState({ chars: data, errorMessage: ErrorMessage.NO_ERROR });
      }
    } catch {
      this.setState({ chars: [], errorMessage: ErrorMessage.ANOTHER_ERROR });
    }
  };

  setInitialState = async () => {
    const { query } = this.state;

    try {
      const data = await getChars(query);
      if (data.length === 0) {
        this.setState({ chars: [], errorMessage: ErrorMessage.NOT_FOUND });
      } else {
        this.setState({ chars: data });
      }
    } catch {
      this.setState({ chars: [], errorMessage: ErrorMessage.ANOTHER_ERROR });
    }
  };

  override componentDidMount(): void {
    this.setInitialState();
  }

  override render(): ReactNode {
    return (
      <>
        <SearchSection onSearch={this.onSearch} initialValue={this.state.query}></SearchSection>
        <ResultSection
          chars={this.state.chars}
          errorMessage={this.state.errorMessage}></ResultSection>
      </>
    );
  }
}
