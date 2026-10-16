import { apiSlice } from './apiSlice';
import { ApiResponse, DashboardMetadata } from '@/types';

export const metadataApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Standard user dashboard metadata: GET /metadata
    getDashboardMetadata: builder.query<ApiResponse<DashboardMetadata>, void>({
      query: () => ({
        url: '/metadata',
        method: 'GET',
      }),
      providesTags: ['Metadata'],
    }),

    // Dedicated admin dashboard metadata: GET /metadata/admin
    getAdminDashboardMetadata: builder.query<ApiResponse<DashboardMetadata>, void>({
      query: () => ({
        url: '/metadata/admin',
        method: 'GET',
      }),
      providesTags: ['Metadata'],
    }),
  }),
});

export const {
  useGetDashboardMetadataQuery,
  useGetAdminDashboardMetadataQuery,
} = metadataApi;
