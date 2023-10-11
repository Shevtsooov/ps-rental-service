import { createSlice } from '@reduxjs/toolkit'

export interface ChosenDeliveryState {
  value: string
}

const initialState: ChosenDeliveryState = {
  value: '',
}

export const chosenDeliverySlice = createSlice({
  name: 'chosenDelivery',
  initialState,
  reducers: {
    setChosenDelivery: (state, action) => {
      state.value = action.payload
    },
    resetChosenDelivery: (state) => {
      state.value = ''
    },
  },
})

export const { setChosenDelivery, resetChosenDelivery } = chosenDeliverySlice.actions;
export const chosenDeliveryReducer = chosenDeliverySlice.reducer;
