import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type MockInstance,
  type Mock,
} from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router';
import Page from './Page';
import { localStorageKey, initialPage } from '../../../constants/constants';
import { ErrorMessage } from '../../../constants/constants';
import { mockCharacters } from '../../../__tests__/mocks';
import * as apiModule from '../../../api/api';

vi.mock('../../api/api', () => ({
  getChars: vi.fn(),
}));

describe('Page Component', () => {
  let mockGetChars: Mock;
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockGetChars = vi.spyOn(apiModule, 'getChars');
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const renderWithRouter = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<Page />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('should render Loader during mount and then show results on successful API response', async () => {
    mockGetChars.mockResolvedValueOnce({ results: mockCharacters, pages: 3 });

    const { container } = renderWithRouter();

    expect(container.querySelector('.loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('', initialPage, expect.any(AbortSignal));
    });

    expect(container.querySelector('.loader')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: mockCharacters[0]?.name })
    ).toBeInTheDocument();
  });

  it('should read initial query from localStorage on initialization', async () => {
    localStorage.setItem(localStorageKey, JSON.stringify('Morty'));
    mockGetChars.mockResolvedValueOnce({ results: [], pages: 0 });

    renderWithRouter();

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input.value).toBe('Morty');

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Morty', initialPage, expect.any(AbortSignal));
    });
  });

  it('should display NOT_FOUND error message if API returns an empty array', async () => {
    mockGetChars.mockResolvedValueOnce({ results: [], pages: 0 });

    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
      ).toBeInTheDocument();
    });
  });

  it('should display ANOTHER_ERROR message if API request fails', async () => {
    mockGetChars.mockRejectedValueOnce(new Error('Server error'));

    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.ANOTHER_ERROR })
      ).toBeInTheDocument();
    });
  });

  it('should trigger new search, update localStorage, and handle trimming on form submit', async () => {
    const user = userEvent.setup();

    mockGetChars.mockResolvedValueOnce({ results: [], pages: 0 });

    renderWithRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockResolvedValueOnce({ results: mockCharacters, pages: 3 });

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   Rick   ');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Rick', initialPage, expect.any(AbortSignal));
    });

    expect(localStorage.getItem(localStorageKey)).toBe(JSON.stringify('Rick'));
  });

  it('should prevent duplicate API requests if query has not changed', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce({ results: mockCharacters, pages: 3 });

    renderWithRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalled());

    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.click(submitButton);

    expect(mockGetChars).toHaveBeenCalledTimes(1);
  });

  it('should handle empty API response (NOT_FOUND) during manual search submit', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce({ results: mockCharacters, pages: 3 });

    renderWithRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockResolvedValueOnce({ results: [], pages: 0 });

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
    mockGetChars.mockResolvedValueOnce({ results: mockCharacters, pages: 3 });

    renderWithRouter();
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

  it('should handle case when localStorage is empty on mount', async () => {
    localStorage.removeItem(localStorageKey);
    mockGetChars.mockResolvedValueOnce({ results: [], pages: 0 });

    renderWithRouter();

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input.value).toBe('');

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('', initialPage, expect.any(AbortSignal));
    });
  });

  it('should update existing value in localStorage when a new search is performed', async () => {
    const user = userEvent.setup();
    localStorage.setItem(localStorageKey, 'Morty');
    mockGetChars.mockResolvedValueOnce({ results: [], pages: 0 });

    renderWithRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalled());

    mockGetChars.mockResolvedValueOnce({ results: mockCharacters, pages: 1 });

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'Summer');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Summer', initialPage, expect.any(AbortSignal));
    });

    expect(localStorage.getItem(localStorageKey)).toBe(JSON.stringify('Summer'));
  });
});
