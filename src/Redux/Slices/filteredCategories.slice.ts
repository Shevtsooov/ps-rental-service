import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface FilteredCategoriesState {
  value: string[]
}

const initialState: FilteredCategoriesState = {
  value: [],
}

export const filteredCategoriesSlice = createSlice({
  name: 'filteredCategories',
  initialState,
  reducers: {
    setFilteredCategories: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    filterFilteredCategories: (state, action) => {
      return {
        // ...state,
        value: state.value.filter((cat) => cat !== action.payload),
      };
    },
    resetFilteredCategoriess: (state) => {
      state.value = []
    },
  },
})

export const {
  setFilteredCategories,
  filterFilteredCategories,
  resetFilteredCategoriess,
} = filteredCategoriesSlice.actions;
export const filteredCategoriesReducer = filteredCategoriesSlice.reducer;
