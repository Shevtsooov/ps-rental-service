import { createSlice } from '@reduxjs/toolkit'

export interface UserCommentState {
  value: string
}

const initialState: UserCommentState = {
  value: '',
}

export const userCommentSlice = createSlice({
  name: 'userComment',
  initialState,
  reducers: {
    setUserComment: (state, action) => {
      state.value = action.payload
    },
    resetUserComment: (state) => {
      state.value = ''
    },
  },
})

export const { setUserComment, resetUserComment } = userCommentSlice.actions;
export const userCommentReducer = userCommentSlice.reducer;
