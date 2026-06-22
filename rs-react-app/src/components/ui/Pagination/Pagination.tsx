'use client';

import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
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

  const onChange = (page: number) => {
    router.push(buildUrl(page, currentQuery), { scroll: false });
  };

  return (
    <div className={styles.paginationWrapper}>
      <Button disabled={currentPage === initialPage} onClick={() => onChange(currentPage - 1)}>
        Prev
      </Button>
      <Text size="md" weight="medium">{`Page ${currentPage} of ${totalPages}`}</Text>
      <Button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onChange(currentPage + 1)}>
        Next
      </Button>
    </div>
  );
}
