'use client';

import { type ChangeEvent, type SubmitEvent, type ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { localStorageKey, initialPage } from '@/constants/constants';
import buildUrl from '@/utils/buildUrl';
import styles from './SearchForm.module.css';

interface SearchProps {
  initialValue: string;
}

export default function SearchForm({ initialValue }: SearchProps): ReactNode {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    if (trimmedValue) {
      localStorage.setItem(localStorageKey, trimmedValue);
    } else {
      localStorage.removeItem(localStorageKey);
    }

    setValue(trimmedValue);
    router.push(buildUrl(initialPage, trimmedValue));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue('');
  };

  return (
    <form className={styles.searchForm} onSubmit={onSubmit} key={initialValue}>
      <div className={styles.searchWrapper}>
        <Input
          onChange={onChange}
          placeholder="Search a character..."
          type="search"
          value={value}
          variant="search"
        />
        {value && (
          <Button className={styles.clearButton} color="no" onClick={onClear} variant="plain">
            ✖
          </Button>
        )}
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}
