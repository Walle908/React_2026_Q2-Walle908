import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './router/router';
import { RouterProvider } from 'react-router';
import './index.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
