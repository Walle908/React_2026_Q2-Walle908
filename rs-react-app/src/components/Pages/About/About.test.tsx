import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import AboutPage from './About';

describe('AboutPage Component', () => {
  it('should render author information and link to RS School React course', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { level: 1, name: /about app/i });
    expect(title).toBeInTheDocument();

    expect(screen.getByText(/author:/i)).toBeInTheDocument();
    const authorLink = screen.getByRole('link', { name: /elena valiullina/i }) as HTMLAnchorElement;
    expect(authorLink).toBeInTheDocument();
    expect(authorLink.href).toBe('https://github.com/Walle908');

    expect(screen.getByText(/link to the course:/i)).toBeInTheDocument();
    const courseLink = screen.getByRole('link', {
      name: /rs school react course/i,
    }) as HTMLAnchorElement;
    expect(courseLink).toBeInTheDocument();
    expect(courseLink.href).toBe('https://rs.school/courses/reactjs');
  });

  it('should provide a navigation link to return to the main application', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const backToMainLink = screen.getByRole('link', {
      name: /go to main page/i,
    }) as HTMLAnchorElement;
    expect(backToMainLink).toBeInTheDocument();

    expect(backToMainLink.getAttribute('href')).toBe('/');

    const buttonElement = screen.getByRole('button', { name: /go to main page/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
