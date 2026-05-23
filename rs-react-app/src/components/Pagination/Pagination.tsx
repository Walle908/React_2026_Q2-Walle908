import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '../Button/Button';
import { initialPage, SearchParams } from '../../constants/constants';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ totalPages, onChange }: PaginationProps): ReactNode {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get(SearchParams.PAGE) || initialPage);

  return (
    <div className={styles.paginationWrapper}>
      <Button onClick={() => onChange(currentPage - 1)} disabled={currentPage === initialPage}>
        Prev
      </Button>
      <p className={styles.paginationText}>{`Page ${currentPage} of ${totalPages}`}</p>
      <Button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}>
        Next
      </Button>
    </div>
  );
}
