import { createSlice } from '@reduxjs/toolkit'

export interface orderPaginationPageState {
  value: number
}

const initialState: orderPaginationPageState = {
  value: 1,
}

export const orderPaginationPageSlice = createSlice({
  name: 'orderPaginationPage',
  initialState,
  reducers: {
    setOrderPaginationPage: (state, action) => {
      state.value = action.payload
    },
    resetOrderPaginationPage: (state) => {
      state.value = 1
    },
  },
})

export const { setOrderPaginationPage, resetOrderPaginationPage } = orderPaginationPageSlice.actions;
export const orderpaginationPageReducer = orderPaginationPageSlice.reducer;
