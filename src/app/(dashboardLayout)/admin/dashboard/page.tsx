'use client';

import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import PageHeader from '@/components/shared/PageHeader';
import { useGetAdminDashboardMetadataQuery } from '@/redux/api/metadataApi';
import ManageUsersTable from '@/components/dashboard/admin/ManageUsersTable';
import AllNotesTable from '@/components/dashboard/admin/AllNotesTable';
import InterestsAggregationTable from '@/components/dashboard/admin/InterestsAggregationTable';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  BarChart3,
  Globe,
  ArrowRight,
  Server,
  Activity,
  CheckCircle2,
  FileText,
  PenSquare,
} from 'lucide-react';
import Link from 'next/link';

export type AdminDashboardTab =
  | 'manage-users'
  | 'all-notes'
  | 'interests-analytics'
  | 'overview';

export default function AdminDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  // Active tab state (default: 'manage-users' as required)
  const [activeTab, setActiveTab] = useState<AdminDashboardTab>('manage-users');

  // Fetch dedicated admin dashboard metadata with live refetchOnMountOrArgChange
  const { data: metadataResponse, isLoading: isMetadataLoading } =
    useGetAdminDashboardMetadataQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const metadata = metadataResponse?.data;

  // Personal admin counts
  const myNotesCount = metadata?.myNotesCount ?? 0;
  const myPostsCount = metadata?.myPostsCount ?? 0;

  // Platform governance counts
  const totalUsersCount = metadata?.totalUsersCount ?? 0;
  const totalNotesCount = metadata?.totalNotesCount ?? 0;
  const totalPostsCount = metadata?.totalPostsCount ?? 0;
  const totalCategoriesCount =
    metadata?.totalCategoriesCount ??
    metadata?.interestsCount ??
    (user?.interests?.length || 0);

  return (
    <div className="flex-1 flex flex-col space-y-5">
      {/* Shared Compact Page Header */}
      <PageHeader
        icon={LayoutDashboard}
        title="Admin Governance Dashboard"
        description="Platform oversight, user administration, global notes vault, and Scenario 1 aggregation."
        badge="Executive Admin"
        badgeColor="rose"
      >
        <Link
          href="/admin/dashboard/my-notes"
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>My Notes</span>
        </Link>
        <Link
          href="/admin/dashboard/posts"
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/25 transition flex items-center gap-1.5"
        >
          <PenSquare className="w-3.5 h-3.5" />
          <span>My Posts</span>
        </Link>
        <Link
          href="/#feed"
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition flex items-center gap-1.5"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Public Feed</span>
        </Link>
      </PageHeader>

      {/* KPI Telemetry Cards: My Notes, My Posts, System Users, All Notes, Posts, Interests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: My Notes */}
        <Link
          href="/admin/dashboard/my-notes"
          className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 text-left transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-300 transition">
              My Notes
            </span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span
              suppressHydrationWarning
              className="text-xl font-bold text-white tracking-tight"
            >
              {myNotesCount} {myNotesCount === 1 ? 'Note' : 'Notes'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-indigo-400 font-medium">Personal</span>
              <span>• ESR Vault</span>
            </p>
          </div>
        </Link>

        {/* Card 2: My Posts */}
        <Link
          href="/admin/dashboard/posts"
          className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 text-left transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 group-hover:text-cyan-300 transition">
              My Posts
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
              <PenSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span
              suppressHydrationWarning
              className="text-xl font-bold text-white tracking-tight"
            >
              {myPostsCount} {myPostsCount === 1 ? 'Post' : 'Posts'}
            </span>
            <p className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>$lookup Joined</span>
            </p>
          </div>
        </Link>

        {/* Card 3: System Users */}
        <button
          type="button"
          onClick={() => setActiveTab('manage-users')}
          className={`p-4 rounded-2xl bg-slate-900/60 border text-left transition group cursor-pointer ${
            activeTab === 'manage-users'
              ? 'border-rose-500/60 shadow-lg shadow-rose-950/20 ring-1 ring-rose-500/30'
              : 'border-white/10 hover:border-rose-500/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 group-hover:text-rose-300 transition">
              System Users
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span
              suppressHydrationWarning
              className="text-xl font-bold text-white tracking-tight"
            >
              {totalUsersCount} {totalUsersCount === 1 ? 'User' : 'Users'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-rose-400 font-medium">Directory</span>
              <span>• createdAt: -1</span>
            </p>
          </div>
        </button>

        {/* Card 4: Global Notes Vault */}
        <button
          type="button"
          onClick={() => setActiveTab('all-notes')}
          className={`p-4 rounded-2xl bg-slate-900/60 border text-left transition group cursor-pointer ${
            activeTab === 'all-notes'
              ? 'border-emerald-500/60 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/30'
              : 'border-white/10 hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 group-hover:text-emerald-300 transition">
              All Notes Vault
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span
              suppressHydrationWarning
              className="text-xl font-bold text-white tracking-tight"
            >
              {totalNotesCount} {totalNotesCount === 1 ? 'Note' : 'Notes'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-medium">Platform</span>
              <span>• Global ESR</span>
            </p>
          </div>
        </button>

        {/* Card 5: Community Posts */}
        <Link
          href="/admin/dashboard/posts"
          className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 text-left transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 group-hover:text-amber-300 transition">
              Total Posts
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span
              suppressHydrationWarning
              className="text-xl font-bold text-white tracking-tight"
            >
              {totalPostsCount} {totalPostsCount === 1 ? 'Post' : 'Posts'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Global Platform Feed
            </p>
          </div>
        </Link>

        {/* Card 6: Interests Aggregation (S1) */}
        <button
          type="button"
          onClick={() => setActiveTab('interests-analytics')}
          className={`p-4 rounded-2xl bg-slate-900/60 border text-left transition group cursor-pointer ${
            activeTab === 'interests-analytics'
              ? 'border-purple-500/60 shadow-lg shadow-purple-950/20 ring-1 ring-purple-500/30'
              : 'border-white/10 hover:border-purple-500/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 group-hover:text-purple-300 transition">
              Interests (S1)
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span
              suppressHydrationWarning
              className="text-xl font-bold text-white tracking-tight"
            >
              {totalCategoriesCount}{' '}
              {totalCategoriesCount === 1 ? 'Category' : 'Categories'}
            </span>
            <p className="text-[11px] text-purple-400 mt-1 font-mono">
              $unwind &amp; $group
            </p>
          </div>
        </button>
      </div>

      {/* Admin Tab Switcher Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('manage-users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'manage-users'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Manage Users</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all-notes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'all-notes'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>All Users&apos; Notes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('interests-analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'interests-analytics'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Interests Aggregation (S1)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Cluster & Overview</span>
        </button>
      </div>

      {/* Active Tab View Rendering */}
      <div>
        {activeTab === 'manage-users' && <ManageUsersTable />}

        {activeTab === 'all-notes' && <AllNotesTable />}

        {activeTab === 'interests-analytics' && <InterestsAggregationTable />}

        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Admin Operations Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('manage-users')}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-rose-500/40 transition group flex flex-col justify-between text-left cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/20 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition">
                    Manage Users Directory
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Paginated oversight of user registrations, security roles,
                    and user interest profiles.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-rose-400">
                  <span>Open Users Table ({totalUsersCount})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('all-notes')}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-emerald-500/40 transition group flex flex-col justify-between text-left cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                    All Users&apos; Notes
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Inspect encrypted notes across the entire platform with ESR
                    index enforcement.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>Open Notes Governance ({totalNotesCount})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('interests-analytics')}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-purple-500/40 transition group flex flex-col justify-between text-left cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20 group-hover:scale-105 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                    Interests Analytics (S1)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Dynamic category distribution generated by single-stage
                    $match, $unwind, and $group pipelines.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-purple-400">
                  <span>View S1 Aggregation ({totalCategoriesCount})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Cluster Telemetry Card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Database Cluster Telemetry
                    </h2>
                    <p className="text-xs text-slate-400">
                      Production Node & MongoDB Atlas Configuration
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  Cluster Healthy
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                  <span className="text-slate-400">Active Administrator:</span>
                  <p
                    suppressHydrationWarning
                    className="font-semibold text-white"
                  >
                    {user?.name} ({user?.email})
                  </p>
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
                  <p className="font-semibold text-indigo-300 font-mono">
                    $unwind & $lookup v7.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
