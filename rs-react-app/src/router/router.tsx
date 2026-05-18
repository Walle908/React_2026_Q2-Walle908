import { createBrowserRouter } from 'react-router';
import App from '../App.tsx';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage.tsx';
import CardDetailed from '../components/CardDetailed/CardDetailed.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'character/:id',
        element: <CardDetailed />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
