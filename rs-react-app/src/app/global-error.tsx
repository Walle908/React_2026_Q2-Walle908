// src/app/global-error.tsx
'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { ErrorMessage } from '@/constants/constants';
import styles from '@/styles/error.module.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Uncaught critical error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className={styles.errorBlock}>
          <Text as="h1" color="error" size="xl">
            {ErrorMessage.BOUNDARY_ERROR}
          </Text>
          <Button className={styles.resetButton} onClick={() => reset()}>
            Reset error
          </Button>
        </div>
      </body>
    </html>
  );
}
