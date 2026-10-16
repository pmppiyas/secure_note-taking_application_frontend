export type UserRole = 'USER' | 'ADMIN';

export interface NavItem {
  id?: string;
  title: string;
  href: string;
  iconName?: string;
  badge?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  interests: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  role?: UserRole;
  interests?: string[];
}

export interface UpdateUserPayload {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  interests?: string[];
}

export interface GetUsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string | { _id: string; name: string; email: string; role: UserRole };
  createdAt: string;
  updatedAt?: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
}

export interface UpdateNotePayload {
  title?: string;
  content?: string;
}

export interface GetNotesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface Post {
  _id: string;
  title: string;
  body: string;
  userId: string | { _id: string; name: string; email?: string; role?: UserRole };
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
}

export interface UpdatePostPayload {
  title?: string;
  body?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface InterestsGroupResult {
  interest: string;
  count: number;
  users: Array<Pick<User, '_id' | 'name' | 'email' | 'role'>>;
}

export interface UserWithPosts extends User {
  posts: Post[];
}

export interface DashboardMetadata {
  myNotesCount: number;
  myPostsCount: number;
  totalPostsCount: number;
  interestsCount: number;
  interests: string[];
  totalNotesCount?: number;
  totalUsersCount?: number;
  totalCategoriesCount?: number;
}
