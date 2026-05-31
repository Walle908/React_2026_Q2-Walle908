import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  type MockInstance,
  vi,
} from 'vitest';
import * as apiModule from '@/api/api';
import { ErrorMessage, initialPage, localStorageKey } from '@/constants/constants';
import { ThemeProvider } from '@/contexts/ThemeContextProvider';
import selectedCharactersReducer from '@/store/reducers/selectedCharactersSlice';
import { mockCharacters } from '@/test-utils/mocks';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './HomePage';

vi.mock('../../api/api', () => ({
  getChars: vi.fn(),
}));

describe('HomePage Component', () => {
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

  const createTestStore = (preloadedState = {}) => {
    return configureStore({
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      preloadedState,
      reducer: {
        selectedCharacters: selectedCharactersReducer,
      },
    });
  };

  const renderWithReduxAndRouter = (initialEntries = ['/'], store = createTestStore()) => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route element={<HomePage />} path="/" />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('should render Loader during mount and then show results on successful API response', async () => {
    mockGetChars.mockResolvedValueOnce({ pages: 3, results: mockCharacters });

    renderWithReduxAndRouter();

    const loaderElement = screen.getByTestId('loader-element');

    expect(loaderElement).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('', initialPage, expect.any(AbortSignal));
    });

    expect(loaderElement).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: mockCharacters[0]?.name })
    ).toBeInTheDocument();
  });

  it('should read initial query from localStorage on initialization', async () => {
    localStorage.setItem(localStorageKey, 'Morty');
    mockGetChars.mockResolvedValueOnce({ pages: 0, results: [] });
    const store = createTestStore({
      search: { query: 'Morty' },
    });

    renderWithReduxAndRouter(['/'], store);

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input.value).toBe('Morty');

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Morty', initialPage, expect.any(AbortSignal));
    });
  });

  it('should display NOT_FOUND error message if API returns null', async () => {
    mockGetChars.mockResolvedValueOnce(null);

    renderWithReduxAndRouter();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
      ).toBeInTheDocument();
    });
  });

  it('should display SERVER_ERROR message if API request fails', async () => {
    mockGetChars.mockRejectedValueOnce(new Error(ErrorMessage.SERVER_ERROR));

    renderWithReduxAndRouter();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.SERVER_ERROR })
      ).toBeInTheDocument();
    });
  });

  it('should trigger new search, update localStorage, and handle trimming on form submit', async () => {
    const user = userEvent.setup();

    mockGetChars.mockResolvedValueOnce({ pages: 0, results: [] });

    renderWithReduxAndRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockResolvedValueOnce({ pages: 3, results: mockCharacters });

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   Rick   ');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Rick', initialPage, expect.any(AbortSignal));
    });

    expect(localStorage.getItem(localStorageKey)).toBe('Rick');
  });

  it('should prevent duplicate API requests if query has not changed', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce({ pages: 3, results: mockCharacters });

    renderWithReduxAndRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalled());

    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.click(submitButton);

    expect(mockGetChars).toHaveBeenCalledTimes(1);
  });

  it('should handle empty API response (NOT_FOUND) during manual search submit', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce({ pages: 3, results: mockCharacters });

    renderWithReduxAndRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockResolvedValueOnce(null);

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

  it('should handle API failure (SERVER_ERROR) during manual search submit', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce({ pages: 3, results: mockCharacters });

    renderWithReduxAndRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalledTimes(1));

    mockGetChars.mockRejectedValueOnce(new Error('Server Down'));

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Rick');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: ErrorMessage.SERVER_ERROR })
      ).toBeInTheDocument();
    });
  });

  it('should handle case when localStorage is empty on mount', async () => {
    localStorage.removeItem(localStorageKey);
    mockGetChars.mockResolvedValueOnce(null);

    renderWithReduxAndRouter();

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input.value).toBe('');

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('', initialPage, expect.any(AbortSignal));
    });
  });

  it('should update existing value in localStorage when a new search is performed', async () => {
    const user = userEvent.setup();
    localStorage.setItem(localStorageKey, JSON.stringify('Morty'));
    mockGetChars.mockResolvedValueOnce(null);

    renderWithReduxAndRouter();
    await waitFor(() => expect(mockGetChars).toHaveBeenCalled());

    mockGetChars.mockResolvedValueOnce({ pages: 1, results: mockCharacters });

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'Summer');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('Summer', initialPage, expect.any(AbortSignal));
    });

    expect(localStorage.getItem(localStorageKey)).toBe('Summer');
  });

  it('should change page and update URL when handlePageChange is triggered via Pagination', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce({ pages: 5, results: mockCharacters });

    renderWithReduxAndRouter();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    mockGetChars.mockResolvedValueOnce({ pages: 5, results: mockCharacters });

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledWith('', 2, expect.any(AbortSignal));
    });
  });

  it('should ignore page changes if clicked faster than the allowed Delay threshold', async () => {
    const user = userEvent.setup();
    mockGetChars.mockResolvedValueOnce({ pages: 5, results: mockCharacters });

    renderWithReduxAndRouter();
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument());

    mockGetChars.mockClear();
    const nextButton = screen.getByRole('button', { name: /next/i });

    user.click(nextButton);
    user.click(nextButton);

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledTimes(1);
    });
  });
});
