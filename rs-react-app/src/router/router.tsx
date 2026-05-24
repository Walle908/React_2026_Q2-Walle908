import { createBrowserRouter } from 'react-router';
import CardDetailed from '@/components/features/characters/CardDetailed/CardDetailed.tsx';
import AboutPage from '@/pages/AboutPage/AboutPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.tsx';
import App from '../App.tsx';

export const router = createBrowserRouter(
  [
    {
      children: [
        {
          element: <CardDetailed />,
          path: '',
        },
      ],
      element: <App />,
      errorElement: <NotFoundPage />,
      path: '/',
    },
    { element: <NotFoundPage />, path: '*' },
    { element: <AboutPage />, path: 'about' },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
