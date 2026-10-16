'use client';

import React, { useState } from 'react';
import { useGetGroupByInterestsQuery } from '@/redux/api/userApi';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  BarChart3,
  Sparkles,
  Users,
  Search,
  RefreshCw,
  Loader2,
  Inbox,
  Shield,
  Layers,
  Database,
  ArrowUpDown,
} from 'lucide-react';

interface InterestsAggregationTableProps {
  initialSearch?: string;
}

export default function InterestsAggregationTable({
  initialSearch = '',
}: InterestsAggregationTableProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Scenario 1: Aggregation pipeline ($match -> $unwind -> $group)
  const { data, isLoading, isFetching, refetch } = useGetGroupByInterestsQuery();

  const rawGroups = data?.data || [];

  // Filter groups by interest or matched user name/email
  const filteredGroups = rawGroups
    .filter((group) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchInterest = group.interest?.toLowerCase().includes(q);
      const matchUsers = group.users?.some(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      );
      return matchInterest || matchUsers;
    })
    .sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.count - a.count;
      }
      return a.count - b.count;
    });

  const totalCategories = rawGroups.length;
  const totalUserInterests = rawGroups.reduce((acc, curr) => acc + curr.count, 0);
  const topInterest = rawGroups.length > 0 ? rawGroups[0].interest : 'N/A';

  return (
    <div className="space-y-6">
      {/* Top Stat Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Aggregated Categories */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Aggregated Categories
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              {totalCategories} {totalCategories === 1 ? 'Category' : 'Categories'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
              <span className="text-purple-400 font-medium">$unwind</span>
              <span>• &apos;$interests&apos;</span>
            </p>
          </div>
        </div>

        {/* Card 2: Interest Affiliations */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Interest Affiliations
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              {totalUserInterests} {totalUserInterests === 1 ? 'Match' : 'Matches'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
              <span className="text-cyan-400 font-medium">$group</span>
              <span>• &#123; count: &#123; $sum: 1 &#125; &#125;</span>
            </p>
          </div>
        </div>

        {/* Card 3: Top Category */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Top Category
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-amber-300 tracking-tight truncate block">
              #{topInterest}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-amber-400 font-medium">Dense Cluster</span>
              <span>• Scenario 1</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Aggregation Container (Matching My Notes and Posts) */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Interests Distribution Registry</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Aggregated categories computed via single-pipeline $match → $unwind → $group.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search category or member..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 w-44 sm:w-56"
              />
            </div>

            <button
              type="button"
              onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 transition cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
              <span>{sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}</span>
            </button>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/25 transition cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
            <span className="text-xs">Computing MongoDB aggregation pipeline...</span>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center mx-auto text-slate-500">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">No interest categories found</p>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery
                  ? 'No categories match your search keywords.'
                  : 'Users need to select interests to populate the aggregation pipeline.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 overflow-hidden bg-slate-950/40">
            <Table>
              <TableHeader className="bg-slate-950/60">
                <TableRow>
                  <TableHead className="w-[220px]">Interest / Category</TableHead>
                  <TableHead className="w-[160px]">Total Users Count</TableHead>
                  <TableHead>Matched Users</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => (
                  <TableRow key={group.interest} className="hover:bg-slate-800/40 transition">
                    {/* Interest / Category */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-white text-xs block">
                            #{group.interest}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Multikey Indexed
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Total Users Count */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-xs font-mono">
                          {group.count} {group.count === 1 ? 'User' : 'Users'}
                        </span>
                      </div>
                    </TableCell>

                    {/* Matched Users (chips/badges showing user names and emails) */}
                    <TableCell>
                      <div className="flex flex-wrap gap-2 py-1">
                        {group.users && group.users.length > 0 ? (
                          group.users.map((matchedUser) => {
                            const isAdmin = matchedUser.role?.toUpperCase() === 'ADMIN';
                            return (
                              <div
                                key={matchedUser._id}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-white/10 text-xs shadow-sm hover:border-purple-500/30 transition group"
                              >
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                                    isAdmin
                                      ? 'bg-rose-500/20 text-rose-300'
                                      : 'bg-indigo-500/20 text-indigo-300'
                                  }`}
                                >
                                  {matchedUser.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-white group-hover:text-purple-300 transition text-[11px]">
                                  {matchedUser.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  ({matchedUser.email})
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-xs text-slate-500 italic">
                            No matched users
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
