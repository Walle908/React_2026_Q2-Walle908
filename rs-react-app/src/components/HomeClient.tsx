'use client';

import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Flyout from './features/characters/Flyout/Flyout';
import SearchSection from '@/components/features/search/SearchSection/SearchSection';
import Pagination from '@/components/ui/Pagination/Pagination';
import Button from './ui/Button/Button';
import ResultBlock from '@/components/features/characters/ResultBlock/ResultBlock';
import CardDetailed from '@/components/features/characters/CardDetailed/CardDetailed';
import { initialPage } from '@/constants/constants';
import mapError from '@/utils/mapError';
import buildUrl from '@/utils/buildUrl';
import { localStorageKey, ErrorMessage } from '@/constants/constants';
import type { Result, CharsResponse, Character } from '@/types/types';
import styles from './HomeClient.module.css';

interface HomeClientProps {
  currentPage: number;
  currentQuery: string;
  list: Result<CharsResponse>;
  selectedChar: Result<Character>;
  selectedId: string | null;
}

const Header = dynamic(() => import('./layout/Header/Header'), { ssr: false });

export default function HomeClient({
  currentPage,
  currentQuery,
  list,
  selectedChar,
  selectedId,
}: HomeClientProps) {
  const router = useRouter();

  const chars = list?.data?.results ?? [];
  const totalPages = list?.data?.pages ?? 0;
  const listErrorMessage = mapError(list?.error);
  const char = selectedChar?.data ?? null;
  const charErrorMessage = mapError(selectedChar?.error);
  const characterId = selectedId;

  const showPagination = chars.length > 0 && listErrorMessage === ErrorMessage.NO_ERROR;

  const handleRefresh = () => {
    router.refresh();
  };

  useEffect(() => {
    if (!currentQuery) {
      const saved = localStorage.getItem(localStorageKey);

      const trimmed = saved?.trim();
      if (trimmed) {
        router.replace(buildUrl(initialPage, trimmed));
      }
    }
  }, [currentQuery, router]);

  const onSearch = (query: string) => {
    const trimmed = query.trim();

    if (trimmed) {
      localStorage.setItem(localStorageKey, trimmed);
    } else {
      localStorage.removeItem(localStorageKey);
    }

    router.push(buildUrl(initialPage, trimmed));
  };

  const onPageChange = (page: number) => {
    router.push(buildUrl(page, currentQuery, characterId), { scroll: false });
  };

  const closeCard = () => {
    router.push(buildUrl(currentPage, currentQuery), { scroll: false });
  };

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <SearchSection initialValue={currentQuery} onSearch={onSearch} />
        <section className={styles.mainWrapper}>
          <div
            className={`${styles.leftPanel} ${characterId ? styles.split : ''}`}
            data-testid="left-panel">
            <div className={styles.resultsWrapper}>
              {showPagination && (
                <div className={styles.rowWrapper}>
                  <Pagination
                    onChange={onPageChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                  <Button color={'accent'} onClick={handleRefresh}>
                    Refresh
                  </Button>
                </div>
              )}

              <ResultBlock
                chars={chars}
                errorMessage={listErrorMessage}
                currentPage={currentPage}
                currentQuery={currentQuery}
              />
            </div>
          </div>

          {characterId && (
            <aside className={styles.rightPanelDetails} onClick={(e) => e.stopPropagation()}>
              <CardDetailed
                char={char}
                errorMessage={charErrorMessage}
                onClose={closeCard}></CardDetailed>
            </aside>
          )}
        </section>
        <Flyout />
      </main>
    </>
  );
}
