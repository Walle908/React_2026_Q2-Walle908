import { type ReactNode, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import { ErrorMessage } from '@/constants/constants';
import styles from './ErrorButton.module.css';

export default function ErrorButton(): ReactNode {
  const [isError, setError] = useState(false);

  const onClick = () => {
    setError(true);
  };

  if (isError) {
    throw new Error(ErrorMessage.BOUNDARY_ERROR);
  }

  return (
    <Button className={styles.errorButton} onClick={onClick}>
      Generate Error
    </Button>
  );
}
