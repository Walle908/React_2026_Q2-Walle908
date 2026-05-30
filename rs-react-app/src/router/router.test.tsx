import { type MemoryRouterOpts, type RouteObject, RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,

    createBrowserRouter: (routes: RouteObject[], opts?: MemoryRouterOpts) =>
      actual.createMemoryRouter(routes, opts),
  };
});

vi.mock('../pages/HomePage/HomePage.tsx', () => ({
  default: () => <div data-testid="home-page">Home page Layout</div>,
}));
vi.mock('../pages/NotFoundPage/NotFoundPage.tsx', () => ({
  default: () => <div>Page not found</div>,
}));
vi.mock('../pages/About/About.tsx', () => ({
  default: () => <div>About App</div>,
}));
vi.mock('../components/CardDetailed/CardDetailed.tsx', () => ({
  default: () => <div data-testid="card-detailed">Card Detailed</div>,
}));

import { router } from './router';

describe('Router Configuration', () => {
  it('should render HomePage on the root route "/"', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('should render AboutPage when navigating to "/about"', async () => {
    await router.navigate('/about');

    render(<RouterProvider router={router} />);

    expect(screen.getByText('About App')).toBeInTheDocument();
  });

  it('should render NotFoundPage when navigating to an unknown route', async () => {
    await router.navigate('/some-random-broken-link/123');

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
