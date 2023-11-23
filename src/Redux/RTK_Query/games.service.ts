import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Game } from '../../types/Game';
import { isProduction } from '../../env';

const BASE_URL = isProduction
  ? 'https://testps.onrender.com'
  : 'http://localhost:5020'

interface FetchOptions {
  sortBy?:string,
  query?: string;
  categories?: string[];
  year?: string,
  players?: string,
}

export const GamesApi = createApi({
  reducerPath: 'GamesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    getAllGames: builder.query<Game[], void>({
      query: () => 'games'
    }),
    findGames: builder.query<Game[], Partial<FetchOptions>>({
      query: ({ sortBy, query, categories, year, players }) => ({
        url: `games?sortBy=${sortBy}&query=${query}&categories=${categories}&year=${year}&players=${players}`,
      }),
    }),
    // addGame: builder.mutation<Game, Partial<Game>>({
    //   query: (body) => ({
    //     url: `games`,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // editGame: builder.mutation<Game, Partial<Game>>({
    //   query: (body) => ({
    //     url: `games`,
    //     method: 'PATCH',
    //     body,
    //   }),
    // }),
    // deleteGame: builder.mutation<Games, Partial<Game>>({
    //   query: (body) => ({
    //     url: `games`,
    //     method: 'DELETE',
    //     body,
    //   }),
    // }),
  })
})

export const {
  useGetAllGamesQuery,
  useFindGamesQuery,
  // useAddGameMutation,
  // useEditGameMutation,
} = GamesApi;
