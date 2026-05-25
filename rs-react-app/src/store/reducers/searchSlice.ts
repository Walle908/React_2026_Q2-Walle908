import { localStorageKey } from '@/constants/constants';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: localStorage.getItem(localStorageKey) || '',
};

const searchSlice = createSlice({
  initialState,
  name: 'search',
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
