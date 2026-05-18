import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import Page from './Page';
import { getChars } from '../../../api/api';
import { localStorageKey } from '../../../constants/constants';
import { ErrorMessage } from '../../../constants/constants';
import { mockCharacters } from '../../../__tests__/mocks';

vi.mock('../../api/api', () => ({
  getChars: vi.fn(),
}));

describe('Page Component', () => {
  const mockGetChars = vi.mocked(getChars);
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render Loader during mount and then show results on successful API response', async () => {
    mockGetChars.mockResolvedValueOnce(mockCharacters);

    const { container } = render(<Page />);

    expect(container.querySelector('.loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledTimes(1);
    });

    expect(container.querySelector('.loader')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Rick Sanchez' })).toBeInTheDocument();
  });

  it('should read initial query from localStorage on initialization', async () => {
    localStorage.setItem(localStorageKey, 'Morty');
    mockGetChars.mockResolvedValueOnce([]);

    render(<Page />);

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input.value).toBe('Morty');

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Morty');
    });
  });

  it('should display NOT_FOUND error message if API returns an empty array', async () => {
    mockGetChars.mockResolvedValueOnce([]);

    render(<Page />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
      ).toBeInTheDocument();
    });
  });

  it('should display ANOTHER_ERROR message if API request fails', async () => {
    mockGetChars.mockRejectedValueOnce(new Error('Server error'));

    render(<Page />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.ANOTHER_ERROR })
      ).toBeInTheDocument();
    });
  });

  it('should trigger new search, update localStorage, and handle trimming on form submit', async () => {
    const user = userEvent.setup();

    mockGetChars.mockResolvedValueOnce([]);

    render(<Page />);
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockResolvedValueOnce(mockCharacters);

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   Rick   ');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Rick');
    });

    expect(localStorage.getItem(localStorageKey)).toBe('Rick');
  });

  it('should prevent duplicate API requests if query has not changed', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce(mockCharacters);

    render(<Page />);
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.click(submitButton);

    expect(mockGetChars).toHaveBeenCalledTimes(1);
  });

  it('should handle empty API response (NOT_FOUND) during manual search submit', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce(mockCharacters);
    render(<Page />);
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockResolvedValueOnce([]);

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'No Character');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
      ).toBeInTheDocument();
    });
  });

  it('should handle API failure (ANOTHER_ERROR) during manual search submit', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce(mockCharacters);
    render(<Page />);
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockRejectedValueOnce(new Error('Server Down'));

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Rick');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.ANOTHER_ERROR })
      ).toBeInTheDocument();
    });
  });

  it('should not trigger initial fetch again if already loading / mounted', async () => {
    mockGetChars.mockResolvedValueOnce([]);

    const { rerender } = render(<Page />);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledTimes(1);
    });

    mockGetChars.mockClear();
    rerender(<Page />);

    expect(mockGetChars).not.toHaveBeenCalled();
  });

  it('should handle case when localStorage is empty on mount', async () => {
    localStorage.removeItem(localStorageKey);
    mockGetChars.mockResolvedValueOnce([]);

    render(<Page />);

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input.value).toBe('');

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('');
    });
  });

  it('should update existing value in localStorage when a new search is performed', async () => {
    const user = userEvent.setup();
    localStorage.setItem(localStorageKey, 'Morty');
    mockGetChars.mockResolvedValueOnce([]);

    render(<Page />);
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockResolvedValueOnce(mockCharacters);

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'Summer');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Summer');
    });

    expect(localStorage.getItem(localStorageKey)).toBe('Summer');
  });
});
