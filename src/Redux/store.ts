import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { queryReducer } from './Slices/query.slice';
import { savedGamesReducer } from './Slices/savedGames.slice';
import { shoppingCartGamesReducer } from './Slices/shoppingCartGames.slice';
import { bookedDaysReducer } from './Slices/bookedDays.slice';
import { selectedDaysReducer } from './Slices/selectedDays.slice';
import { monthLookUpLimitReducer } from './Slices/monthLookUpLimit';
import { isCalendarShownReducer } from './Slices/isCalendarShown.slice';
import { isDeliveryShownReducer } from './Slices/isDeliveryShown.slice';
import { chosenDeliveryReducer } from './Slices/chosenDelivery.slice';
import { GamesApi } from './RTK_Query/games.service';
import { filteredCategoriesReducer } from './Slices/filteredCategories.slice';
import { filteredSortingReducer } from './Slices/filteredSorting.slice';
import { filteredYearReducer } from './Slices/filteredYear.slice';
import { filteredPlayersReducer } from './Slices/filteredPlayers.slice';
import { paginationPageReducer } from './Slices/paginationPage.slice';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    savedGames: savedGamesReducer,
    shoppingCartGames: shoppingCartGamesReducer,
    bookedDays: bookedDaysReducer,
    selectedDays: selectedDaysReducer,
    monthLookUpLimit: monthLookUpLimitReducer,
    isCalendarShown: isCalendarShownReducer,
    isDeliveryShown: isDeliveryShownReducer,
    chosenDelivery: chosenDeliveryReducer,

    filteredSorting: filteredSortingReducer,
    filteredCategories: filteredCategoriesReducer,
    filteredYear: filteredYearReducer,
    filteredPlayers: filteredPlayersReducer,

    paginationPage: paginationPageReducer,

    [GamesApi.reducerPath]: GamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(GamesApi.middleware)
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
