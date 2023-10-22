import { createSlice } from '@reduxjs/toolkit'

export interface FilteredSortingState {
  value: string
}

const initialState: FilteredSortingState = {
  value: 'Найновіші',
}

export const filteredSortingSlice = createSlice({
  name: 'filteredSorting',
  initialState,
  reducers: {
    setFilteredSorting: (state, action) => {
      state.value = action.payload
    },
    resetFilteredSorting: (state) => {
      state.value = 'DESC'
    },
  },
})

export const { setFilteredSorting, resetFilteredSorting } = filteredSortingSlice.actions;
export const filteredSortingReducer = filteredSortingSlice.reducer;
