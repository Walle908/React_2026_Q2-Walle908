import { type ReactNode } from 'react';
import ErrorBoundary from '@/components/features/error-handling/ErrorBoundary/ErrorBoundary';
import HomePage from '@/pages/HomePage/HomePage';

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}
