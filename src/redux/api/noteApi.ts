import { apiSlice } from './apiSlice';
import {
  ApiResponse,
  Note,
  CreateNotePayload,
  UpdateNotePayload,
  GetNotesQueryParams,
} from '@/types';

export const noteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // User: Fetch own notes with pagination
    getMyNotes: builder.query<ApiResponse<Note[]>, GetNotesQueryParams | void>({
      query: (params) => ({
        url: '/notes/my-notes',
        params: params || undefined,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Note' as const,
                id: _id,
              })),
              { type: 'Note', id: 'LIST' },
            ]
          : [{ type: 'Note', id: 'LIST' }],
    }),

    // Admin: Fetch all notes with pagination and populated author
    getAllNotesAdmin: builder.query<
      ApiResponse<Note[]>,
      GetNotesQueryParams | void
    >({
      query: (params) => ({
        url: '/notes/all',
        params: params || undefined,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Note' as const,
                id: _id,
              })),
              { type: 'Note', id: 'ADMIN_LIST' },
            ]
          : [{ type: 'Note', id: 'ADMIN_LIST' }],
    }),

    // Get single note by ID
    getNoteById: builder.query<ApiResponse<Note>, string>({
      query: (id) => ({
        url: `/notes/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Note', id }],
    }),

    // Create a new secure note
    createNote: builder.mutation<ApiResponse<Note>, CreateNotePayload>({
      query: (payload) => ({
        url: '/notes',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        { type: 'Note', id: 'LIST' },
        { type: 'Note', id: 'ADMIN_LIST' },
        'Metadata',
      ],
    }),

    // Update note
    updateNote: builder.mutation<
      ApiResponse<Note>,
      { id: string; payload: UpdateNotePayload }
    >({
      query: ({ id, payload }) => ({
        url: `/notes/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Note', id },
        { type: 'Note', id: 'LIST' },
        { type: 'Note', id: 'ADMIN_LIST' },
        'Metadata',
      ],
    }),

    // Delete note
    deleteNote: builder.mutation<ApiResponse<Note>, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Note', id },
        { type: 'Note', id: 'LIST' },
        { type: 'Note', id: 'ADMIN_LIST' },
        'Metadata',
      ],
    }),
  }),
});

export const {
  useGetMyNotesQuery,
  useGetAllNotesAdminQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApi;

export default noteApi;
