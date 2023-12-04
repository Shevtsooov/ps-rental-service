import { createSlice } from '@reduxjs/toolkit'

export interface GamePaginationPageState {
  value: number
}

const initialState: GamePaginationPageState = {
  value: 1,
}

export const gamePaginationPageSlice = createSlice({
  name: 'gamePaginationPage',
  initialState,
  reducers: {
    setGamePaginationPage: (state, action) => {
      state.value = action.payload
    },
    resetGamePaginationPage: (state) => {
      state.value = 1
    },
  },
})

export const { setGamePaginationPage, resetGamePaginationPage } = gamePaginationPageSlice.actions;
export const gamePaginationPageReducer = gamePaginationPageSlice.reducer;
