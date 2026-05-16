import { useEffect, useState, useRef, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { getChars } from '../../api/api';
import { ErrorMessage, localStorageKey } from '../../constants/constants';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import Loader from '../Loader/Loader';

export default function Page(): ReactNode {
  const [chars, setChars] = useState<Character[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(ErrorMessage.NO_ERROR);
  const [query, setQuery] = useState<string>(() => localStorage.getItem(localStorageKey) || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isInitialLoading = useRef(false);

  const fetchCharacters = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const data = await getChars(searchQuery);
      if (data.length === 0) {
        setChars([]);
        setErrorMessage(ErrorMessage.NOT_FOUND);
      } else {
        setChars(data);
      }
    } catch {
      setChars([]);
      setErrorMessage(ErrorMessage.ANOTHER_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = async (newQuery: string) => {
    const trimmedQuery = newQuery.trim();

    if (trimmedQuery === query && errorMessage === ErrorMessage.NO_ERROR) {
      return;
    }

    setQuery(trimmedQuery);
    localStorage.setItem(localStorageKey, trimmedQuery);
    setIsLoading(true);
    await fetchCharacters(trimmedQuery);
  };

  useEffect(() => {
    if (isInitialLoading.current) return;
    isInitialLoading.current = true;
    const initialQuery = localStorage.getItem(localStorageKey) || '';
    fetchCharacters(initialQuery);
  }, []);

  return (
    <>
      <SearchSection onSearch={onSearch} initialValue={query} />
      {isLoading ? <Loader /> : <ResultSection chars={chars} errorMessage={errorMessage} />}
    </>
  );
}
