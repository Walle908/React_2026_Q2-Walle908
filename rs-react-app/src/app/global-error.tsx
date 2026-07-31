'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { ErrorMessage } from '@/constants/constants';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import ruMessages from '../../messages/ru.json';
import enMessages from '../../messages/en.json';
import styles from '@/styles/error.module.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorContent({ reset }: Omit<GlobalErrorProps, 'error'>) {
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

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Uncaught critical error:', error);
  }, [error]);

  let currentLocale = 'ru';
  if (typeof window !== 'undefined') {
    const segments = window.location.pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'ru') {
      currentLocale = segments[1];
    }
  }

  const messages = currentLocale === 'en' ? enMessages : ruMessages;

  return (
    <html lang={currentLocale}>
      <body>
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <ErrorContent reset={reset} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
