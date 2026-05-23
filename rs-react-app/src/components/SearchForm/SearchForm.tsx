import { type ChangeEvent, type ReactNode, type SubmitEvent, useState } from 'react';
import Button from '../Button/Button';
import styles from './SearchForm.module.css';
import SearchInput from '../SearchInput/SearchInput';

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
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <div className={styles.searchWrapper}>
        <SearchInput value={value} onChange={onChange} />

        {value && (
          <Button variant="clear" onClick={onClear}>
            {' '}
            ✖
          </Button>
        )}
      </div>
      <Button type="submit"> Search</Button>
    </form>
  );
}
