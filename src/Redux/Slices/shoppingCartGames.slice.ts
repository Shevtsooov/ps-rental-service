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
      state.value = [...state.value, action.payload];
    },
    hardSetShoppingCartGames: (state, action) => {
      state.value =  action.payload
  },
    filterShoppingCartGames: (state, action) => {
      state.value = state.value.filter((game) => game.gameId !== action.payload);
    },
    resetShoppingCartGames: (state) => {
      state.value = [];
    },
  },
})

export const {
  setShoppingCartGames,
  hardSetShoppingCartGames,
  filterShoppingCartGames,
  resetShoppingCartGames,
} = shoppingCartGamesSlice.actions;
export const shoppingCartGamesReducer = shoppingCartGamesSlice.reducer;
