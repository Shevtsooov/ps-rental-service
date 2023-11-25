import { createSlice } from '@reduxjs/toolkit'

export interface SavedAddressState {
  value: string
}

const initialState: SavedAddressState = {
  value: '',
}

export const savedAddressSlice = createSlice({
  name: 'savedAddress',
  initialState,
  reducers: {
    setSavedAddress: (state, action) => {
      state.value = action.payload
    },
    resetSavedAddress: (state) => {
      state.value = ''
    },
  },
})

export const { setSavedAddress, resetSavedAddress } = savedAddressSlice.actions;
export const savedAddressReducer = savedAddressSlice.reducer;
