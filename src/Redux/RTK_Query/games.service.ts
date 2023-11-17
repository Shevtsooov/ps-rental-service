import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Game } from '../../types/Game';

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
    baseUrl: 'https://testps.onrender.com'
    // baseUrl: 'http://localhost:5020'
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
