import { configureStore } from '@reduxjs/toolkit';
import characterDetails from './reducers/characterDetailsSlice';
import characters from './reducers/charactersSlice';

export const store = configureStore({
  reducer: {
    characterDetails,
    characters,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
