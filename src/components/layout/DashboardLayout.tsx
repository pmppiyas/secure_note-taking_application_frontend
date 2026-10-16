'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import ProtectedRoute from '@/components/providers/ProtectedRoute';
import { getRoutesByRole } from '@/routes/routes';
import { NavItem } from '@/types';
import {
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Globe,
  Users,
  BarChart3,
  LogOut,
  Home,
  Menu,
  X,
  User as UserIcon,
  Sparkles,
  PenSquare,
} from 'lucide-react';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  Globe,
  Users,
  ShieldCheck,
  BarChart3,
  Home,
  PenSquare,
};

const getIcon = (
  iconName?: string
): React.ComponentType<{ className?: string }> => {
  if (iconName && iconMap[iconName]) {
    return iconMap[iconName];
  }
  return FileText;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role?.toLowerCase() === 'admin';

  // Import navigation items dynamically by user role
  const navItems: NavItem[] = getRoutesByRole(user?.role);

  // Derive current page title from active route
  const currentRoute = navItems.find((item) => item.href === pathname);
  const currentTitle =
    currentRoute?.title || (isAdmin ? 'Admin Governance' : 'User Vault');

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('token');
    Cookies.remove('role');
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      {/* Outer Viewport Canvas */}
      <div className="h-screen w-full bg-[#030712] text-slate-100 flex justify-center overflow-hidden antialiased">
        {/* Ambient background lighting */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
        </div>

        {/* Unified Dashboard Frame: Keeps Sidebar and Content permanently attached and scaled on wide screens and zoom-out */}
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] h-screen flex overflow-hidden border-x border-white/5 shadow-2xl relative">
          <aside
            className={`${
              mobileMenuOpen
                ? 'fixed inset-y-0 left-0 w-72 z-50 bg-[#030712] border-r border-white/15 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200'
                : 'hidden'
            } md:flex md:w-64 lg:w-72 md:h-screen flex-shrink-0 border-r border-white/10 bg-slate-950/90 backdrop-blur-xl flex-col z-30`}
          >
            {/* Sidebar Top: Logo + Brand Title */}
            <div className="h-16 flex-shrink-0 flex items-center justify-between px-4 border-b border-white/10">
              <Link
                href="/"
                className="flex items-center gap-2.5 group min-w-0"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-extrabold bg-gradient-to-r from-white via-indigo-100 to-slate-200 bg-clip-text text-transparent truncate">
                    Secure Notes
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {isAdmin ? 'Admin Governance' : 'Encrypted Vault'}
                  </span>
                </div>
              </Link>

              {/* Mobile Close Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white md:hidden"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-indigo-400" />
              </button>
            </div>

            {/* Sidebar Middle (Scrollable if needed): User Info Card + Dynamic Nav Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* User Profile Card - Matches PageHeader height (72px) and styling exactly */}
              <div
                suppressHydrationWarning
                className="h-[72px] px-3.5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex items-center gap-3 flex-shrink-0"
              >
                <div
                  suppressHydrationWarning
                  className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm flex-shrink-0"
                >
                  {user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserIcon className="w-5 h-5" />
                  )}
                </div>
                <div suppressHydrationWarning className="min-w-0 flex-1">
                  <p
                    suppressHydrationWarning
                    className="text-xs font-bold text-white truncate"
                  >
                    {user?.name || 'Account'}
                  </p>
                  <p
                    suppressHydrationWarning
                    className="text-[11px] text-slate-400 truncate mt-0.5"
                  >
                    {user?.email || 'Loading...'}
                  </p>
                </div>
              </div>

              {/* Dynamic Navigation Items from routes/routes.ts */}
              <div>
                <div className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>{isAdmin ? 'Admin Navigation' : 'My Workspace'}</span>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item: NavItem) => {
                    const Icon = getIcon(item.iconName);
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                          isActive
                            ? isAdmin
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold shadow-sm'
                              : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 ${
                              isActive
                                ? isAdmin
                                  ? 'text-rose-400'
                                  : 'text-indigo-400'
                                : 'text-slate-400'
                            }`}
                          />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                              isActive
                                ? isAdmin
                                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40'
                                  : 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/40'
                                : 'bg-slate-800/80 text-slate-400 border border-slate-700/60'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Sidebar Bottom: Logout Account Button (Fixed at the bottom of h-screen sidebar) */}
            <div className="p-4 border-t border-white/10 flex-shrink-0 bg-slate-950">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Account</span>
              </button>
            </div>
          </aside>

          {/* Mobile Backdrop */}
          {mobileMenuOpen && (
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden"
            />
          )}

          {/* ========================================================================= */}
          {/* RIGHT AREA: Sticky Header + Dedicated Page Content Container             */}
          {/* ========================================================================= */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
            {/* Top Header */}
            <header className="h-16 flex-shrink-0 w-full bg-[#030712]/95 backdrop-blur-xl border-b border-white/10 shadow-sm shadow-black/40 z-20">
              <div className="w-full flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Mobile hamburger menu toggle + Breadcrumb */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 md:hidden"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-tight">
                      {isAdmin ? 'Admin Governance' : 'User Vault'}
                    </span>
                    <span className="text-slate-500 text-xs hidden sm:inline">
                      •
                    </span>
                    <span className="text-xs text-slate-400 capitalize hidden sm:inline">
                      {currentTitle}
                    </span>
                  </div>
                </div>

                {/* Right: Quick actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition"
                  >
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline">Home Feed</span>
                  </Link>

                  <span
                    suppressHydrationWarning
                    className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${
                      isAdmin
                        ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {user?.role?.toLowerCase() || (isAdmin ? 'admin' : 'user')}
                  </span>
                </div>
              </div>
            </header>

            {/* Main Content: ONLY this container scrolls when content overflows */}
            <main className="flex-1 overflow-y-auto pt-4 px-4 sm:px-6 lg:px-8 pb-16 focus:outline-none">
              <div className="w-full space-y-6">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
