import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    forms: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
