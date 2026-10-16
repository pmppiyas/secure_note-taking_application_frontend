'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import PageHeader from '@/components/shared/PageHeader';
import {
  FileText,
  Plus,
  Search,
  Lock,
  Shield,
  Filter,
} from 'lucide-react';

export default function UserMyNotesPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-6">
      {/* Shared Compact Page Header with Action Button */}
      <PageHeader
        icon={FileText}
        title="My Notes"
        description="Filter and manage your private compound-indexed notes."
        badge="Vault"
        badgeColor="indigo"
      >
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Note</span>
        </button>
      </PageHeader>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Vault Total</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">Private Notes</span>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-medium">Compound Indexed</span>
              <span>• {`{ userId: 1, createdAt: -1 }`}</span>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Encryption Standard</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">Protected</span>
            <p className="text-[11px] text-slate-400 mt-1">
              Encrypted storage on MongoDB Atlas
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Authorization</span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight uppercase">
              {user?.role || 'User'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              Logged in as {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Notes Data Table Section */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Personal Notes Repository</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Encrypted documents indexed by user identification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search notes..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <button
              type="button"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 border border-white/10 hover:text-white"
              title="Filter"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clean Table Placeholder Card */}
        <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">
            My Notes Data Table
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
            Data table columns (Title, Preview, Created Date, Actions) and pagination controls will be connected here.
          </p>
        </div>
      </div>
    </div>
  );
}
