import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { ErrorMessage } from '@/constants/constants';
import { useGetCharByIdQuery } from '@/services/apiSlice';
import { mockCharacter } from '@/test-utils/mocks';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardDetailed from './CardDetailed';

vi.mock('@/services/apiSlice', () => ({
  useGetCharByIdQuery: vi.fn(),
}));

const mockedUseGetCharByIdQuery = useGetCharByIdQuery as unknown as Mock;

const renderWithId = (initialEntry = '/?details=16') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <CardDetailed />
    </MemoryRouter>
  );
};

describe('CardDetailed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    value: true,
  });

  it('should render Loader when isFetching: true', () => {
    mockedUseGetCharByIdQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isFetching: true,
      isLoading: false,
    });

    renderWithId();

    expect(screen.getByTestId('loader-element')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
    ).not.toBeInTheDocument();
  });

  it('should display an error message if the character is not found', () => {
    mockedUseGetCharByIdQuery.mockReturnValue({
      data: undefined,
      error: { data: { error: 'Character not found' }, status: 404 },
      isLoading: false,
    });

    renderWithId();

    expect(
      screen.getByRole('heading', { level: 2, name: ErrorMessage.CHAR_NOT_FOUND })
    ).toBeInTheDocument();

    expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
  });

  it('should render CardDetailsContent when successful data', () => {
    mockedUseGetCharByIdQuery.mockReturnValue({
      data: mockCharacter,
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithId();

    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
    expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
    ).not.toBeInTheDocument();
  });

  it('should return null and render nothing if id is missing in search params', () => {
    mockedUseGetCharByIdQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <CardDetailed />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should call closeCard and update search params when close button is clicked', async () => {
    mockedUseGetCharByIdQuery.mockReturnValue({
      data: mockCharacter,
      error: undefined,
      isFetching: false,
      isLoading: false,
    });

    renderWithId();

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: mockCharacter.name })).not.toBeInTheDocument();
    });
  });
});
