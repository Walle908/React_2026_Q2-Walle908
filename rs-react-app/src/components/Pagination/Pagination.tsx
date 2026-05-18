import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { initialPage, SearchParams } from '../../constants/constants';
import './Pagination.css';

interface PaginationProps {
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ totalPages, onChange }: PaginationProps): ReactNode {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get(SearchParams.PAGE) || initialPage);

  return (
    <div className="pagination-wrapper">
      <button
        className="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === initialPage}>
        Prev
      </button>
      <p className="pagination-text">{`Page ${currentPage} of ${totalPages}`}</p>
      <button
        className="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}>
        Next
      </button>
    </div>
  );
}
