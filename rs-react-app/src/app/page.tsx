import { Suspense, type ReactNode } from 'react';
import { getChars, getOneChar } from '@/services/api';
import Header from '@/components/layout/Header/Header';
import SearchSection from '@/components/features/search/SearchSection/SearchSection';
import Pagination from '@/components/ui/Pagination/Pagination';
import RefreshButton from '@/components/features/characters/RefreshButton/RefreshButton';
import ResultBlock from '@/components/features/characters/ResultBlock/ResultBlock';
import CardDetailed from '@/components/features/characters/CardDetailed/CardDetailed';
import Loader from '@/components/ui/Loader/Loader';
import Flyout from '@/components/features/characters/Flyout/Flyout';
import { initialPage, ErrorMessage } from '@/constants/constants';
import mapError from '@/utils/mapError';
import styles from '@/styles/app.module.css';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    details?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps): Promise<ReactNode> {
  const params = await searchParams;

  const page = Number(params.page ?? initialPage);
  const query = params.query ?? '';
  const id = params.details ?? null;

  const [listResult, detailResult] = await Promise.all([
    getChars(query, page),
    id ? getOneChar(id) : Promise.resolve({ data: null, error: null }),
  ]);

  const chars = listResult?.data?.results ?? [];
  const totalPages = listResult?.data?.pages ?? 0;
  const listErrorMessage = mapError(listResult?.error);
  const char = detailResult?.data ?? null;
  const charErrorMessage = mapError(detailResult?.error);

  const showPagination = chars.length > 0 && listErrorMessage === ErrorMessage.NO_ERROR;

  return (
    <>
      <Header />

      <main className={styles.pageWrapper}>
        <SearchSection initialValue={query} />
        <section className={styles.mainWrapper}>
          <div className={`${styles.leftPanel} ${id ? styles.split : ''}`} data-testid="left-panel">
            <div className={styles.resultsWrapper}>
              {showPagination && (
                <div className={styles.rowWrapper}>
                  <Pagination currentQuery={query} currentPage={page} totalPages={totalPages} />
                  <RefreshButton />
                </div>
              )}
              <Suspense fallback={<Loader />}>
                <ResultBlock
                  chars={chars}
                  errorMessage={listErrorMessage}
                  currentPage={page}
                  currentQuery={query}
                />
              </Suspense>
            </div>
          </div>

          {id && (
            <Suspense fallback={<Loader />}>
              <CardDetailed
                char={char}
                errorMessage={charErrorMessage}
                currentPage={page}
                currentQuery={query}></CardDetailed>
            </Suspense>
          )}
        </section>
        <Flyout />
      </main>
    </>
  );
}
