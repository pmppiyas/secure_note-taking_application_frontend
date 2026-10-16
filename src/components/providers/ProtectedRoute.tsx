'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { UserRole } from '@/types';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  useEffect(() => {
    if (!isClientReady) return;

    // 1. Not authenticated -> redirect to login
    if (!isAuthenticated || !token || !user) {
      router.replace('/auth/login');
      return;
    }

    // 2. Role restriction check
    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = (user.role || '').toUpperCase() as UserRole;
      const isAllowed = allowedRoles.some(
        (role) => role.toUpperCase() === userRole
      );

      if (!isAllowed) {
        // If regular user tried to access admin page, bounce to user dashboard
        if (userRole === 'USER') {
          router.replace('/dashboard');
        } else {
          router.replace('/admin/dashboard');
        }
      }
    }
  }, [isClientReady, isAuthenticated, token, user, allowedRoles, router]);

  // Loading state while checking authentication
  if (!isClientReady || !isAuthenticated || !token || !user) {
    return (
      <>
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
          <p className="text-sm font-medium tracking-wide">
            Verifying authorization...
          </p>
        </div>
        <div className="hidden" aria-hidden="true">
          {children}
        </div>
      </>
    );
  }

  // Check if role is forbidden before rendering children
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.role || '').toUpperCase() as UserRole;
    const isAllowed = allowedRoles.some((role) => role.toUpperCase() === userRole);

    if (!isAllowed) {
      return (
        <>
          <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Access Restricted</h2>
            <p className="text-sm text-slate-400 max-w-md">
              You do not have permission to view this resource. Redirecting to your assigned dashboard...
            </p>
          </div>
          <div className="hidden" aria-hidden="true">
            {children}
          </div>
        </>
      );
    }
  }

  return <>{children}</>;
}
