'use client';

import React from 'react';
import { Post } from '@/types';
import { useDeletePostMutation } from '@/redux/api/postApi';
import { AlertTriangle, Loader2, Trash2, X } from 'lucide-react';

interface DeletePostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeletePostModal({
  post,
  isOpen,
  onClose,
  onSuccess,
}: DeletePostModalProps) {
  const [deletePost, { isLoading, error }] = useDeletePostMutation();

  if (!isOpen || !post) return null;

  const handleDelete = async () => {
    try {
      await deletePost(post._id).unwrap();
      if (onSuccess) onSuccess();
      onClose();
    } catch {
      // Handled via RTK error
    }
  };

  const getErrorMessage = () => {
    if (error && 'data' in error) {
      const errData = error.data as { message?: string };
      return errData.message || 'Failed to delete post. Please try again.';
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-rose-500/30 shadow-2xl shadow-rose-950/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Delete Post
              </h3>
              <p className="text-[11px] text-slate-400">
                Irreversible action from public feed
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
              {errorMessage}
            </div>
          )}

          <p className="text-sm text-slate-300 leading-relaxed">
            Are you sure you want to delete{' '}
            <strong className="text-white font-semibold">"{post.title}"</strong>
            ? This will permanently remove it from the public feed and MongoDB
            Atlas.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Confirm Delete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
