'use client';

import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import {
  Users,
  Plus,
  Search,
  ShieldCheck,
  Server,
  Filter,
} from 'lucide-react';

export default function AdminManageUsersPage() {
  return (
    <div className="space-y-6">
      {/* Shared Compact Page Header with Action Button */}
      <PageHeader
        icon={Users}
        title="Manage Users"
        description="Full platform user directory indexed by createdAt with role management."
        badge="Directory"
        badgeColor="rose"
      >
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/25 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </button>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Directory</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">User Directory</span>
            <p className="text-[11px] text-slate-400 mt-1">
              Index sorted by <code className="text-rose-400">createdAt: -1</code>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Access Level</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight uppercase">
              Admin Governance
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Full CRUD & user oversight
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Endpoint</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">GET /users</span>
            <p className="text-[11px] text-slate-400 mt-1">
              Secure route protected by JWT
            </p>
          </div>
        </div>
      </div>

      {/* Directory Table Section */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-400" />
              <span>Registered Accounts Directory</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect user registrations, emails, security roles, and user interests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50"
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

        {/* Directory Table Placeholder Card */}
        <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">
            User Directory Table
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
            Columns (Name, Email, Role, Interests, Created Date, Actions) and pagination controls will be connected here.
          </p>
        </div>
      </div>
    </div>
  );
}
