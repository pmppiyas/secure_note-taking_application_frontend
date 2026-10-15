export type UserRole = 'USER' | 'ADMIN';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  interests: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string | { _id: string; name: string; email: string; role: UserRole };
  createdAt: string;
  updatedAt?: string;
}

export interface Post {
  _id: string;
  title: string;
  body: string;
  userId: string | { _id: string; name: string; email?: string };
  createdAt: string;
  updatedAt?: string;
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
