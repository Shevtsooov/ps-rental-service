import { createSlice } from '@reduxjs/toolkit'

export interface firstState {
  value: string
}

const initialState: firstState = {
  value: '',
}

export const firstSlice = createSlice({
  name: 'first',
  initialState,
  reducers: {
    // setfirst: (state, action) => {
    //   state.value = action.payload
    // },
    // logout: (state) => {
    //   state.value = null
    // },
  },
})

// export const { setfirst, logout } = firstSlice.actions;
export const firstReducer = firstSlice.reducer;
