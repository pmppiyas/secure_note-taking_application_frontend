import { apiSlice } from './apiSlice';
import { ApiResponse, DashboardMetadata } from '@/types';

export const metadataApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardMetadata: builder.query<ApiResponse<DashboardMetadata>, void>({
      query: () => ({
        url: '/metadata',
        method: 'GET',
      }),
      providesTags: ['Metadata'],
    }),
  }),
});

export const { useGetDashboardMetadataQuery } = metadataApi;
