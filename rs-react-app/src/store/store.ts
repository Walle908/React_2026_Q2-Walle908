import { configureStore } from '@reduxjs/toolkit';
import selectedCharacters from './reducers/selectedCharactersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      selectedCharacters,
    },
  });
};

export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
