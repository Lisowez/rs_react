import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface IState {
  favorites: number[];
}

const initialState: IState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((x) => x !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export const getFavorites = (state: RootState) => state.favorites.favorites;
export default favoritesSlice.reducer;
