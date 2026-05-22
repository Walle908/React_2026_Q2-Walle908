import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import { mockCharacter, emptyMockCharacter } from '../../__tests__/mocks';

describe('Card Component', () => {
  it('should render character details correctly when all data is provided', () => {
    render(<Card char={mockCharacter} />);

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockCharacter.image);
    expect(image.alt).toBe(mockCharacter.name);

    const title = screen.getByRole('heading', { level: 2, name: 'Amish Cyborg' });
    expect(title).toBeInTheDocument();

    expect(screen.getByText('Dead')).toBeInTheDocument();
    expect(screen.getByText('Alien')).toBeInTheDocument();
    expect(screen.getByText('Parasite')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
    expect(screen.getByText('Earth (Replacement Dimension)')).toBeInTheDocument();
  });

  it('should display "n/a" fallback text when properties are empty strings or missing', () => {
    render(<Card char={emptyMockCharacter} />);

    expect(screen.getByRole('heading', { level: 2, name: 'n/a' })).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item) => {
      expect(item.textContent).toContain('n/a');
    });
  });
});
