import { createSlice } from '@reduxjs/toolkit'

export interface PaginationPageState {
  value: number
}

const initialState: PaginationPageState = {
  value: 1,
}

export const paginationPageSlice = createSlice({
  name: 'paginationPage',
  initialState,
  reducers: {
    setPaginationPage: (state, action) => {
      state.value = action.payload
    },
    resetPaginationPage: (state) => {
      state.value = 1
    },
  },
})

export const { setPaginationPage, resetPaginationPage } = paginationPageSlice.actions;
export const paginationPageReducer = paginationPageSlice.reducer;
