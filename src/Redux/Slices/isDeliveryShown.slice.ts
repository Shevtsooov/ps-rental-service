import { createSlice } from '@reduxjs/toolkit'

export interface IsDeliveryShownState {
  value: boolean
}

const initialState: IsDeliveryShownState = {
  value: false,
}

export const isDeliveryShownSlice = createSlice({
  name: 'isDeliveryShown',
  initialState,
  reducers: {
    openDelivery: (state) => {
      state.value = true
    },
    closeDelivery: (state) => {
      state.value = false
    },
    toggleDelivery: (state) => {
      state.value = !state.value;
    },
  },
})

export const {
  openDelivery,
  closeDelivery,
  toggleDelivery,
} = isDeliveryShownSlice.actions;
export const isDeliveryShownReducer = isDeliveryShownSlice.reducer;
