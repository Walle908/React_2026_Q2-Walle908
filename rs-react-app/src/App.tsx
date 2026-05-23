import { type ReactNode } from 'react';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import HomePage from '@components/Pages/HomePage/HomePage';

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}
