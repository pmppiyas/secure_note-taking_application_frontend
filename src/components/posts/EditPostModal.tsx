'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '@/types';
import { useUpdatePostMutation } from '@/redux/api/postApi';
import { X, Edit3, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface EditPostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditPostModal({
  post,
  isOpen,
  onClose,
  onSuccess,
}: EditPostModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [validationError, setValidationError] = useState('');

  const [updatePost, { isLoading, error }] = useUpdatePostMutation();

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setBody(post.body || '');
      setValidationError('');
    }
  }, [post, isOpen]);

  if (!isOpen || !post) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Please enter a post title.');
      return;
    }
    if (!body.trim()) {
      setValidationError('Please provide content for the post.');
      return;
    }

    try {
      await updatePost({
        id: post._id,
        payload: {
          title: title.trim(),
          body: body.trim(),
        },
      }).unwrap();

      if (onSuccess) onSuccess();
      onClose();
    } catch {
      // Handled via RTK error
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (error && 'data' in error) {
      const errData = error.data as { message?: string };
      return errData.message || 'Failed to update post. Please try again.';
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-white/15 shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Edit Public Post</h3>
              <p className="text-[11px] text-slate-400">Update your community discussion post</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="edit-post-title" className="block text-xs font-medium text-slate-300">
              Post Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="edit-post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="edit-post-body" className="block text-xs font-medium text-slate-300">
                Post Content / Body <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-slate-500">{body.length} chars</span>
            </div>
            <textarea
              id="edit-post-body"
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-y leading-relaxed"
            />
          </div>

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
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/30 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Update Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
