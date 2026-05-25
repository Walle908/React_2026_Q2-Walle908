import { configureStore } from '@reduxjs/toolkit';
import characterDetails from './reducers/characterDetailsSlice';
import characters from './reducers/charactersSlice';
import search from './reducers/searchSlice';
import selectCharacters from './reducers/selectCharactersSlice';

export const store = configureStore({
  reducer: {
    characterDetails,
    characters,
    search,
    selectCharacters,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
