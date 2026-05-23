import { type ReactNode } from 'react';
import HomePage from './components/Pages/HomePage/HomePage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}
