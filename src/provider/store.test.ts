import favoritesReducer, {
  addFavorite,
  removeFavorite,
  clearFavorites,
  IState,
} from './reduxProvider';

import { it, describe, expect } from 'vitest';

describe('favoritesSlice', () => {
  const initialState: IState = {
    favorites: [],
  };

  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle adding a favorite', () => {
    const favorite = 1;

    const nextState = favoritesReducer(initialState, addFavorite(favorite));
    expect(nextState.favorites).toContain(favorite);
  });

  it('should handle removing a favorite', () => {
    const favorite = 1;

    const stateWithFavorite = favoritesReducer(
      initialState,
      addFavorite(favorite)
    );
    const nextState = favoritesReducer(
      stateWithFavorite,
      removeFavorite(favorite)
    );
    expect(nextState.favorites).not.toContain(favorite);
  });

  it('should handle clearing favorites', () => {
    const favorite1 = 1;
    const favorite2 = 2;

    let stateWithFavorites = favoritesReducer(
      initialState,
      addFavorite(favorite1)
    );
    stateWithFavorites = favoritesReducer(
      stateWithFavorites,
      addFavorite(favorite2)
    );

    const nextState = favoritesReducer(stateWithFavorites, clearFavorites());
    expect(nextState.favorites).toHaveLength(0);
  });
});
