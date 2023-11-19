import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';

type tokens = {
  accessToken: string,
  refreshToken: string,
}

export const UsersApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://testps.onrender.com'
    baseUrl: 'http://localhost:5020'
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => 'users'
    }),
    getOneUser: builder.query<User[], string>({
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
