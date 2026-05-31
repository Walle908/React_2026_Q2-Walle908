import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getOneChar } from '@/api/api';
import { ErrorMessage } from '@/constants/constants';
import { mockCharacter } from '@/test-utils/mocks';
import characterDetailsReducer, {
  clearCharacter,
  fetchCharacterById,
} from '../characterDetailsSlice';

vi.mock('@/api/api', () => ({
  getOneChar: vi.fn(),
}));

describe('characterDetailsSlice', () => {
  const initialState = {
    char: null,
    errorMessage: ErrorMessage.NO_ERROR,
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the initial state when passed an empty action', () => {
    expect(characterDetailsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle clearCharacter', () => {
    const modifiedState = {
      char: mockCharacter,
      errorMessage: ErrorMessage.NO_ERROR,
      isLoading: false,
    };

    const nextState = characterDetailsReducer(modifiedState, clearCharacter());
    expect(nextState.char).toBeNull();
  });

  it('should set isLoading to true and reset errorMessage on fetchCharacterById.pending', () => {
    const stateWithValues = {
      ...initialState,
      errorMessage: ErrorMessage.SERVER_ERROR,
    };

    const action = { type: fetchCharacterById.pending.type };
    const nextState = characterDetailsReducer(stateWithValues, action);

    expect(nextState.isLoading).toBe(true);
    expect(nextState.errorMessage).toBe(ErrorMessage.NO_ERROR);
  });

  it('should set char and stop loading on fetchCharacterById.fulfilled when data is found', () => {
    const action = {
      payload: mockCharacter,
      type: fetchCharacterById.fulfilled.type,
    };

    const nextState = characterDetailsReducer({ ...initialState, isLoading: true }, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.char).toEqual(mockCharacter);
    expect(nextState.errorMessage).toBe(ErrorMessage.NO_ERROR);
  });

  it('should set NOT_FOUND error on fetchCharacterById.fulfilled when payload is null', () => {
    const action = {
      payload: null,
      type: fetchCharacterById.fulfilled.type,
    };

    const nextState = characterDetailsReducer({ ...initialState, isLoading: true }, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.char).toBeNull();
    expect(nextState.errorMessage).toBe(ErrorMessage.NOT_FOUND);
  });

  it('should set errorMessage on fetchCharacterById.rejected', () => {
    const action = {
      payload: ErrorMessage.SERVER_ERROR,
      type: fetchCharacterById.rejected.type,
    };

    const nextState = characterDetailsReducer({ ...initialState, isLoading: true }, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.char).toBeNull();
    expect(nextState.errorMessage).toBe(ErrorMessage.SERVER_ERROR);
  });

  it('should dispatch fulfilled action with data when fetchCharacterById succeeds', async () => {
    vi.mocked(getOneChar).mockResolvedValueOnce(mockCharacter);

    const dispatch = vi.fn();
    const thunk = fetchCharacterById('1');

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: mockCharacter,
        type: fetchCharacterById.fulfilled.type,
      })
    );
  });

  it('should dispatch fulfilled action with null when character is not found', async () => {
    vi.mocked(getOneChar).mockResolvedValueOnce(null);

    const dispatch = vi.fn();
    const thunk = fetchCharacterById('999');

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: null,
        type: fetchCharacterById.fulfilled.type,
      })
    );
  });

  it('should dispatch rejected action with SERVER_ERROR when API throws an error', async () => {
    vi.mocked(getOneChar).mockRejectedValueOnce(new Error('Network Down'));

    const dispatch = vi.fn();
    const thunk = fetchCharacterById('1');

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: ErrorMessage.SERVER_ERROR,
        type: fetchCharacterById.rejected.type,
      })
    );
  });
});
