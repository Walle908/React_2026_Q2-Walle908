import { type ReactNode } from 'react';
import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { initialPage } from '@/constants/constants';
import styles from './Pagination.module.css';

interface PaginationProps {
  onChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  onChange,
  currentPage,
  totalPages,
}: PaginationProps): ReactNode {
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
