import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { queryReducer } from './Slices/query.slice';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    
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
