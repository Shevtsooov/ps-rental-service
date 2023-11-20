import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../../types/Order';

export const OrdersApi = createApi({
  reducerPath: 'OrdersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://testps.onrender.com'
    // baseUrl: 'http://localhost:5020'
  }),
  endpoints: (builder) => ({
    getAllOrders: builder.query<Order[], void>({
      query: () => 'orders'
    }),
    getUserOrders: builder.query<Order[], string>({
      query: (id) => `orders/${id}`
    }),

    addNewOrder: builder.mutation
    <
      { 
        Order: Order,
      }, 
      {
        bookedDays?: string[],
        orderedGames?: string[],
        deliveryOption?: string,
        deliveryAddress?: string,
        userId?: string,
        orderStatus?: string,
        sumOfOrder?: number,
        userComment?: string,
        adminComment?: string,
        isArchived?: boolean,
      }
    >
    ({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),

    editOrder: builder.mutation<Order, Partial<Order>>({
      query: (body) => ({
        url: `orders`,
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
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useAddNewOrderMutation,
  useEditOrderMutation,
} = OrdersApi;
