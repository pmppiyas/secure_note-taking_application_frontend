'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/providers/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import {
  FileText,
  Plus,
  Share2,
  Shield,
  User as UserIcon,
  LogOut,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function UserDashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
      <div className="flex-1 bg-slate-950 text-slate-100 flex flex-col">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900/80 border border-slate-800 shadow-xl">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Protected Vault</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome, {user?.name || 'User'}!
              </h1>
              <p className="text-sm text-slate-400">
                Manage your private encrypted notes and participate in the community feed.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4 text-indigo-400" />
                <span>Public Feed</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Profile & Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Profile Details</h2>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Role:</span>
                  <span className="font-semibold text-indigo-400 uppercase">
                    {user?.role}
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-400 block mb-1">Interests:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {user?.interests && user.interests.length > 0 ? (
                      user.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-[11px] border border-indigo-500/20"
                        >
                          #{interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500 italic">No interests added</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Private Notes Vault</h2>
                  <p className="text-xs text-slate-400">Strict compound indexing</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Your notes are privately indexed with `{'{ userId: 1, createdAt: -1 }'}` so other users cannot access them.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Encrypted on MongoDB Atlas</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Community Posts</h2>
                  <p className="text-xs text-slate-400">Indexed for fast lookups</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                View all published community posts on the landing page or inspect relational author data.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                <span>Browse Community Feed →</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
