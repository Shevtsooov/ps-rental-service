import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface BookedDaysState {
  value: Date[]
}

const initialState: BookedDaysState = {
  value: [],
}

export const bookedDaysSlice = createSlice({
  name: 'bookedDays',
  initialState,
  reducers: {
    setBookedDays: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    filterBookedDays: (state, action) => {
      return {
        // ...state,
        value: state.value.filter((Day) => Day !== action.payload),
      };
    },
    resetBookedDayss: (state) => {
      state.value = []
    },
  },
})

export const {
  setBookedDays,
  filterBookedDays,
  resetBookedDayss,
} = bookedDaysSlice.actions;
export const bookedDaysReducer = bookedDaysSlice.reducer;
