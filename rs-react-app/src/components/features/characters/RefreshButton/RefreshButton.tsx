'use client';

import { useTransition } from 'react';
import { refreshData } from '@/app/actions';
import Button from '@/components/ui/Button/Button';

export default function RefreshButton() {
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      await refreshData();
    });
  };

  return (
    <Button color={'accent'} onClick={handleRefresh} disabled={isPending}>
      {isPending ? 'Updating...' : 'Refresh'}
    </Button>
  );
}
