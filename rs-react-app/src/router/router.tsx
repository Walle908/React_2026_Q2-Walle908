import { createBrowserRouter } from 'react-router';
import App from '../App.tsx';
import NotFoundPage from '../components/Pages/NotFoundPage/NotFoundPage.tsx';
import CardDetailed from '../components/CardDetailed/CardDetailed.tsx';
import AboutPage from '../components/Pages/About/About.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <CardDetailed />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
  { path: 'about', element: <AboutPage /> },
]);
