import type { Character } from '@/types/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
  selectedChars: Character[];
}

const initialState: SelectionState = {
  selectedChars: [],
};

const selectedCharactersSlice = createSlice({
  initialState,
  name: 'selectedCharacters',
  reducers: {
    toggleSelection: (state, action: PayloadAction<Character>) => {
      const char = action.payload;

      const exists = state.selectedChars.some((item) => item.id === char.id);

      if (exists) {
        state.selectedChars = state.selectedChars.filter((item) => item.id !== char.id);
      } else {
        state.selectedChars.push(char);
      }
    },

    unselectAll: (state) => {
      state.selectedChars = [];
    },
  },
});

export const { toggleSelection, unselectAll } = selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
