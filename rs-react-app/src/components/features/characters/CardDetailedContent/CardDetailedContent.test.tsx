import { beforeEach, describe, expect, it, vi } from 'vitest';
import { emptyMockCharacter, mockCharacter } from '@/test-utils/mocks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardDetailsContent from './CardDetailedContent';

describe('CardDetailedContent Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should render character details correctly when all data is provided', () => {
    render(<CardDetailsContent character={mockCharacter} onClose={mockOnClose} />);

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockCharacter.image);
    expect(image.alt).toBe(mockCharacter.name);

    const title = screen.getByRole('heading', { level: 2, name: mockCharacter.name });
    expect(title).toBeInTheDocument();

    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.type)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.origin.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  });

  it('should display "n/a" fallback text when properties are empty strings or missing', () => {
    render(<CardDetailsContent character={emptyMockCharacter} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { level: 2, name: 'n/a' })).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item) => {
      expect(item.textContent).toContain('n/a');
    });
  });

  it('should call the onClose function when the Close button is clicked', async () => {
    render(<CardDetailsContent character={mockCharacter} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });

    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
