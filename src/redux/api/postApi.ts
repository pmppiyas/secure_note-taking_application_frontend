import { apiSlice } from './apiSlice';
import {
  ApiResponse,
  Post,
  UserWithPosts,
  CreatePostPayload,
  UpdatePostPayload,
} from '@/types';

export interface GetPostsQueryParams {
  page?: number;
  limit?: number;
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

    getPostById: builder.query<ApiResponse<Post>, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation<ApiResponse<Post>, CreatePostPayload>({
      query: (payload) => ({
        url: '/posts',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Post', 'Metadata'],
    }),

    updatePost: builder.mutation<
      ApiResponse<Post>,
      { id: string; payload: UpdatePostPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Post', 'Metadata'],
    }),

    deletePost: builder.mutation<ApiResponse<Post>, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'Metadata'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetUserPostsLookupQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;

export default postApi;
