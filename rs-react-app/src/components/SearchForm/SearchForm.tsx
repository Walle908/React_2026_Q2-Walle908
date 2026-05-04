import { type ChangeEvent, type SubmitEvent, Component } from 'react';
import { localStorageKey } from '../../constants/constants';
import './SearchForm.css';

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

  onClear = () => {
    this.setState({ value: '' });
  };

  override componentDidMount(): void {
    const localStorageValue = localStorage.getItem(localStorageKey);
    if (localStorageValue) {
      this.setState({ value: localStorageValue });
    } else {
      this.setState({ value: '' });
    }
  }

  override render() {
    const { value } = this.state;

    return (
      <form className="search-form" onSubmit={this.onSubmit}>
        <div className="search-wrapper">
          <input
            type="search"
            placeholder="Search a character..."
            className="input-search"
            value={value}
            onChange={this.onChange}
          />
          {value && (
            <button type="button" className="clear-button" onClick={this.onClear}>
              ✖
            </button>
          )}
        </div>

        <button type="submit" className="button buttonSearch">
          Search
        </button>
      </form>
    );
  }
}
