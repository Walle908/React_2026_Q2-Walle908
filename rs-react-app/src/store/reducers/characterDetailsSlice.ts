import { getOneChar } from '@/api/api';
import { ErrorMessage } from '@/constants/constants';
import { type Character } from '@/types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CharacterDetailsState {
  char: Character | null;
  errorMessage: ErrorMessage;
  isLoading: boolean;
}

const initialState: CharacterDetailsState = {
  char: null,
  errorMessage: ErrorMessage.NO_ERROR,
  isLoading: false,
};

export const fetchCharacterById = createAsyncThunk<
  Character | null,
  string,
  { rejectValue: ErrorMessage }
>('characters/fetchCharacterById', async (id, { rejectWithValue }) => {
  try {
    const data = await getOneChar(id);

    if (data === null) return null;

    return data;
  } catch {
    return rejectWithValue(ErrorMessage.SERVER_ERROR);
  }
});

export const characterDetailsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterById.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = ErrorMessage.NO_ERROR;
      })

      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload === null) {
          state.char = null;
          state.errorMessage = ErrorMessage.NOT_FOUND;
          return;
        }

        state.char = action.payload;
        state.errorMessage = ErrorMessage.NO_ERROR;
      })

      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.isLoading = false;
        state.char = null;
        state.errorMessage = action.payload ?? ErrorMessage.SERVER_ERROR;
      });
  },
  initialState,
  name: 'characterDetails',
  reducers: {
    clearCharacter: (state) => {
      state.char = null;
    },
  },
});

export const { clearCharacter } = characterDetailsSlice.actions;
export default characterDetailsSlice.reducer;
