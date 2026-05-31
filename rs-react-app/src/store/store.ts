import { configureStore } from '@reduxjs/toolkit';
import characterDetails from './reducers/characterDetailsSlice';
import characters from './reducers/charactersSlice';
import search from './reducers/searchSlice';
import selectedCharacters from './reducers/selectedCharactersSlice';

export const store = configureStore({
  reducer: {
    characterDetails,
    characters,
    search,
    selectedCharacters,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
