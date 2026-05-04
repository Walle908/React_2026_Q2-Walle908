import { type ChangeEvent, type SubmitEvent, Component } from 'react';
import './SearchForm.css';

interface SearchProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

interface SearchState {
  value: string;
}

export default class SearchForm extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: this.props.initialValue,
    };
  }

  onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = this.state.value.trim();
    this.setState({ value: trimmedValue });
    this.props.onSearch(trimmedValue);
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  onClear = () => {
    this.setState({ value: '' });
  };

  override render() {
    const { value } = this.state;

    return (
      <form className="search-form" onSubmit={this.onSubmit}>
        <div className="search-wrapper">
          <input
            id="searchInput"
            name="search"
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
