import { User } from './../../types/User';
import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  value: User | null
}

const initialState: UserState | null = {
  value: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
    logout: (state) => {
      state.value = null
    },
  },
})

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
