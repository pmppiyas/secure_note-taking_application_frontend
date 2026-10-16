import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function getDashboardRoute(role?: string | null): string {
  return role?.toLowerCase() === 'admin' ? '/admin/dashboard' : '/dashboard';
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  const isRoleAdmin = role?.toLowerCase() === 'admin';

  const isAuthPage =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/auth/login' ||
    pathname === '/auth/register';

  const isProtectedPath =
    pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    if (isAuthPage) {
      return NextResponse.redirect(
        new URL(getDashboardRoute(role), request.url)
      );
    }

    if (!isRoleAdmin && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isRoleAdmin && pathname === '/dashboard') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/auth/login',
    '/auth/register',
  ],
};

export default proxy;
