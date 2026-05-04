import { type ChangeEvent, type SubmitEvent, Component } from 'react';
import { localStorageKey } from '../../constants/constants';
import './SearchForm.css';
import '../../index.css';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  value: string;
}

export default class SearchForm extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSearch(this.state.value.trim());
  };

  onChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value });
  }

  override componentDidMount(): void {
    const localStorageValue = localStorage.getItem(localStorageKey);
    if (localStorageValue) {
      this.setState({ value: localStorageValue });
    } else {
      this.setState({ value: '' });
    }
  }

  override render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input
          type="search"
          placeholder="Search a character..."
          className="inputSearch"
          value={this.state.value}
          onChange={this.onChange}
        />
        <button type="submit" className="button buttonSearch">
          Search
        </button>
      </form>
    );
  }
}
