'use client';

import { ThemeProvider } from '@/contexts/ThemeContextProvider';
import StoreProvider from '@/store/storeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
}
