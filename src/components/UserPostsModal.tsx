'use client';

import { useGetUserPostsLookupQuery } from '@/redux/api/postApi';
import { Post } from '@/types';
import { X, Mail, Tag, FileText, Clock, Sparkles, Loader2 } from 'lucide-react';

export interface UserPostsModalProps {
  userId: string | null;
  onClose: () => void;
}

export default function UserPostsModal({
  userId,
  onClose,
}: UserPostsModalProps) {
  const { data, isLoading, isError } = useGetUserPostsLookupQuery(
    userId || '',
    {
      skip: !userId,
    }
  );

  if (!userId) return null;

  const user = data?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                User & Posts ($lookup)
              </h3>
              <p className="text-xs text-slate-400">
                Single MongoDB aggregation pipeline with Stage 2:{' '}
                <code className="text-indigo-400">$lookup</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
              <p className="text-sm">Fetching user & aggregated posts...</p>
            </div>
          ) : isError || !user ? (
            <div className="py-12 text-center">
              <p className="text-red-400 text-sm font-medium">
                Failed to load user posts. Please try again.
              </p>
            </div>
          ) : (
            <>
              {/* User Profile Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold text-lg shadow-md shadow-indigo-500/20">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {user.name}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      user.role === 'ADMIN'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                {/* Interests Tags */}
                {user.interests && user.interests.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-800/80">
                    <Tag className="h-3 w-3 text-slate-400 mr-1" />
                    <span className="text-xs text-slate-400">Interests:</span>
                    {user.interests.map((interest: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[11px] rounded-md bg-slate-800/90 text-slate-300 px-2 py-0.5 border border-slate-700/60 font-medium"
                      >
                        #{interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Posts Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-400" />
                    Posts by {user.name} ({user.posts?.length || 0})
                  </h4>
                </div>

                {!user.posts || user.posts.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-slate-500 text-sm">
                    No posts published by this user yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user.posts.map((post: Post) => (
                      <div
                        key={post._id}
                        className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 transition hover:border-slate-700"
                      >
                        <h5 className="font-semibold text-slate-100 text-sm mb-1">
                          {post.title}
                        </h5>
                        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line mb-3">
                          {post.body}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>
                            {new Date(post.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 px-6 py-3.5 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
