'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { useGetAllPostsQuery } from '@/redux/api/postApi';
import { Post } from '@/types';
import UserPostsModal from '@/components/UserPostsModal';
import CreatePostModal from '@/components/CreatePostModal';
import {
  ShieldCheck,
  Lock,
  Layers,
  Database,
  ArrowRight,
  PlusCircle,
  Clock,
  User as UserIcon,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const isAuth = mounted && isAuthenticated;

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: postsResponse,
    isLoading,
    isFetching,
  } = useGetAllPostsQuery({
    page: currentPage,
    limit: 6,
  });

  const posts = postsResponse?.data || [];
  const meta = postsResponse?.meta;

  const getAuthorId = (author: any): string => {
    if (!author) return '';
    if (typeof author === 'string') return author;
    return author._id || '';
  };

  const getAuthorName = (author: any): string => {
    if (!author) return 'Anonymous';
    if (typeof author === 'string') return 'User';
    return author.name || 'Anonymous';
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>
              Service-Oriented Modular Architecture & MongoDB Aggregations
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Secure Note-Taking &{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Community Posts
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A production-ready platform featuring JWT Role-Based Access Control,
            compound ESR indexing, operational error handling, and
            high-performance MongoDB aggregation pipelines.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {isAuth ? (
              <>
                <Link
                  href="/dashboard/my-notes"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 transition transform hover:-translate-y-0.5"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Go to My Notes</span>
                </Link>
                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="h-4 w-4 text-indigo-400" />
                  <span>Publish New Post</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/register"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 transition transform hover:-translate-y-0.5"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition transform hover:-translate-y-0.5"
                >
                  <span>Sign In</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Architecture Highlights */}
      <section className="py-16 border-b border-slate-900 bg-slate-950/40">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                RBAC Security
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict JWT authentication with role authorization for both{' '}
                <code className="text-indigo-400">USER</code> and{' '}
                <code className="text-amber-400">ADMIN</code> tiers.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                ESR Compound Indexes
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero redundant indexes. Note queries are optimized by{' '}
                <code className="text-cyan-400">
                  {'{ userId: 1, createdAt: -1 }'}
                </code>{' '}
                following ESR rules.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Scenario 1 Aggregation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Single <code className="text-purple-400">$match</code>,{' '}
                <code className="text-purple-400">$unwind</code>, and{' '}
                <code className="text-purple-400">$group</code> query
                classifying users by interests.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Scenario 2 ($lookup)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Joins users and their published posts in one aggregation
                pipeline with indexed foreign keys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Public Posts Feed Section */}
      <section id="feed" className="py-20 flex-1">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                <Database className="h-3.5 w-3.5" />
                <span>Live MongoDB Collection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Public Community Feed
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Public posts sorted newest first with pagination and author
                aggregation inspection.
              </p>
            </div>

            {isAuth && (
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="self-start sm:self-auto flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create Post</span>
              </button>
            )}
          </div>

          {/* Posts Feed Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 animate-pulse space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-800" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 bg-slate-800 rounded w-1/3" />
                      <div className="h-2.5 bg-slate-800 rounded w-1/4" />
                    </div>
                  </div>
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-800 rounded" />
                    <div className="h-3 bg-slate-800 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 p-12 text-center">
              <Database className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-200">
                No public posts yet
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Be the first to publish a post to the community feed.
              </p>
              {isAuth ? (
                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Create First Post</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                >
                  <span>Log In to Post</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {posts.map((post: Post) => {
                const authorId = getAuthorId(post.userId);
                const authorName = getAuthorName(post.userId);

                return (
                  <article
                    key={post._id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-950/20"
                  >
                    <div>
                      {/* Author Header */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <button
                          onClick={() =>
                            authorId && setSelectedUserId(authorId)
                          }
                          disabled={!authorId}
                          className="flex items-center gap-2.5 text-left group transition hover:opacity-90"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 font-bold text-xs border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition">
                            {authorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition block">
                              {authorName}
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                              <Clock className="h-2.5 w-2.5" />
                              {new Date(post.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        </button>

                        <button
                          onClick={() =>
                            authorId && setSelectedUserId(authorId)
                          }
                          disabled={!authorId}
                          title="View all posts by this user via $lookup"
                          className="flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 transition"
                        >
                          <Eye className="h-3 w-3" />
                          <span>$lookup</span>
                        </button>
                      </div>

                      {/* Post Content */}
                      <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line line-clamp-4">
                        {post.body}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Post ID: {post._id.slice(-6)}</span>
                      <button
                        onClick={() => authorId && setSelectedUserId(authorId)}
                        disabled={!authorId}
                        className="text-indigo-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>User History</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900 pt-6">
              <span className="text-xs text-slate-400">
                Showing Page <strong className="text-white">{meta.page}</strong>{' '}
                of <strong className="text-white">{meta.totalPages}</strong> (
                {meta.total} total posts)
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage <= 1 || isFetching}
                  className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1 px-2 text-xs font-medium text-slate-400">
                  {meta.page} / {meta.totalPages}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, meta.totalPages)
                    )
                  }
                  disabled={currentPage >= meta.totalPages || isFetching}
                  className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium text-slate-400">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <span>Secure Note-Taking & Posts App</span>
          </div>
          <p>© 2026 Built with Next.js, Redux Toolkit, and MongoDB.</p>
        </div>
      </footer>

      {/* Modals */}
      <UserPostsModal
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
}
