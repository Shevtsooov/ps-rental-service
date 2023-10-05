import { createSlice } from '@reduxjs/toolkit'
import { Game } from '../../types/Game';
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface ShoppingCartGamesState {
  value: Game[]
}

const initialState: ShoppingCartGamesState = {
  value: [
    {
    title: 'FIFA 23',
    icon: 'fifa24/fifa24.jpg',

    price: 200,
    // discountedPrice: 100,
    popularity: 3,
    id: 32
  },
  {
    title: 'FIFA 24',
    icon: 'fifa24/fifa24.jpg',

    price: 150,
    discountedPrice: 100,
    popularity: 22,
    id: 33
  }
],
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
        value: state.value.filter((game) => game.id !== action.payload),
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
