import { type ChangeEvent, type ReactNode, type SubmitEvent, useState } from 'react';
import Button from '@components/Button/Button';
import SearchInput from '@components/SearchInput/SearchInput';
import styles from './SearchForm.module.css';

interface SearchProps {
  initialValue: string;
  onSearch: (query: string) => void;
}

export default function SearchForm({ initialValue, onSearch }: SearchProps): ReactNode {
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
        <SearchInput onChange={onChange} value={value} />

        {value && (
          <Button className={styles.clearButton} onClick={onClear} variant="plain">
            ✖
          </Button>
        )}
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}
