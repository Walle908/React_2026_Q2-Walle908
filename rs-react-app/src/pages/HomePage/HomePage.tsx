import { type ReactNode, useEffect, useRef } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import ResultBlock from '@/components/features/characters/ResultBlock/ResultBlock';
import SearchSection from '@/components/features/search/SearchSection/SearchSection';
import Header from '@/components/layout/Header/Header';
import Loader from '@/components/ui/Loader/Loader';
import Pagination from '@/components/ui/Pagination/Pagination';
import {
  Delay,
  ErrorMessage,
  initialPage,
  localStorageKey,
  SearchParams,
} from '@/constants/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCharacter, fetchCharacterById } from '@/store/reducers/characterDetailsSlice';
import { fetchCharacters } from '@/store/reducers/charactersSlice';
import { setQuery } from '@/store/reducers/searchSlice';
import styles from './HomePage.module.css';

export default function HomePage(): ReactNode {
  const dispatch = useAppDispatch();
  const lastClickRef = useRef(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get(SearchParams.PAGE);
  const characterId = searchParams.get(SearchParams.DETAILS);
  const currentPage = Number(pageParam) >= initialPage ? Number(pageParam) : initialPage;

  const { chars, errorMessage, isLoading, totalPages } = useAppSelector(
    (state) => state.characters
  );
  const query = useAppSelector((state) => state.search.query);

  useEffect(() => {
    const parsedPage = Number(pageParam);

    if (!pageParam || !Number.isInteger(parsedPage) || parsedPage < initialPage) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(SearchParams.PAGE, String(initialPage));
          return next;
        },
        { replace: true }
      );
    }
  }, [pageParam, setSearchParams]);

  useEffect(() => {
    dispatch(fetchCharacters({ page: currentPage, query }));
  }, [dispatch, query, currentPage]);

  useEffect(() => {
    if (!characterId) {
      dispatch(clearCharacter());
      return;
    }

    dispatch(fetchCharacterById(characterId));
  }, [characterId, dispatch]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, query);
  }, [query]);

  const onSearch = async (newQuery: string) => {
    const trimmedQuery = newQuery.trim();

    if (trimmedQuery === query && errorMessage === ErrorMessage.NO_ERROR) {
      return;
    }

    dispatch(setQuery(trimmedQuery));

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(SearchParams.PAGE, String(initialPage));
        return next;
      },
      { replace: true }
    );
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage === currentPage || isLoading) return;

    const now = Date.now();
    if (now - lastClickRef.current < Delay) return;
    lastClickRef.current = now;

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(SearchParams.PAGE, String(newPage));
      return next;
    });
  };

  const showPagination = !isLoading && chars.length > 0 && errorMessage === ErrorMessage.NO_ERROR;

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <SearchSection initialValue={query} onSearch={onSearch} />
        <section className={styles.mainWrapper}>
          <div
            className={`${styles.leftPanel} ${characterId ? styles.split : ''}`}
            data-testid="left-panel">
            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles.resultsWrapper}>
                {showPagination && (
                  <Pagination onChange={handlePageChange} totalPages={totalPages} />
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
