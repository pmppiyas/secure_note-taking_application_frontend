'use client';

import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import {
  ShieldCheck,
  Search,
  Filter,
  Layers,
  Database,
} from 'lucide-react';

export default function AdminAllNotesPage() {
  return (
    <div className="space-y-6">
      {/* Shared Compact Page Header with Action Button */}
      <PageHeader
        icon={ShieldCheck}
        title="All Users' Notes"
        description="Global encrypted notes vault inspection utilizing ESR compound indexes."
        badge="Vault Governance"
        badgeColor="amber"
      >
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/25 transition cursor-pointer"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filter by User</span>
        </button>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Compound Index</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm font-bold font-mono text-amber-300 tracking-tight">
              {`{ userId: 1, createdAt: -1 }`}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Active index on MongoDB Notes collection
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">ESR Optimization</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">Enforced</span>
            <p className="text-[11px] text-slate-400 mt-1">
              Equality (userId) + Sort (createdAt: -1)
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Global Scope</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">All Vaults</span>
            <p className="text-[11px] text-slate-400 mt-1">
              Administrative cross-user audit visibility
            </p>
          </div>
        </div>
      </div>

      {/* Global Notes Table Section */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Platform Notes Governance</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect notes across all accounts with userId mapping and audit capabilities.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search all notes..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Global Notes Table
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
            All users&apos; notes table with author IDs, previews, timestamps, and index telemetry will be wired up here.
          </p>
        </div>
      </div>
    </div>
  );
}
