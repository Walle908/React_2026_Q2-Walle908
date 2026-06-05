import { apiSlice } from '@/services/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import selectedCharacters from './reducers/selectedCharactersSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedCharacters,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
