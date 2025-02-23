import { configureStore } from '@reduxjs/toolkit';
import { favoritesSlice } from './reduxProvider';
import { api } from './api';

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
