import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface ArrayState {
  value: string[]
}

const initialState: ArrayState = {
  value: [],
}

export const arraySlice = createSlice({
  name: 'array',
  initialState,
  reducers: {
    setArray: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    filterArray: (state, action) => {
      return {
        ...state,
        value: state.value.filter((cat) => cat !== action.payload),
      };
    },
    resetArrays: (state) => {
      state.value = []
    },
  },
})

export const {
  setArray,
  filterArray,
  resetArrays,
} = arraySlice.actions;
export const arrayReducer = arraySlice.reducer;
