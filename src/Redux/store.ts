import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { queryReducer } from './Slices/query.slice';
import { savedGamesReducer } from './Slices/savedGames.slice';
import { shoppingCartGamesReducer } from './Slices/shoppingCartGames.slice';
import { bookedDaysReducer } from './Slices/bookedDays.slice';
import { selectedDaysReducer } from './Slices/selectedDays.slice';
import { monthLookUpLimitReducer } from './Slices/monthLookUpLimit';
import { isCalendarShownReducer } from './Slices/isCalendarShown.slice';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    savedGames: savedGamesReducer,
    shoppingCartGames: shoppingCartGamesReducer,
    bookedDays: bookedDaysReducer,
    selectedDays: selectedDaysReducer,
    monthLookUpLimit: monthLookUpLimitReducer,
    isCalendarShown: isCalendarShownReducer,
    // [QuestionsApi.reducerPath]: QuestionsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => (
  //   getDefaultMiddleware().concat(QuestionsApi.middleware)
  // )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
