import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { getChars } from '@api/api';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

vi.mock('./api/api', () => ({
  getChars: vi.fn(),
}));

describe('App Component', () => {
  const mockGetChars = getChars as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render the entire application layout successfully', async () => {
    mockGetChars.mockResolvedValueOnce({ pages: 0, results: [] });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
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
