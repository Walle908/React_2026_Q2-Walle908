import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { initialPage, SearchParams } from '@/constants/constants';
import styles from './Pagination.module.css';

interface PaginationProps {
  onChange: (page: number) => void;
  totalPages: number;
}

export default function Pagination({ onChange, totalPages }: PaginationProps): ReactNode {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get(SearchParams.PAGE) || initialPage);

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
