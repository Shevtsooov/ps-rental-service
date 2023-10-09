import { createSlice } from '@reduxjs/toolkit'
import { Game } from '../../types/Game';
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface SavedGamesState {
  value: Game[]
}

const initialState: SavedGamesState = {
  value: [],
}

export const savedGamesSlice = createSlice({
  name: 'savedGames',
  initialState,
  reducers: {
    setSavedGames: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    filterSavedGames: (state, action) => {
      return {
        // ...state,
        value: state.value.filter((game) => game.gameId !== action.payload),
      };
    },
    resetSavedGamess: (state) => {
      state.value = []
    },
  },
})

export const {
  setSavedGames,
  filterSavedGames,
  resetSavedGamess,
} = savedGamesSlice.actions;
export const savedGamesReducer = savedGamesSlice.reducer;
