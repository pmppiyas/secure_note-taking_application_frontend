'use client';

import { useAppSelector } from '@/redux/hooks';
import PageHeader from '@/components/shared/PageHeader';
import {
  LayoutDashboard,
  FileText,
  Globe,
  Database,
  ArrowRight,
  Shield,
  User as UserIcon,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function UserOverviewPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-6">
      {/* Shared Compact Page Header */}
      <PageHeader
        icon={LayoutDashboard}
        title="Vault Overview"
        description="Personal encrypted telemetry, compound indexing, and account summary."
        badge="Personal Vault"
        badgeColor="indigo"
      >
        <Link
          href="/dashboard/my-notes"
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>My Notes</span>
        </Link>
        <Link
          href="/dashboard/posts"
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition flex items-center gap-1.5"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Public Posts</span>
        </Link>
      </PageHeader>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Private Vault
            </span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              Active
            </span>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Compound Indexed</span>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Index Rule
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm font-bold font-mono text-cyan-300 tracking-tight">
              {`{ userId: 1, createdAt: -1 }`}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              ESR compound performance
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Account Tier
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span
              suppressHydrationWarning
              className="text-2xl font-bold text-white tracking-tight uppercase"
            >
              {user?.role || 'USER'}
            </span>
            <p
              suppressHydrationWarning
              className="text-[11px] text-slate-400 mt-1 truncate"
            >
              {user?.email}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Interests
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              {user?.interests?.length || 0} Categories
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Multikey indexed tags
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: User Profile Details + Dedicated Pages Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div
          suppressHydrationWarning
          className="lg:col-span-1 p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-4"
        >
          <div className="flex items-center gap-3">
            <div
              suppressHydrationWarning
              className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-base"
            >
              {user?.name ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <h3
                suppressHydrationWarning
                className="text-sm font-bold text-white truncate"
              >
                {user?.name}
              </h3>
              <p
                suppressHydrationWarning
                className="text-xs text-slate-400 truncate"
              >
                {user?.email}
              </p>
              <span
                suppressHydrationWarning
                className="inline-block mt-1 text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-300"
              >
                {user?.role}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
            <div className="flex justify-between py-1 text-slate-300">
              <span className="text-slate-500">Security Tier:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                JWT Verified
              </span>
            </div>
            <div className="flex justify-between py-1 text-slate-300">
              <span className="text-slate-500">Storage Mode:</span>
              <span className="font-semibold text-slate-200">
                MongoDB Atlas
              </span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              My Interests:
            </span>
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
                <span className="text-slate-500 text-xs italic">
                  No interests selected
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dedicated Page Feature Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/my-notes"
            className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-indigo-500/40 transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                Manage Private Notes
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Access your private encrypted notes list with search filters and
                ESR compound indexing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-indigo-400">
              <span>Open Vault Page</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/dashboard/posts"
            className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-500/40 transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                Community Posts & $lookup
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Explore relational foreign key joins uniting authors and
                published posts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400">
              <span>View Feed Join Page</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
