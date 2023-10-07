import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface SelectedDaysState {
  value: Date[]
}

const initialState: SelectedDaysState = {
  value: [],
}

export const selectedDaysSlice = createSlice({
  name: 'selectedDays',
  initialState,
  reducers: {
    setSelectedDays: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    filterSelectedDays: (state, action) => {
      return {
        // ...state,
        value: state.value.filter((period) => period !== action.payload),
      };
    },
    resetSelectedDays: (state) => {
      state.value = []
    },
  },
})

export const {
  setSelectedDays,
  filterSelectedDays,
  resetSelectedDays,
} = selectedDaysSlice.actions;
export const selectedDaysReducer = selectedDaysSlice.reducer;
