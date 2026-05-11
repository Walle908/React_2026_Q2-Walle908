import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchForm from './SearchForm';

describe('SearchForm Component', () => {
  const mockOnSearch = vi.fn();

  it('should render correctly with the initial value', () => {
    render(<SearchForm onSearch={mockOnSearch} initialValue="Rick" />);

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Rick');

    const clearButton = screen.getByRole('button', { name: '✖' });
    expect(clearButton).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Search' });
    expect(submitButton).toBeInTheDocument();
  });

  it('should not show clear button if field is empty', () => {
    render(<SearchForm onSearch={mockOnSearch} initialValue="" />);

    const clearButton = screen.queryByRole('button', { name: '✖' });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should change the value when entering text', async () => {
    render(<SearchForm onSearch={mockOnSearch} initialValue="" />);
    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;

    await userEvent.type(input, 'Morty');

    expect(input.value).toBe('Morty');
  });

  it('should clear the field when the clear button is clicked', async () => {
    render(<SearchForm onSearch={mockOnSearch} initialValue="Rick" />);
    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    const clearButton = screen.getByRole('button', { name: '✖' });

    await userEvent.click(clearButton);

    expect(input.value).toBe('');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should call onSearch with spaces trimmed when submitting the form', async () => {
    render(<SearchForm onSearch={mockOnSearch} initialValue="  Morty  " />);
    const submitButton = screen.getByRole('button', { name: 'Search' });

    await userEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Morty');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input.value).toBe('Morty');
  });
});
