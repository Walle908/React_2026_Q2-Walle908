import { type ReactNode } from 'react';
import Page from './components/Pages/Page/Page';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <Page />
    </ErrorBoundary>
  );
}
