import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from './SearchSection';

describe('SearchSection Component', () => {
  it('should render the title and form correctly', () => {
    const mockOnSearch = vi.fn();

    render(<SearchSection initialValue="Morty" onSearch={mockOnSearch} />);

    const titleElement = screen.getByRole('heading', { level: 1, name: /rick and morty/i });
    expect(titleElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('Morty');
  });

  it('should bubble up the search event from SearchForm to parent', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchSection initialValue="" onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(inputElement, 'Rick');
    await user.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
