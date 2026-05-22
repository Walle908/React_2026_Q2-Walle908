import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { getChars } from './api/api';

vi.mock('./api/api', () => ({
  getChars: vi.fn(),
}));

describe('App Component', () => {
  const mockGetChars = vi.mocked(getChars);

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render the entire application layout successfully', async () => {
    mockGetChars.mockResolvedValueOnce([]);

    const { unmount } = render(<App />);

    const mainTitle = screen.getByRole('heading', { level: 1, name: /rick and morty/i });
    expect(mainTitle).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search a character...');
    expect(searchInput).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetChars).toHaveBeenCalledTimes(1);
    });

    unmount();
  });
});
