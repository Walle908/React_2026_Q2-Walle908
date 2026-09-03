import { Suspense, type ReactNode } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getChars, getOneChar } from '@/services/api';
import { Pagination, Loader, Text } from '@/components/ui';
import { RefreshButton, ResultBlock, CardDetailed, Flyout } from '@/components/features/characters';
import { SearchForm, UrlInitializer } from '@/components/features/search';
import { ErrorButton } from '@/components/features/error-handling';
import { initialPage, ErrorMessage } from '@/constants/constants';
import mapError from '@/utils/mapError';
import { searchAction } from '../../actions/search';
import styles from '@/styles/app.module.css';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    query?: string;
    details?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps): Promise<ReactNode> {
  const parsePage = (raw?: string): number => {
    const page = parseInt(raw ?? '', 10);

    return Number.isInteger(page) && page >= initialPage ? page : initialPage;
  };

  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('App');

  const sParams = await searchParams;
  const hasParams = Object.keys(sParams).length > 0;

  const page = parsePage(sParams.page);
  const query = sParams.query ?? '';
  const id = sParams.details ?? null;

  const [listResult, detailResult] = await Promise.all([
    getChars(query, page),
    id ? getOneChar(id) : Promise.resolve({ data: null, error: null }),
  ]);

  const chars = listResult?.data?.results ?? [];
  const totalPages = listResult?.data?.pages ?? 0;
  const listErrorMessage = t(mapError(listResult?.error));

  const char = detailResult?.data ?? null;
  const charErrorMessage = t(mapError(detailResult?.error));

  const showPagination = chars.length > 0 && listErrorMessage === t(ErrorMessage.NO_ERROR);

  return (
    <>
      <UrlInitializer hasParams={hasParams} />

      <Text as="h1" className={styles.mainTitle} color="accent" size="xxl">
        {t('mainTitle')}
      </Text>
      <SearchForm initialValue={query} searchAction={searchAction.bind(null, locale)} />
      <section className={styles.mainWrapper}>
        <div className={`${styles.leftPanel} ${id ? styles.split : ''}`} data-testid="left-panel">
          <div className={styles.resultsWrapper}>
            {showPagination && (
              <div className={styles.rowWrapper}>
                <Pagination
                  currentQuery={query}
                  currentPage={page}
                  totalPages={totalPages}
                  currentDetails={id}
                />
                <RefreshButton />
              </div>
            )}
            <ErrorButton />
            <Suspense key={`${page}:${query}`} fallback={<Loader />}>
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
    </>
  );
}
