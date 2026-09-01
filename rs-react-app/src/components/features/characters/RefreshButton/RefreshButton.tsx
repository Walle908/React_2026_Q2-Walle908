'use client';

import { useTransition } from 'react';
import { refreshData } from '@/actions/refresh';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button/Button';

export default function RefreshButton() {
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      await refreshData();
    });
  };

  const t = useTranslations('App');

  return (
    <Button color={'accent'} onClick={handleRefresh} disabled={isPending}>
      {isPending ? t('updating') : t('refresh')}
    </Button>
  );
}
