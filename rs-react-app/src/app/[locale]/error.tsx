'use client';

import { useEffect } from 'react';
import { Button, Text } from '@/components/ui';
import { ErrorMessage } from '@/constants/constants';
import { useTranslations } from 'next-intl';
import styles from '@/styles/error.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Uncaught error:', error);
  }, [error]);

  const t = useTranslations('App');

  return (
    <div className={styles.errorBlock}>
      <Text as="h1" color="error" size="xl">
        {t(ErrorMessage.BOUNDARY_ERROR)}
      </Text>

      <Button className={styles.resetButton} onClick={() => reset()}>
        {t('resetError')}
      </Button>
    </div>
  );
}
