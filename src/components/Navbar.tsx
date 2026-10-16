'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import {
  ShieldCheck,
  User as UserIcon,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'feed' | null>(
    'home'
  );

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === '/') {
        const feedElement = document.getElementById('feed');
        if (feedElement) {
          const rect = feedElement.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection('feed');
            return;
          }
        }
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    router.push('/auth/login');
  };

  const closeMobile = () => setMobileMenuOpen(false);

  const isFeedActive = pathname === '/' && activeSection === 'feed';
  const isHomeActive = pathname === '/' && activeSection === 'home';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 shadow-md shadow-black/30 transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl 2xl:max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-white hover:opacity-90 transition group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-white via-indigo-100 to-slate-200 bg-clip-text text-transparent">
            Secure Notes
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
          {/* Home Link */}
          <Link
            href="/"
            onClick={() => setActiveSection('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
              isHomeActive
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Home
          </Link>

          {/* Public Feed Link */}
          <Link
            href="/#feed"
            onClick={() => setActiveSection('feed')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
              isFeedActive
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Public Feed
          </Link>

          {/* Authenticated Links */}
          {isAuthenticated && (
            <>
              {user?.role === 'ADMIN' ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
                      pathname?.startsWith('/admin/dashboard')
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Admin Dashboard
                  </Link>

                  <Link
                    href="/admin/dashboard/interests-analytics"
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
                      pathname === '/admin/dashboard/interests-analytics'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/40 font-extrabold'
                        : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
                    }`}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Interests (S1)</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
                    pathname?.startsWith('/dashboard')
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/80 py-1.5 pl-3 pr-4 shadow-sm backdrop-blur-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <UserIcon className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-200 leading-tight">
                    {user.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase leading-none ${
                      user.role === 'ADMIN'
                        ? 'text-amber-400'
                        : 'text-indigo-400'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition shadow-sm"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/auth/login"
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-900/80 px-4 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-white transition backdrop-blur-sm"
              >
                <LogIn className="h-3.5 w-3.5 text-slate-400" />
                <span>Login</span>
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 px-5 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/35 hover:from-indigo-500 hover:to-indigo-400 transition"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#030712]/95 backdrop-blur-2xl px-4 pt-3 pb-6 md:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => {
                setActiveSection('home');
                closeMobile();
              }}
              className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                isHomeActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>Home</span>
              {isHomeActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </Link>

            <Link
              href="/#feed"
              onClick={() => {
                setActiveSection('feed');
                closeMobile();
              }}
              className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                isFeedActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>Public Feed</span>
              {isFeedActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'ADMIN' ? (
                  <>
                    <Link
                      href="/admin/dashboard"
                      onClick={closeMobile}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                        pathname?.startsWith('/admin/dashboard')
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <span>Admin Dashboard</span>
                      {pathname?.startsWith('/admin/dashboard') && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </Link>

                    <Link
                      href="/admin/dashboard/interests-analytics"
                      onClick={closeMobile}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                        pathname === '/admin/dashboard/interests-analytics'
                          ? 'bg-amber-500 text-slate-950 font-extrabold'
                          : 'text-amber-400 hover:bg-slate-900'
                      }`}
                    >
                      <span>Interests (S1)</span>
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={closeMobile}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                      pathname === '/dashboard'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span>Dashboard</span>
                    {pathname === '/dashboard' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </Link>
                )}

                <div className="mt-3 border-t border-white/10 pt-3">
                  <div className="mb-3 flex items-center justify-between px-3">
                    <span className="text-sm font-semibold text-slate-200">
                      {user?.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase rounded-md px-2 py-0.5 ${
                        user?.role === 'ADMIN'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      }`}
                    >
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/20"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                <Link
                  href="/auth/login"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/auth/register"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
