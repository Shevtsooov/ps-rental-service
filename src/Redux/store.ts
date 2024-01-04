import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { queryReducer } from './Slices/query.slice';

import { filteredCategoriesReducer } from './Slices/filteredCategories.slice';
import { filteredSortingReducer } from './Slices/filteredSorting.slice';
import { filteredYearReducer } from './Slices/filteredYear.slice';
import { filteredPlayersReducer } from './Slices/filteredPlayers.slice';

import { gamePaginationPageReducer } from './Slices/paginationPage.slice';

export const store = configureStore({
  reducer: {

    query: queryReducer,

    filteredSorting: filteredSortingReducer,
    filteredCategories: filteredCategoriesReducer,
    filteredYear: filteredYearReducer,
    filteredPlayers: filteredPlayersReducer,

    gamePaginationPage: gamePaginationPageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
