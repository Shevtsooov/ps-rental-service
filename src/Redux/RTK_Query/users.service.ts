import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';
import { isProduction } from '../../env';

type tokens = {
  accessToken: string,
  refreshToken: string,
}

const BASE_URL = isProduction
  ? 'https://testps.onrender.com'
  : 'http://localhost:5020'

export const UsersApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => 'users'
    }),
    getOneUser: builder.query<User, string>({
      query: (id) => `users/${id}`
    }),
    activateUser: builder.query<void, string>({
      query: (activationToken) => `activation/${activationToken}`
    }),

    loginUser: builder.mutation
    <
      { 
        accessToken: string,
        user: User,
      }, 
      {
        email: string,
        password: string,
      }
    >
    ({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),

    addNewUser: builder.mutation
    <
      { 
        tokens: tokens,
        user: User,
      }, 
      {
        email: string,
        password: string,
      }
    >
    ({
      query: (body) => ({
        url: 'registration',
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
  useGetOneUserQuery,
  useActivateUserQuery,
  useLoginUserMutation,
  useAddNewUserMutation,
  useEditUserMutation,
} = UsersApi;
