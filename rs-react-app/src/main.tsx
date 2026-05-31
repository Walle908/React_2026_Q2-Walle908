import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import ErrorBoundary from '@/components/features/error-handling/ErrorBoundary/ErrorBoundary';
import { router } from '@/router/router';
import { ThemeProvider } from './contexts/ThemeContextProvider';
import { store } from './store/store';
import './index.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}
