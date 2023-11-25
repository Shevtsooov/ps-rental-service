import { createSlice } from '@reduxjs/toolkit'

export interface firstState {
  value: string | null
}

const initialState: firstState = {
  value: '',
}

export const firstSlice = createSlice({
  name: 'first',
  initialState,
  reducers: {
    setfirst: (state, action) => {
      state.value = action.payload
    },
    resetFirst: (state) => {
      state.value = null
    },
  },
})

export const { setfirst, resetFirst } = firstSlice.actions;
export const firstReducer = firstSlice.reducer;
