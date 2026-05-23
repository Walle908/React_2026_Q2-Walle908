import { useEffect, useState, useRef, type ReactNode } from 'react';
import { type Character } from '../../../types/types';
import { getChars } from '../../../api/api';
import {
  Delay,
  ErrorMessage,
  initialPage,
  localStorageKey,
  SearchParams,
} from '../../../constants/constants';
import SearchSection from '../../SearchSection/SearchSection';
import ResultBlock from '../../ResultBlock/ResultBlock';
import Loader from '../../Loader/Loader';
import { Pagination } from '../../Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router';
import Header from '../../Header/Header';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import styles from './HomePage.module.css';

export default function HomePage(): ReactNode {
  const [chars, setChars] = useState<Character[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(ErrorMessage.NO_ERROR);
  const [query, setQuery] = useLocalStorage<string>(localStorageKey, '');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastClickRef = useRef(0);

  const pageParam = searchParams.get(SearchParams.PAGE);
  const currentPage = Number(pageParam);
  const characterId = searchParams.get(SearchParams.DETAILS);

  const fetchCharacters = async (
    searchQuery: string,
    page: number,
    controller: AbortController
  ) => {
    setIsLoading(true);
    try {
      const data = await getChars(searchQuery, page, controller.signal);

      if (data === null) {
        setChars([]);
        setTotalPages(0);
        setErrorMessage(ErrorMessage.NOT_FOUND);
        return;
      }

      setChars(data.results);
      setTotalPages(data.pages);
      setErrorMessage(ErrorMessage.NO_ERROR);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;

      setChars([]);
      setTotalPages(0);
      setErrorMessage(ErrorMessage.ANOTHER_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentPage || currentPage < initialPage) return;

    const controller = new AbortController();

    const runFetch = async () => {
      await fetchCharacters(query, currentPage, controller);
    };
    runFetch();

    return () => controller.abort();
  }, [currentPage, query]);

  useEffect(() => {
    const pageParam = searchParams.get(SearchParams.PAGE);
    const parsedPage = Number(pageParam);

    if (!pageParam || !Number.isInteger(parsedPage) || parsedPage < initialPage) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(SearchParams.PAGE, String(initialPage));
      setSearchParams(newParams, { replace: true });
    }
  }, [currentPage, searchParams, setSearchParams]);

  const onSearch = async (newQuery: string) => {
    const trimmedQuery = newQuery.trim();

    if (trimmedQuery === query && errorMessage === ErrorMessage.NO_ERROR) {
      return;
    }

    setQuery(trimmedQuery);
    setTotalPages(0);

    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.PAGE, String(initialPage));
    setSearchParams(newParams, { replace: true });
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage === currentPage || isLoading) return;

    const now = Date.now();
    if (now - lastClickRef.current < Delay) return;
    lastClickRef.current = now;

    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.PAGE, String(newPage));
    setSearchParams(newParams);
  };

  const handleMainClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    const isLeftPanel = styles.leftPanel && target.classList.contains(styles.leftPanel);
    const isMainWrapper = styles.mainWrapper && target.classList.contains(styles.mainWrapper);
    const isCardsWrapper = Array.from(target.classList).some(
      (className) => className.startsWith('cardsWrapper_') || className.includes('_cardsWrapper_')
    );

    if (isLeftPanel || isMainWrapper || isCardsWrapper) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(SearchParams.DETAILS);
      setSearchParams(newParams);
    }
  };

  const showPagination = !isLoading && chars.length > 0 && errorMessage === ErrorMessage.NO_ERROR;

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <SearchSection onSearch={onSearch} initialValue={query} />
        <section className={styles.mainWrapper} onClick={handleMainClick}>
          <div
            className={`${styles.leftPanel} ${characterId ? styles.split : ''}`}
            data-testid="left-panel">
            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles.resultsWrapper}>
                {showPagination && (
                  <Pagination totalPages={totalPages} onChange={handlePageChange} />
                )}
                <ResultBlock chars={chars} errorMessage={errorMessage} />
              </div>
            )}
          </div>

          {characterId && (
            <aside className={styles.rightPanelDetails} onClick={(e) => e.stopPropagation()}>
              <Outlet context={chars} />
            </aside>
          )}
        </section>
      </main>
    </>
  );
}
