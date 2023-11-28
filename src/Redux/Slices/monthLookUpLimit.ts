import { createSlice } from '@reduxjs/toolkit'

export interface MonthLookUpLimitState {
  value: number
}

const initialState: MonthLookUpLimitState = {
  value: 0,
}

export const monthLookUpLimitSlice = createSlice({
  name: 'monthLookUpLimit',
  initialState,
  reducers: {
    increaseMonthLookUpLimit: (state) => {
      state.value += 1
    },
    decreaseMonthLookUpLimit: (state) => {
      state.value -= 1
    },
    resetMonthLookUpLimit: (state) => {
      state.value = 0
    },
  },
})

export const {
  increaseMonthLookUpLimit,
  decreaseMonthLookUpLimit,
  resetMonthLookUpLimit,
} = monthLookUpLimitSlice.actions;
export const monthLookUpLimitReducer = monthLookUpLimitSlice.reducer;
