import { createSlice } from '@reduxjs/toolkit'

export interface FilteredPlayersState {
  value: string
}

const initialState: FilteredPlayersState = {
  value: '',
}

export const filteredPlayersSlice = createSlice({
  name: 'filteredPlayers',
  initialState,
  reducers: {
    setFilteredPlayers: (state, action) => {
      state.value = action.payload
    },
    resetFilteredPlayers: (state) => {
      state.value = ''
    },
  },
})

export const { setFilteredPlayers, resetFilteredPlayers } = filteredPlayersSlice.actions;
export const filteredPlayersReducer = filteredPlayersSlice.reducer;
