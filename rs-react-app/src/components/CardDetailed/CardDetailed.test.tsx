import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorMessage } from '@constants/constants';
import * as useCharactersDetailsModule from '@hooks/useCharactersDetails';
import { mockCharacter } from '@test-utils/mocks';
import { render, screen } from '@testing-library/react';
import CardDetailed from './CardDetailed';

describe('CardDetailed Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Loader when isLoading: true', () => {
    vi.spyOn(useCharactersDetailsModule, 'default').mockReturnValue({
      char: null,
      closeCard: vi.fn(),
      errorMessage: ErrorMessage.NO_ERROR,
      isLoading: true,
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
      closeCard: vi.fn(),
      errorMessage: ErrorMessage.CHAR_NOT_FOUND,
      isLoading: false,
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
      closeCard: vi.fn(),
      errorMessage: ErrorMessage.NO_ERROR,
      isLoading: false,
    });

    render(<CardDetailed />);

    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();

    expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: ErrorMessage.CHAR_NOT_FOUND })
    ).not.toBeInTheDocument();
  });
});
