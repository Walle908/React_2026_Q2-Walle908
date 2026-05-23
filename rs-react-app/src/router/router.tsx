import { createBrowserRouter } from 'react-router';
import CardDetailed from '@components/CardDetailed/CardDetailed.tsx';
import AboutPage from '@components/Pages/AboutPage/AboutPage.tsx';
import NotFoundPage from '@components/Pages/NotFoundPage/NotFoundPage.tsx';
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
