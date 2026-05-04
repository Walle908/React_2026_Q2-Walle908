import { Component, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { getChars } from '../../api/api';
import { ErrorMessage, localStorageKey } from '../../constants/constants';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import GenerateErrorSection from '../GenerateErrorSection/GenerateErrorSection';

interface PageProps {
  query?: string;
}

interface PageState {
  chars: Character[] | [];
  errorMessage: ErrorMessage;
}

export default class Page extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      chars: [],
      errorMessage: ErrorMessage.NO_ERROR,
    };
    this.onSearch = this.onSearch.bind(this);
  }

  async onSearch(query: string) {
    localStorage.setItem(localStorageKey, query);
    this.setState({ errorMessage: ErrorMessage.NO_ERROR });

    try {
      const data = await getChars(query);
      if (data.length === 0) {
        this.setState({ chars: [], errorMessage: ErrorMessage.NOT_FOUND });
      } else {
        this.setState({ chars: data, errorMessage: ErrorMessage.NO_ERROR });
      }
    } catch {
      this.setState({ chars: [], errorMessage: ErrorMessage.ANOTHER_ERROR });
    }
  }

  setInitialState = () => {
    const localStorageValue = localStorage.getItem(localStorageKey);

    if (localStorageValue) {
      this.onSearch(localStorageValue);
    } else {
      getChars().then((data) => {
        if (Array.isArray(data)) {
          this.setState({ chars: data });
        }
      });
    }
  };

  override componentDidMount(): void {
    this.setInitialState();
  }

  override render(): ReactNode {
    return (
      <>
        <SearchSection onSearch={this.onSearch}></SearchSection>
        <ResultSection
          chars={this.state.chars}
          errorMessage={this.state.errorMessage}></ResultSection>
        <GenerateErrorSection />
      </>
    );
  }
}
