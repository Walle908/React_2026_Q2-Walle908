'use client';

import { type ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button/Button';
import { ErrorMessage } from '@/constants/constants';

export default function ErrorButton(): ReactNode {
  const t = useTranslations('App');

  const [isError, setError] = useState(false);

  const onClick = () => {
    setError(true);
  };

  if (isError) {
    throw new Error(ErrorMessage.BOUNDARY_ERROR);
  }

  return (
    <Button color="error" onClick={onClick}>
      {t('generateError')}
    </Button>
  );
}
