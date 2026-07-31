'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { localStorageKey, initialPage } from '@/constants/constants';
import buildUrl from '@/utils/buildUrl';

interface UrlInitializerProps {
  hasParams: boolean;
}

export default function UrlInitializer({ hasParams }: UrlInitializerProps): null {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hasParams) {
      try {
        const savedQuery = localStorage.getItem(localStorageKey);

        if (savedQuery && savedQuery.trim()) {
          router.replace({
            pathname,
            query: buildUrl(initialPage, savedQuery.trim()),
          });
        } else {
          router.replace({
            pathname,
            query: buildUrl(initialPage),
          });
        }
      } catch (error) {
        console.error('Failed to read localStorage', error);
      }
    }
  }, [hasParams, router, pathname]);

  return null;
}
