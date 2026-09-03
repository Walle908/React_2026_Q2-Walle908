'use client';

import { type ChangeEvent, type ReactNode, useState, useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Input } from '@/components/ui';
import { localStorageKey } from '@/constants/constants';
import styles from './SearchForm.module.css';

interface SearchProps {
  initialValue: string;
  searchAction: (state: unknown, formData: FormData) => Promise<void>;
}

export function SearchForm({ initialValue, searchAction }: SearchProps): ReactNode {
  const t = useTranslations('Search');
  const [value, setValue] = useState(initialValue);
  const [prevInitialValue, setPrevInitialValue] = useState(initialValue);
  const [, formAction, pending] = useActionState(searchAction, undefined);

  if (initialValue !== prevInitialValue) {
    setValue(initialValue);
    setPrevInitialValue(initialValue);
  }

  const handleSubmit = (formData: FormData) => {
    const trimmedValue = value.trim();

    setValue(trimmedValue);

    if (trimmedValue) {
      localStorage.setItem(localStorageKey, trimmedValue);
      formData.set('query', trimmedValue);
    } else {
      localStorage.removeItem(localStorageKey);
      formData.set('query', '');
    }

    formAction(formData);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue('');
  };

  return (
    <form action={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchWrapper}>
        <Input
          onChange={onChange}
          placeholder={t('placeholder')}
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
      <Button type="submit" disabled={pending}>
        {pending ? t('searching') : t('search')}
      </Button>
    </form>
  );
}
