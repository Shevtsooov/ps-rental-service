import { User } from '../../types/User';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  value: User | null
}

const initialState: UserState | null = {
  value: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => initialState,
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});


export const { setUser, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
