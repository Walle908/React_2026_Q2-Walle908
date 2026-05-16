import { type ChangeEvent, type ReactNode, type SubmitEvent, useState } from 'react';
import './SearchForm.css';

interface SearchProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export default function SearchForm({ onSearch, initialValue }: SearchProps): ReactNode {
  const [value, setValue] = useState(initialValue);

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    onSearch(trimmedValue);
    setValue(trimmedValue);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue('');
  };

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-wrapper">
        <input
          id="searchInput"
          name="search"
          type="search"
          placeholder="Search a character..."
          className="input-search"
          value={value}
          onChange={onChange}
        />
        {value && (
          <button type="button" className="clear-button" onClick={onClear}>
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
