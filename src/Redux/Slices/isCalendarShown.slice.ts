import { createSlice } from '@reduxjs/toolkit'

export interface IsCalendarShownState {
  value: boolean
}

const initialState: IsCalendarShownState = {
  value: true,
}

export const isCalendarShownSlice = createSlice({
  name: 'isCalendarShown',
  initialState,
  reducers: {
    openCalendar: (state) => {
      state.value = true
    },
    closeCalendar: (state) => {
      state.value = false
    },
    toggleCalendar: (state) => {
      state.value = !state.value;
    },
  },
})

export const {
  openCalendar,
  closeCalendar,
  toggleCalendar,
} = isCalendarShownSlice.actions;
export const isCalendarShownReducer = isCalendarShownSlice.reducer;
