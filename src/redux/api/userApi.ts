import { apiSlice } from './apiSlice';
import {
  ApiResponse,
  User,
  CreateUserPayload,
  UpdateUserPayload,
  GetUsersQueryParams,
  InterestsGroupResult,
} from '@/types';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Admin: Get all registered users with pagination
    getAllUsers: builder.query<ApiResponse<User[]>, GetUsersQueryParams | void>({
      query: (params) => ({
        url: '/users',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'User' as const,
                id: _id,
              })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // Admin: Create a new user
    createUser: builder.mutation<ApiResponse<User>, CreateUserPayload>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'User', id: 'LIST' },
        'User',
        'Metadata',
      ],
    }),

    // Admin: Update user by ID
    updateUser: builder.mutation<ApiResponse<User>, UpdateUserPayload>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
        'User',
        'Metadata',
      ],
    }),

    // Admin: Delete user by ID
    deleteUser: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
        'User',
        'Metadata',
      ],
    }),

    // Scenario 1 Aggregation: Group users by interests ($match -> $unwind -> $group)
    getGroupByInterests: builder.query<ApiResponse<InterestsGroupResult[]>, void>({
      query: () => ({
        url: '/users/group-by-interests',
        method: 'GET',
      }),
      providesTags: [{ type: 'User', id: 'INTERESTS_GROUP' }, 'User'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetGroupByInterestsQuery,
} = userApi;
