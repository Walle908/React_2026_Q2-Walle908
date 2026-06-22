'use client';

import { ThemeProvider } from '@/contexts/ThemeContextProvider';
import StoreProvider from '@/store/StoreProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
}
