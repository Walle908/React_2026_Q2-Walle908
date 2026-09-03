'use client';

import { type ReactNode } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import buildUrl from '@/utils/buildUrl';
import { Text, LinkComponent } from '@/components/ui';
import { initialPage } from '@/constants/constants';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  currentQuery: string;
  totalPages: number;
  currentDetails?: string | null;
}

export function Pagination({
  currentPage,
  currentQuery,
  totalPages,
  currentDetails = null,
}: PaginationProps): ReactNode {
  const pathname = usePathname();
  const t = useTranslations('Pagination');

  const isPrevDisabled = currentPage === initialPage;
  const isNextDisabled = currentPage === totalPages || totalPages === 0;

  const prevQueryObj = buildUrl(currentPage - 1, currentQuery, currentDetails);
  const nextQueryObj = buildUrl(currentPage + 1, currentQuery, currentDetails);

  return (
    <div className={styles.paginationWrapper}>
      <LinkComponent
        variant="button"
        href={isPrevDisabled ? '#' : { pathname, query: prevQueryObj }}
        scroll={false}
        aria-disabled={isPrevDisabled}>
        {t('prev')}
      </LinkComponent>

      <Text size="sm" weight="medium">
        {t('page')} {currentPage} {t('of')} {totalPages}
      </Text>

      <LinkComponent
        variant="button"
        href={isNextDisabled ? '#' : { pathname, query: nextQueryObj }}
        scroll={false}
        aria-disabled={isNextDisabled}>
        {t('next')}
      </LinkComponent>
    </div>
  );
}
