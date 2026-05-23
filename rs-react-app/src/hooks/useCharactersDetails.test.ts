import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import useCharacterDetails from './useCharactersDetails';
import { ErrorMessage, SearchParams } from '../constants/constants';
import { mockCharacter } from '../__tests__/mocks';

const mockGetOneChar = vi.fn();
vi.mock('../api/api', () => ({
  getOneChar: (id: string) => mockGetOneChar(id),
}));

const mockSetSearchParams = vi.fn();
let mockCurrentId: string | null = null;

vi.mock('react-router', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router')>();
  return {
    ...original,
    useSearchParams: () => [
      {
        get: (key: string) => (key === SearchParams.DETAILS ? mockCurrentId : null),
      },
      mockSetSearchParams,
    ],
  };
});

describe('useCharacterDetails Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCurrentId = null;
  });

  it('should return initial state when ID is missing in URL', () => {
    mockCurrentId = null;

    const { result } = renderHook(() => useCharacterDetails(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.char).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errorMessage).toBe(ErrorMessage.NO_ERROR);
    expect(mockGetOneChar).not.toHaveBeenCalled();
  });

  it('should successfully fetch character data when ID is provided', async () => {
    mockCurrentId = '1';

    mockGetOneChar.mockResolvedValue(mockCharacter);

    const { result } = renderHook(() => useCharacterDetails(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.char).toEqual(mockCharacter);
    expect(result.current.errorMessage).toBe(ErrorMessage.NO_ERROR);
    expect(mockGetOneChar).toHaveBeenCalledWith('1');
    expect(mockGetOneChar).toHaveBeenCalledTimes(1);
  });

  it('should handle 404 (character not found)', async () => {
    mockCurrentId = '999';
    mockGetOneChar.mockResolvedValue(null);

    const { result } = renderHook(() => useCharacterDetails(), {
      wrapper: MemoryRouter,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.char).toBeNull();
    expect(result.current.errorMessage).toBe(ErrorMessage.CHAR_NOT_FOUND);
  });

  it('should handle server errors gracefully', async () => {
    mockCurrentId = '123';

    mockGetOneChar.mockRejectedValue(new Error(ErrorMessage.SERVER_ERROR));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCharacterDetails(), {
      wrapper: MemoryRouter,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.char).toBeNull();
    expect(result.current.errorMessage).toBe(ErrorMessage.SERVER_ERROR);
    consoleSpy.mockRestore();
  });

  it('should call setSearchParams when closeCard is invoked', () => {
    mockCurrentId = '1';
    const { result } = renderHook(() => useCharacterDetails(), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current.closeCard();
    });

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
  });
});
