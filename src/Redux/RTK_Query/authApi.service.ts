import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';
import { isProduction } from '../../env';

const BASE_URL = isProduction
  ? 'https://testps.onrender.com'
  : 'http://localhost:5020';

interface ErrorDetails {
  data: string;
  error: string;
  originalStatus: number;
  status: string;
}

interface ErrorResponse {
  error: ErrorDetails;
}

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation
    <
      { 
        accessToken: string,
        refreshToken: string,
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

    activateUser: builder.query
    <
      { 
        accessToken: string,
        refreshToken: string,
        user: User,
      },
      string
    >({
      query: (activationToken) => `activation/${activationToken}`
    }),

    loginUser: builder.mutation
    <
      { 
        accessToken: string,
        refreshToken: string,
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
        credentials: 'include',
      }),
    }),

    refreshUser: builder.mutation<{ 
      accessToken: string,
      refreshToken: string,
      user: User,
    }, { refreshToken: string }>({
      query: (body) => ({
        url: 'refresh',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),

    logOutUser: builder.mutation<{token: string}, { refreshToken: string }>({
      query: (body) => ({
        url: 'logout',
        method: 'POST',
        body,
      }),
    }),

  })
})

export const {
  useRegisterUserMutation,
  useActivateUserQuery,
  useLoginUserMutation,
  useRefreshUserMutation,
  useLogOutUserMutation,
} = AuthApi;
