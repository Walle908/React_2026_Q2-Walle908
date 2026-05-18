import { useEffect, useState, useRef, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { getChars } from '../../api/api';
import {
  Delay,
  ErrorMessage,
  initialPage,
  localStorageKey,
  SearchParams,
} from '../../constants/constants';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import Loader from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { Outlet, useParams, useNavigate, useSearchParams } from 'react-router';
import './Page.css';

export default function Page(): ReactNode {
  const [chars, setChars] = useState<Character[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(ErrorMessage.NO_ERROR);
  const [query, setQuery] = useState<string>(() => localStorage.getItem(localStorageKey) || '');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastClickRef = useRef(0);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pageParam = searchParams.get(SearchParams.PAGE);
  const currentPage = Number(pageParam);

  const fetchCharacters = async (
    searchQuery: string,
    page: number,
    controller: AbortController
  ) => {
    setIsLoading(true);
    try {
      const { results, pages } = await getChars(searchQuery, page, controller.signal);

      if (results.length === 0) {
        setChars([]);
        setTotalPages(0);
        setErrorMessage(ErrorMessage.NOT_FOUND);
      } else {
        setChars(results);
        setTotalPages(pages);
        setErrorMessage(ErrorMessage.NO_ERROR);
      }
    } catch (err: unknown) {
      if (err instanceof Error) if (err.name === 'AbortError') return;

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
    localStorage.setItem(localStorageKey, trimmedQuery);

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

    if (
      target.classList.contains('left-panel') ||
      target.classList.contains('main-wrapper') ||
      target.classList.contains('cards-wrapper')
    ) {
      navigate(`/?${searchParams.toString()}`);
    }
  };

  const showPagination = !isLoading && chars.length > 0 && errorMessage === ErrorMessage.NO_ERROR;

  return (
    <div className="page-wrapper">
      <SearchSection onSearch={onSearch} initialValue={query} />
      <div className="main-wrapper" onClick={handleMainClick}>
        <div className={`left-panel ${id ? 'split' : ''}`}>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="results-wrapper">
              {showPagination && <Pagination totalPages={totalPages} onChange={handlePageChange} />}
              <ResultSection chars={chars} errorMessage={errorMessage} />
            </div>
          )}
        </div>
        {id && (
          <aside className="right-panel-details" onClick={(e) => e.stopPropagation()}>
            <Outlet context={chars} />
          </aside>
        )}
      </div>
    </div>
  );
}
