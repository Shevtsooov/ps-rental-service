import { createSlice } from '@reduxjs/toolkit'

export interface FirstState {
  value: number
}

const initialState: FirstState = {
  value: 0,
}

export const firstSlice = createSlice({
  name: 'first',
  initialState,
  reducers: {
    setFirst: (state) => {
      state.value += 1
    },
    resetFirst: (state) => {
      state.value = 0
    },
  },
})

export const { setFirst, resetFirst } = firstSlice.actions;
export const firstReducer = firstSlice.reducer;
