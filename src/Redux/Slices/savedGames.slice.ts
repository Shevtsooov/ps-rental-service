import { createSlice } from '@reduxjs/toolkit';
import { Game } from '../../types/Game';

export interface SavedGamesState {
  value: Game[];
}

const initialState: SavedGamesState = {
  value: [],
}

export const savedGamesSlice = createSlice({
  name: 'savedGames',
  initialState,
  reducers: {
    setSavedGames: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    hardSetSavedGames: (state, action) => {
      state.value =  action.payload
  },
    filterSavedGames: (state, action) => {
      state.value = state.value.filter((game) => game.gameId !== action.payload);
    },
    resetSavedGames: (state) => {
      state.value = [];
    },
  },
})

export const {
  setSavedGames,
  hardSetSavedGames,
  filterSavedGames,
  resetSavedGames,
} = savedGamesSlice.actions;
export const savedGamesReducer = savedGamesSlice.reducer;
