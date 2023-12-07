import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isProduction } from '../../env';
import { Review } from '../../types/Review';

const BASE_URL = isProduction
  ? 'https://testps.onrender.com'
  : 'http://localhost:5020'

export const ReviewsApi = createApi({
  reducerPath: 'ReviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    getAllReviews: builder.query<Review[], void>({
      query: () => 'reviews'
    }),
    addReview: builder.mutation<Review, Partial<Review>>({
      query: (body) => ({
        url: `reviews`,
        method: 'POST',
        body,
      }),
    }),
    editReview: builder.mutation<Review, Partial<Review>>({
      query: (body) => ({
        url: `reviews`,
        method: 'PATCH',
        body,
      }),
    }),
  })
})

export const {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useEditReviewMutation,
} = ReviewsApi;
