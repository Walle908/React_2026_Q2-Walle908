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
import { ErrorMessage, initialPage, localStorageKey } from '@/constants/constants';
import { ThemeProvider } from '@/contexts/ThemeContextProvider';
import { apiSlice, useGetCharsQuery } from '@/services/apiSlice';
import selectedCharactersReducer from '@/store/reducers/selectedCharactersSlice';
import { mockCharacters } from '@/test-utils/mocks';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './HomePage';

vi.mock('@/services/apiSlice', () => ({
  apiSlice: {
    middleware: () => (next: (action: unknown) => unknown) => (action: unknown) => next(action),
    reducer: (state = {}) => state,
    reducerPath: 'apiSlice',
    util: {
      invalidateTags: vi.fn((tags) => ({ payload: tags, type: 'api/invalidateTags' })),
    },
  },
  useGetCharsQuery: vi.fn(),
}));

const mockedUseGetCharsQuery = useGetCharsQuery as unknown as Mock;

describe('HomePage Component', () => {
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const createTestStore = (preloadedState = {}) => {
    return configureStore({
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }).concat(apiSlice.middleware as unknown as import('@reduxjs/toolkit').Middleware),
      preloadedState,
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
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
    mockedUseGetCharsQuery.mockReturnValue({
      data: { info: { pages: 3 }, results: mockCharacters },
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter();

    expect(mockedUseGetCharsQuery).toHaveBeenCalledWith(
      { page: initialPage, query: '' },
      { refetchOnMountOrArgChange: false }
    );

    expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: mockCharacters[0]?.name })
    ).toBeInTheDocument();
  });

  it('should read initial query from localStorage on initialization', async () => {
    localStorage.setItem(localStorageKey, JSON.stringify('Morty'));

    mockedUseGetCharsQuery.mockReturnValue({
      data: { info: { pages: 0 }, results: [] },
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter();

    const input = screen.getByPlaceholderText('Search a character...') as HTMLInputElement;
    expect(input.value).toBe('Morty');

    await waitFor(() => {
      expect(mockedUseGetCharsQuery).toHaveBeenCalledWith(
        { page: initialPage, query: 'Morty' },
        { refetchOnMountOrArgChange: false }
      );
    });
  });

  it('should display NOT_FOUND error message if API returns 404', async () => {
    mockedUseGetCharsQuery.mockReturnValue({
      data: undefined,
      error: { data: { error: 'There is nothing here' }, status: 404 },
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter();

    expect(
      screen.getByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
    ).toBeInTheDocument();
  });

  it('should display SERVER_ERROR message if API request fails', async () => {
    mockedUseGetCharsQuery.mockReturnValue({
      data: undefined,
      error: { status: 500 },
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter();

    expect(
      screen.getByRole('heading', { level: 2, name: ErrorMessage.SERVER_ERROR })
    ).toBeInTheDocument();
  });

  it('should trigger new search, update localStorage, and handle trimming on form submit', async () => {
    const user = userEvent.setup();

    mockedUseGetCharsQuery.mockReturnValue({
      data: { info: { pages: 0 }, results: [] },
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter();

    const input = screen.getByPlaceholderText('Search a character...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   Rick   ');
    await user.click(submitButton);

    expect(localStorage.getItem(localStorageKey)).toBe(JSON.stringify('Rick'));
  });

  it('should prevent duplicate API requests if query has not changed', async () => {
    const user = userEvent.setup();

    mockedUseGetCharsQuery.mockReturnValue({
      data: { info: { pages: 3 }, results: mockCharacters },
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter();

    const submitButton = await screen.getByRole('button', { name: /search/i });
    const initialCallCount = mockedUseGetCharsQuery.mock.calls.length;

    await user.click(submitButton);

    expect(mockedUseGetCharsQuery).toHaveBeenCalledTimes(initialCallCount);
  });

  it('should dispatch invalidateTags action when Refresh button is clicked', () => {
    const store = createTestStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    mockedUseGetCharsQuery.mockReturnValue({
      data: { info: { pages: 3 }, results: mockCharacters },
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter(['/'], store);

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(apiSlice.util.invalidateTags).toHaveBeenCalledWith([
      { id: 'LIST', type: 'Character' },
      { type: 'Character' },
    ]);
  });

  it('should change page and update URL when handlePageChange is triggered via Pagination', async () => {
    const user = userEvent.setup();

    mockedUseGetCharsQuery.mockReturnValue({
      data: { info: { pages: 5 }, results: mockCharacters },
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter();

    const nextButton = await screen.findByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();

    await user.click(nextButton);

    await waitFor(() => {
      expect(mockedUseGetCharsQuery).toHaveBeenCalledWith(
        { page: 2, query: '' },
        { refetchOnMountOrArgChange: false }
      );
    });
  });

  it('should ignore page changes if clicked faster than the allowed Delay threshold', async () => {
    const user = userEvent.setup();

    mockedUseGetCharsQuery.mockReturnValue({
      data: { info: { pages: 5 }, results: mockCharacters },
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithReduxAndRouter();

    const nextButton = await screen.findByRole('button', { name: /next/i });

    mockedUseGetCharsQuery.mockClear();

    await user.click(nextButton);
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockedUseGetCharsQuery).toHaveBeenCalledTimes(1);
    });
  });
});
