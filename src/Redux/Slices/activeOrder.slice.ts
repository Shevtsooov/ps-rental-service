import { createSlice } from '@reduxjs/toolkit'

export interface ActiveOrderState {
  value: string | null
}

const initialState: ActiveOrderState = {
  value: '',
}

export const activeOrderSlice = createSlice({
  name: 'activeOrder',
  initialState,
  reducers: {
    setActiveOrder: (state, action) => {
      state.value = action.payload
    },
    removeActiveOrder: (state) => {
      state.value = null
    },
  },
})

export const { setActiveOrder, removeActiveOrder } = activeOrderSlice.actions;
export const activeOrderReducer = activeOrderSlice.reducer;
