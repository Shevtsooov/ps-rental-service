import { createSlice } from '@reduxjs/toolkit'

export interface FilteredYearState {
  value: string
}

const initialState: FilteredYearState = {
  value: '',
}

export const filteredYearSlice = createSlice({
  name: 'filteredYear',
  initialState,
  reducers: {
    setFilteredYear: (state, action) => {
      state.value = action.payload
    },
    resetFilteredYear: (state) => {
      state.value = ''
    },
  },
})

export const { setFilteredYear, resetFilteredYear } = filteredYearSlice.actions;
export const filteredYearReducer = filteredYearSlice.reducer;
