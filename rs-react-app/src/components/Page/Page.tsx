import { useEffect, useState, useRef, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { getChars } from '../../api/api';
import { ErrorMessage, localStorageKey } from '../../constants/constants';
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';
import Loader from '../Loader/Loader';
import { Outlet, useParams, useNavigate, useSearchParams } from 'react-router';
import './Page.css';

export default function Page(): ReactNode {
  const [chars, setChars] = useState<Character[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(ErrorMessage.NO_ERROR);
  const [query, setQuery] = useState<string>(() => localStorage.getItem(localStorageKey) || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isInitialLoading = useRef(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  return (
    <div className="page-wrapper">
      <SearchSection onSearch={onSearch} initialValue={query} />
      <div className="main-wrapper" onClick={handleMainClick}>
        <div className={`left-panel ${id ? 'split' : ''}`}>
          {isLoading ? <Loader /> : <ResultSection chars={chars} errorMessage={errorMessage} />}
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
