'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import PaginationControls from '@/components/shared/PaginationControls';
import { useGetAllPostsQuery } from '@/redux/api/postApi';
import CreatePostModal from '@/components/CreatePostModal';
import UserPostsModal from '@/components/UserPostsModal';
import {
  Globe,
  Database,
  Layers,
  Search,
  Plus,
  User as UserIcon,
  Calendar,
  LayoutGrid,
  List,
  Eye,
  Inbox,
  Sparkles,
} from 'lucide-react';

export default function UserPostsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: postsResponse, isLoading, isFetching } = useGetAllPostsQuery({
    page,
    limit,
  });

  const posts = postsResponse?.data || [];
  const meta = postsResponse?.meta || {
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 1,
  };

  const getAuthor = (userId: any) => {
    if (typeof userId === 'object' && userId !== null) {
      return {
        id: userId._id,
        name: userId.name || 'Anonymous User',
        email: userId.email || '',
      };
    }
    return {
      id: String(userId),
      name: 'Community Contributor',
      email: '',
    };
  };

  const filteredPosts = posts.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const author = getAuthor(p.userId);
    return (
      p.title.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      author.name.toLowerCase().includes(q) ||
      author.email.toLowerCase().includes(q)
    );
  });

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Shared Compact Page Header */}
      <PageHeader
        icon={Globe}
        title="Community Posts"
        description="Explore technical discussions joined with author profiles via MongoDB $lookup."
        badge="Feed Join"
        badgeColor="cyan"
      >
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/25 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Post</span>
        </button>
      </PageHeader>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Discussions</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              {meta.total} {meta.total === 1 ? 'Post' : 'Posts'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Live global posts in MongoDB Atlas
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
              users.posts → foreignField: userId
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Current Scope</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              Page {meta.page} of {meta.totalPages || 1}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Limit: {meta.limit} posts per page
            </p>
          </div>
        </div>
      </div>

      {/* Community Feed Section */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Community Feed & Aggregations</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Posts joined with author information through server-side pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter by title, content, author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-52 sm:w-64"
              />
            </div>

            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition ${
                  viewMode === 'grid'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition ${
                  viewMode === 'table'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-900/60 border border-white/5 animate-pulse space-y-3"
              >
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/5 rounded w-full"></div>
                <div className="h-3 bg-white/5 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 shadow-inner">
              <Inbox className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-white">
              {searchQuery ? 'No matching posts found' : 'No posts in feed yet'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
              {searchQuery
                ? `No posts match "${searchQuery}". Try a different keyword.`
                : 'Publish the first community post to initiate the relational $lookup pipeline.'}
            </p>
            {!searchQuery && (
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="mt-5 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create First Post</span>
              </button>
            )}
          </div>
        )}

        {/* Content: Grid View */}
        {!isLoading && filteredPosts.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map((post) => {
              const author = getAuthor(post.userId);
              return (
                <div
                  key={post._id}
                  className="group relative p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80 transition flex flex-col justify-between shadow-lg shadow-black/20"
                >
                  <div className="space-y-3">
                    {/* Author chip */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/5">
                      <button
                        type="button"
                        onClick={() => setSelectedUserId(author.id)}
                        className="flex items-center gap-1.5 min-w-0 text-left hover:opacity-80 transition group/author"
                        title="View author profile and $lookup join"
                      >
                        <div className="w-5 h-5 rounded bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-3 h-3" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-300 group-hover/author:text-cyan-300 truncate">
                          {author.name}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedUserId(author.id)}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-0.5"
                      >
                        <span>$lookup</span>
                        <Eye className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-300 transition line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {post.body}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedUserId(author.id)}
                      className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content: Table View */}
        {!isLoading && filteredPosts.length > 0 && viewMode === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Content Preview</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Relational Join</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredPosts.map((post) => {
                  const author = getAuthor(post.userId);
                  return (
                    <tr
                      key={post._id}
                      className="hover:bg-white/[0.03] transition group"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                            <UserIcon className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-semibold text-white block">
                              {author.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              {author.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-white max-w-[220px] truncate">
                        {post.title}
                      </td>

                      <td className="py-3 px-4 text-slate-400 max-w-[300px] truncate">
                        {post.body}
                      </td>

                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {formatDate(post.createdAt)}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedUserId(author.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View User & Posts</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Server-Side Pagination Controls */}
        <PaginationControls
          page={meta.page}
          limit={meta.limit}
          total={meta.total}
          totalPages={meta.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => setLimit(newLimit)}
          itemLabel="posts"
        />

        {isFetching && !isLoading && (
          <div className="text-right text-[11px] text-slate-500 italic">
            Synchronizing community discussions...
          </div>
        )}
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <UserPostsModal
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />
    </div>
  );
}
