import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';

export const UsersApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://testps.onrender.com'
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => 'users'
    }),
    activateUser: builder.query<void, string>({
      query: (activationToken) => `activation/${activationToken}`
    }),
    // findGames: builder.query<Game[], {
    //   sortBy?:string,
    //   query?: string;
    //   categories?: string[];
    //   year?: string,
    //   players?: string,
    // }>({
    //   query: ({ sortBy, query, categories, year, players }) => ({
    //     url: `games?sortBy=${sortBy}&query=${query}&categories=${categories}&year=${year}&players=${players}`,
    //   }),
    // }),
    addNewUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `users`,
        method: 'POST',
        body,
      }),
    }),
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
  useGetAllUsersQuery,
  useActivateUserQuery,
  useAddNewUserMutation,
  // useEditGameMutation,
} = UsersApi;
