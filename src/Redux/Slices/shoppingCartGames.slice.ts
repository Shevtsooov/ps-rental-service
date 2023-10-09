import { createSlice } from '@reduxjs/toolkit'
import { Game } from '../../types/Game';
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface ShoppingCartGamesState {
  value: Game[]
}

const initialState: ShoppingCartGamesState = {
  value: [],
}

export const shoppingCartGamesSlice = createSlice({
  name: 'shoppingCartGames',
  initialState,
  reducers: {
    setShoppingCartGames: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    filterShoppingCartGames: (state, action) => {
      return {
        // ...state,
        value: state.value.filter((game) => game.gameId !== action.payload),
      };
    },
    resetShoppingCartGamess: (state) => {
      state.value = []
    },
  },
})

export const {
  setShoppingCartGames,
  filterShoppingCartGames,
  resetShoppingCartGamess,
} = shoppingCartGamesSlice.actions;
export const shoppingCartGamesReducer = shoppingCartGamesSlice.reducer;
