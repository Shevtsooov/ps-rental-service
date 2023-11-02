import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';

export const UsersApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5020'
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => 'users'
    }),
    activateUser: builder.query<void, string>({
      query: (activationToken) => `activation/${activationToken}`
    }),

    loginUser: builder.mutation
    <
      { 
        accessToken: string,
        normalizedUser: Partial<User>,
      }, 
      {
        email: string,
        password: string,
      }
    >
    ({
      query: (body) => ({
        url: `authentication`,
        method: 'POST',
        body,
      }),
    }),

    addNewUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `users`,
        method: 'POST',
        body,
      }),
    }),
    editUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `users`,
        method: 'PATCH',
        body,
      }),
    }),
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
  useLoginUserMutation,
  useAddNewUserMutation,
  // useEditGameMutation,
} = UsersApi;
