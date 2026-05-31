import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { ErrorMessage } from '@/constants/constants';
import { useGetCharByIdQuery } from '@/services/apiSlice';
import { mockCharacter } from '@/test-utils/mocks';
import { render, screen } from '@testing-library/react';
import CardDetailed from './CardDetailed';

vi.mock('@/services/apiSlice', () => ({
  useGetCharByIdQuery: vi.fn(),
}));

const mockedUseGetCharByIdQuery = useGetCharByIdQuery as unknown as Mock;

describe('CardDetailed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Loader when isLoading: true', () => {
    mockedUseGetCharByIdQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <CardDetailed />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader-element')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
    ).not.toBeInTheDocument();
  });

  it('should display an error message if the character is not found', () => {
    mockedUseGetCharByIdQuery.mockReturnValue({
      data: undefined,
      error: { status: 404 },
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <CardDetailed />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
    ).toBeInTheDocument();

    expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
  });

  it('should render CardDetailsContent when successful data', () => {
    mockedUseGetCharByIdQuery.mockReturnValue({
      data: mockCharacter,
      error: undefined,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <CardDetailed />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
    expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: ErrorMessage.NOT_FOUND })
    ).not.toBeInTheDocument();
  });
});
