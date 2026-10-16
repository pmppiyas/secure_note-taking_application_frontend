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
    <div className="flex-1 flex flex-col space-y-4">
      {/* Top Stat Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Aggregated Categories</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white tracking-tight">
            {totalCategories} <span className="text-xs font-normal text-purple-300">unique</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
            $unwind &apos;$interests&apos;
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Interest Affiliations</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white tracking-tight">
            {totalUserInterests} <span className="text-xs font-normal text-cyan-300">matches</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
            $group: &#123; count: &#123; $sum: 1 &#125; &#125;
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Top Category</span>
            <BarChart3 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-lg font-bold text-amber-300 truncate tracking-tight">
            #{topInterest}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
            Highest member density
          </p>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter category or member name..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Refresh & Sort Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-950/60 hover:bg-slate-800 border border-white/10 transition cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
            <span>Sort: {sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}</span>
          </button>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/25 transition cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Shadcn UI Table Wrapper */}
      <div className="flex-1 flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md overflow-hidden min-h-[440px]">
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
          <div className="overflow-x-auto">
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
