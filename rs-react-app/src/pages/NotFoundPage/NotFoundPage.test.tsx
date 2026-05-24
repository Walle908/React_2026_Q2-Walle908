import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage Component', () => {
  it('should render 404 error messages clearly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const errorTitle = screen.getByText(/error 404/i);
    const notFoundTitle = screen.getByRole('heading', { level: 1, name: /page not found/i });

    expect(errorTitle).toBeInTheDocument();
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('should provide a navigation option to return to the main app', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link') as HTMLAnchorElement;
    expect(linkElement).toBeInTheDocument();

    expect(linkElement.getAttribute('href')).toBe('/');
  });
});
