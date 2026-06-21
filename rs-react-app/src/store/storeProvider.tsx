'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { type AppStore, makeStore } from '../store/store.ts';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
