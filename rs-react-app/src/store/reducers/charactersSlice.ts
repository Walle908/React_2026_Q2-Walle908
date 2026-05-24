import { getChars } from '@/api/api';
import { ErrorMessage } from '@/constants/constants';
import { type Character } from '@/types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CharactersState {
  chars: Character[];
  errorMessage: ErrorMessage;
  isLoading: boolean;
  totalPages: number;
}

const initialState: CharactersState = {
  chars: [],
  errorMessage: ErrorMessage.NO_ERROR,
  isLoading: false,
  totalPages: 0,
};

export const charactersSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = ErrorMessage.NO_ERROR;
      })

      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload === null) {
          state.chars = [];
          state.errorMessage = ErrorMessage.NOT_FOUND;
          state.totalPages = 0;
          return;
        }

        state.chars = action.payload.results;
        state.totalPages = action.payload.pages;
        state.errorMessage = ErrorMessage.NO_ERROR;
      })

      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;

        if (action.error.name === 'AbortError') return;

        state.chars = [];
        state.totalPages = 0;
        state.errorMessage = action.payload ?? ErrorMessage.SERVER_ERROR;
      });
  },
  initialState,
  name: 'characters',
  reducers: {},
});

export const fetchCharacters = createAsyncThunk<
  null | { pages: number; results: Character[]; },
  { page: number; query: string; },
  { rejectValue: ErrorMessage }
>('characters/fetchCharacters', async ({ page, query }, { rejectWithValue, signal }) => {
  try {
    const data = await getChars(query, page, signal);

    if (data === null) {
      return null;
    }

    return data;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') throw err;

    return rejectWithValue(ErrorMessage.SERVER_ERROR);
  }
});

export default charactersSlice.reducer;
