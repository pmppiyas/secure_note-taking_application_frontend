import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { User } from '@/types';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const getInitialAuth = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }

  const token = Cookies.get('token') || localStorage.getItem('token') || null;
  let user: User | null = null;

  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
      // Ensure role cookie is synchronized if user exists in storage
      if (user?.role && !Cookies.get('role')) {
        Cookies.set('role', user.role, { expires: 7, sameSite: 'lax' });
      }
    }
  } catch (err) {
    console.error('Error parsing stored user:', err);
    user = null;
  }

  return {
    user,
    token,
    isAuthenticated: Boolean(token && user),
  };
};

const initialState: AuthState = getInitialAuth();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      if (typeof window !== 'undefined') {
        Cookies.set('token', token, { expires: 7, sameSite: 'lax' });
        if (user.role) {
          Cookies.set('role', user.role, { expires: 7, sameSite: 'lax' });
        }
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        if (action.payload.role) {
          Cookies.set('role', action.payload.role, {
            expires: 7,
            sameSite: 'lax',
          });
        }
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        Cookies.remove('token');
        Cookies.remove('role');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
