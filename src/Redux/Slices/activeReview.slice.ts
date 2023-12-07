import { createSlice } from '@reduxjs/toolkit'

export interface ActiveReviewState {
  value: string | null
}

const initialState: ActiveReviewState = {
  value: '',
}

export const activeReviewSlice = createSlice({
  name: 'activeReview',
  initialState,
  reducers: {
    setActiveReview: (state, action) => {
      state.value = action.payload
    },
    removeActiveReview: (state) => {
      state.value = null
    },
  },
})

export const { setActiveReview, removeActiveReview } = activeReviewSlice.actions;
export const activeReviewReducer = activeReviewSlice.reducer;
