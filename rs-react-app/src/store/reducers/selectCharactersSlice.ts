import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
  selectedIds: number[];
}

const initialState: SelectionState = {
  selectedIds: [],
};

const selectCharactersSlice = createSlice({
  initialState,
  name: 'selection',
  reducers: {
    toggleSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((item) => item !== id);
      } else {
        state.selectedIds.push(id);
      }
    },

    unselectAll: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { toggleSelection, unselectAll } = selectCharactersSlice.actions;
export default selectCharactersSlice.reducer;
