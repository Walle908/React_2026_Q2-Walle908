import { configureStore } from '@reduxjs/toolkit';
import characters from './reducers/charactersSlice';

export const store = configureStore({
  reducer: {
    characters,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
