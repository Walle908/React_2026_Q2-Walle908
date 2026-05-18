import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import Card from './Card';
import { SearchParams } from '../../constants/constants';
import { mockCharacter, emptyMockCharacter } from '../../__tests__/mocks';

describe('Card Component', () => {
  it('should render character details correctly when all data is provided', () => {
    render(
      <MemoryRouter>
        <Card char={mockCharacter} />
      </MemoryRouter>
    );

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockCharacter.image);
    expect(image.alt).toBe(mockCharacter.name);

    const title = screen.getByRole('heading', { level: 2, name: mockCharacter.name });
    expect(title).toBeInTheDocument();
  });

  it('should display "n/a" fallback text when character name is empty', () => {
    render(
      <MemoryRouter>
        <Card char={emptyMockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'n/a' })).toBeInTheDocument();
  });

  it('should construct correct URL preserving existing search params', () => {
    render(
      <MemoryRouter initialEntries={[`/?${SearchParams.PAGE}=3`]}>
        <Card char={mockCharacter} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link).toBeInTheDocument();

    const expectedHref = `/?${SearchParams.PAGE}=3&${SearchParams.DETAILS}=${mockCharacter.id}`;
    expect(link.getAttribute('to') || link.getAttribute('href')).toContain(expectedHref);
  });
});
