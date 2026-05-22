import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
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
      <button
        className="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === initialPage}>
        Prev
      </button>
      <p className={styles.paginationText}>{`Page ${currentPage} of ${totalPages}`}</p>
      <button
        className="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}>
        Next
      </button>
    </div>
  );
}
