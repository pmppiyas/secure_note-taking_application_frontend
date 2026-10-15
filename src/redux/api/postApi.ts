import { apiSlice } from './apiSlice';
import { ApiResponse, Post, UserWithPosts } from '@/types';

export interface GetPostsQueryParams {
  page?: number;
  limit?: number;
}

export interface CreatePostPayload {
  title: string;
  body: string;
}

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<ApiResponse<Post[]>, GetPostsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        const qs = queryParams.toString();
        return `/posts${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Post' as const, id: _id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    getUserPostsLookup: builder.query<ApiResponse<UserWithPosts>, string>({
      query: (userId) => `/posts/user/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: 'Post', id: `USER_${userId}` }],
    }),

    createPost: builder.mutation<ApiResponse<Post>, CreatePostPayload>({
      query: (payload) => ({
        url: '/posts',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetUserPostsLookupQuery,
  useCreatePostMutation,
} = postApi;

export default postApi;
