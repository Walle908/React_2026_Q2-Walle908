import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardDetailed from './CardDetailed';
import { mockCharacter } from '../../__tests__/mocks';
import * as useCharactersDetailsModule from '../../hooks/useCharactersDetails';
import { ErrorMessage } from '../../constants/constants';

describe('CardDetailed Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Loader when isLoading: true', () => {
    vi.spyOn(useCharactersDetailsModule, 'default').mockReturnValue({
      char: null,
      isLoading: true,
      errorMessage: ErrorMessage.NO_ERROR,
      closeCard: vi.fn(),
    });

    render(<CardDetailed />);

    expect(screen.getByTestId('loader-element')).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { level: 2, name: ErrorMessage.CHAR_NOT_FOUND })
    ).not.toBeInTheDocument();
  });

  it('should display an error message if the character is not found', () => {
    vi.spyOn(useCharactersDetailsModule, 'default').mockReturnValue({
      char: null,
      isLoading: false,
      errorMessage: ErrorMessage.CHAR_NOT_FOUND,
      closeCard: vi.fn(),
    });

    render(<CardDetailed />);

    expect(
      screen.getByRole('heading', { level: 2, name: ErrorMessage.CHAR_NOT_FOUND })
    ).toBeInTheDocument();

    expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
  });

  it('should render CardDetailsContent when successful data', () => {
    vi.spyOn(useCharactersDetailsModule, 'default').mockReturnValue({
      char: mockCharacter,
      isLoading: false,
      errorMessage: ErrorMessage.NO_ERROR,
      closeCard: vi.fn(),
    });

    render(<CardDetailed />);

    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();

    expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: ErrorMessage.CHAR_NOT_FOUND })
    ).not.toBeInTheDocument();
  });
});
