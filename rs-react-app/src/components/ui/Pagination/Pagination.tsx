'use client';

import { type ReactNode } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import buildUrl from '@/utils/buildUrl';
import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { initialPage } from '@/constants/constants';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  currentQuery: string;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  currentQuery,
  totalPages,
}: PaginationProps): ReactNode {
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (page: number) => {
    const queryObj = buildUrl(page, currentQuery);
    router.push({ pathname, query: queryObj }, { scroll: false });
  };

  const t = useTranslations('Pagination');

  return (
    <div className={styles.paginationWrapper}>
      <Button disabled={currentPage === initialPage} onClick={() => onChange(currentPage - 1)}>
        {t('prev')}
      </Button>
      <Text size="md" weight="medium">
        {t('page')} {currentPage} {t('of')} {totalPages}
      </Text>
      <Button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onChange(currentPage + 1)}>
        {t('next')}
      </Button>
    </div>
  );
}
