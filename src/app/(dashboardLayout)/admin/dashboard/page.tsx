'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import PageHeader from '@/components/shared/PageHeader';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  BarChart3,
  Globe,
  Database,
  Layers,
  ArrowRight,
  Server,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-6">
      {/* Shared Compact Page Header */}
      <PageHeader
        icon={LayoutDashboard}
        title="Admin Overview"
        description="System governance telemetry, indexing health, and active pipelines."
        badge="Admin Governance"
        badgeColor="rose"
      >
        <Link
          href="/admin/dashboard/manage-users"
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/25 transition flex items-center gap-1.5"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Manage Users</span>
        </Link>
        <Link
          href="/#feed"
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition flex items-center gap-1.5"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Public Feed</span>
        </Link>
      </PageHeader>

      {/* Executive KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">User Directory</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">System Users</span>
            <p className="text-[11px] text-slate-400 mt-1">
              Indexed by <code className="text-rose-400">createdAt: -1</code>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Notes Index</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm font-bold font-mono text-emerald-300 tracking-tight">
              {`{ userId: 1, createdAt: -1 }`}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Compound ESR optimization
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Scenario 1 ($unwind)</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">Interests Aggregation</span>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              {`{ interests: 1 }`} Multikey
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Scenario 2 ($lookup)</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">Relational Joins</span>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              foreignField: userId
            </p>
          </div>
        </div>
      </div>

      {/* Quick Admin Operations Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link
          href="/admin/dashboard/manage-users"
          className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-rose-500/40 transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/20 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition">
              Manage Users Directory
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Paginated oversight of user registrations, security roles, and user interest profiles.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-rose-400">
            <span>Open User Directory Page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/dashboard/all-notes"
          className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-amber-500/40 transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
              All Users&apos; Notes
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Inspect encrypted notes across the entire platform with ESR index enforcement.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Open Notes Governance Page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/dashboard/interests-analytics"
          className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-purple-500/40 transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
              Interests Analytics (S1)
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Dynamic category distribution generated by single-stage $match, $unwind, and $group pipelines.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-purple-400">
            <span>Open Aggregation Telemetry Page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Cluster Telemetry Card */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Database Cluster Telemetry</h2>
              <p className="text-xs text-slate-400">Production Node & MongoDB Atlas Configuration</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Cluster Healthy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Active Admin:</span>
            <p suppressHydrationWarning className="font-semibold text-white">{user?.name} ({user?.email})</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Security Architecture:</span>
            <p className="font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Role Guarded (ADMIN)
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Aggregation Engines:</span>
            <p className="font-semibold text-indigo-300">$unwind & $lookup v7.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
