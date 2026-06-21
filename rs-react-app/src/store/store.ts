import { apiSlice } from '@/services/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import selectedCharacters from './reducers/selectedCharactersSlice';

export const makeStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      selectedCharacters,
    },
  });
};

export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
