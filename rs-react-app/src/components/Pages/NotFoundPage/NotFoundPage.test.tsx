import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage Component', () => {
  it('should render 404 error messages clearly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const errorTitle = screen.getByRole('heading', { level: 2, name: /error 404/i });
    const notFoundTitle = screen.getByRole('heading', { level: 2, name: /page not found/i });

    expect(errorTitle).toBeInTheDocument();
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('should provide a navigation option to return to the main app', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    // Находим ссылку Link (в DOM она превращается в тег <a>)
    const linkElement = screen.getByRole('link') as HTMLAnchorElement;
    expect(linkElement).toBeInTheDocument();

    expect(linkElement.getAttribute('href')).toBe('/');

    const buttonElement = screen.getByRole('button', { name: /go to main page/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
