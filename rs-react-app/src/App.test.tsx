import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { getChars } from '@/api/api';
import characterReducer from '@/store/reducers/charactersSlice';
import searchReducer from '@/store/reducers/searchSlice';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContextProvider';

vi.mock('./api/api', () => ({
  getChars: vi.fn(),
}));

describe('App Component', () => {
  const mockGetChars = getChars as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  const createTestStore = () => {
    return configureStore({
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      reducer: {
        characters: characterReducer,
        search: searchReducer,
        // Если во Flyout или других компонентах используются другие слайсы, добавьте их сюда:
        selectedCharacters: () => ({ selectedChars: [] }),
      },
    });
  };

  it('should render the entire application layout successfully', async () => {
    mockGetChars.mockResolvedValueOnce({ pages: 0, results: [] });

    render(
      <Provider store={createTestStore()}>
        <ThemeProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    const mainTitle = screen.getByRole('heading', { level: 1, name: /rick and morty/i });
    expect(mainTitle).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search a character...');
    expect(searchInput).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledTimes(1);
    });
  });
});
