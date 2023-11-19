import { createSlice } from '@reduxjs/toolkit'

export interface ActiveClientState {
  value: string | null
}

const initialState: ActiveClientState = {
  value: '',
}

export const activeClientSlice = createSlice({
  name: 'activeClient',
  initialState,
  reducers: {
    setActiveClient: (state, action) => {
      state.value = action.payload
    },
    removeActiveClient: (state) => {
      state.value = null
    },
  },
})

export const { setActiveClient, removeActiveClient } = activeClientSlice.actions;
export const activeClientReducer = activeClientSlice.reducer;
