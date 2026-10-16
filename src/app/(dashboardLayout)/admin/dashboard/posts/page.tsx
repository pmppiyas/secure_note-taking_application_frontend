'use client';

import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import {
  Globe,
  Database,
  Layers,
  ArrowRight,
  Search,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPostsPage() {
  return (
    <div className="space-y-6">
      {/* Shared Compact Page Header with Action Button */}
      <PageHeader
        icon={Globe}
        title="Public Posts & Relational Lookups"
        description="Global moderation feed and $lookup foreign key join pipeline inspection."
        badge="Pipeline S2"
        badgeColor="cyan"
      >
        <Link
          href="/#feed"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/25 transition"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Browse Feed</span>
        </Link>
      </PageHeader>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Community Feed</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">Public Posts</span>
            <p className="text-[11px] text-slate-400 mt-1">
              Live global posts visible to all platform members
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pipeline Type</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">$lookup Join</span>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              foreignField: userId
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Explore Feed</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <Link
              href="/#feed"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              <span>Browse Landing Page Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <p className="text-[11px] text-slate-400 mt-1">
              Paginated public activity
            </p>
          </div>
        </div>
      </div>

      {/* Public Posts Table Placeholder */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Posts Moderation & Relational Join</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect published community posts joined with author data.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search posts..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Posts & $lookup Join Table
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
            Community posts list, relational author aggregation viewer, and moderation controls will render here.
          </p>
        </div>
      </div>
    </div>
  );
}
