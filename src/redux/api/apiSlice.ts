import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import type { RootState } from '../store';

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // First check Redux state
      const token =
        (getState() as RootState).auth?.token ||
        Cookies.get('token') ||
        (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Note', 'Post', 'Auth'],
  endpoints: () => ({}),
});

export default apiSlice;
