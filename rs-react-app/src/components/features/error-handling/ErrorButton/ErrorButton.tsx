'use client';

import { type ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { ErrorMessage } from '@/constants/constants';

interface ErrorButtonProps {
  className?: string;
}

export function ErrorButton({ className }: ErrorButtonProps): ReactNode {
  const t = useTranslations('App');

  const [, setError] = useState(false);
  const onClick = () => {
    setError(() => {
      throw new Error(ErrorMessage.BOUNDARY_ERROR);
    });
  };

  return (
    <Button color="error" onClick={onClick} className={className}>
      {t('generateError')}
    </Button>
  );
}
