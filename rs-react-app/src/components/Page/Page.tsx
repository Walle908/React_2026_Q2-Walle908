import { Component, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { getChars } from '../../api/api';
import { ErrorMessage, localStorageKey } from '../../constants/constants';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import Loader from '../Loader/Loader';

interface PageProps {}

interface PageState {
  chars: Character[];
  errorMessage: ErrorMessage;
  query: string;
  isLoading: boolean;
}

export default class Page extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      chars: [],
      errorMessage: ErrorMessage.NO_ERROR,
      query: localStorage.getItem(localStorageKey) || '',
      isLoading: false,
    };
  }

  onSearch = async (query: string) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === this.state.query && this.state.errorMessage === ErrorMessage.NO_ERROR) {
      return;
    }

    this.setState({ query: trimmedQuery, isLoading: true, errorMessage: ErrorMessage.NO_ERROR });
    localStorage.setItem(localStorageKey, trimmedQuery);

    try {
      const data = await getChars(trimmedQuery);
      if (data.length === 0) {
        this.setState({ chars: [], errorMessage: ErrorMessage.NOT_FOUND });
      } else {
        this.setState({ chars: data });
      }
    } catch {
      this.setState({ chars: [], errorMessage: ErrorMessage.ANOTHER_ERROR });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setInitialState = async () => {
    const { query } = this.state;
    this.setState({ isLoading: true });

    try {
      const data = await getChars(query);
      if (data.length === 0) {
        this.setState({ chars: [], errorMessage: ErrorMessage.NOT_FOUND });
      } else {
        this.setState({ chars: data });
      }
    } catch {
      this.setState({ chars: [], errorMessage: ErrorMessage.ANOTHER_ERROR });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  override componentDidMount(): void {
    this.setInitialState();
  }

  override render(): ReactNode {
    const { chars, errorMessage, isLoading } = this.state;

    return (
      <>
        <SearchSection onSearch={this.onSearch} initialValue={this.state.query}></SearchSection>
        {isLoading ? (
          <Loader />
        ) : (
          <ResultSection chars={chars} errorMessage={errorMessage}></ResultSection>
        )}
      </>
    );
  }
}
