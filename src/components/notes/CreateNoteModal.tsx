'use client';

import React, { useState } from 'react';
import { useCreateNoteMutation } from '@/redux/api/noteApi';
import { X, Lock, Plus, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateNoteModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationError, setValidationError] = useState('');

  const [createNote, { isLoading, error }] = useCreateNoteMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Please enter a note title.');
      return;
    }
    if (!content.trim()) {
      setValidationError('Please provide content for the note.');
      return;
    }

    try {
      await createNote({
        title: title.trim(),
        content: content.trim(),
      }).unwrap();

      setTitle('');
      setContent('');
      if (onSuccess) onSuccess();
      onClose();
    } catch {
      // RTK Query error handled in UI
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (error && 'data' in error) {
      const errData = error.data as { message?: string };
      return errData.message || 'Failed to create note. Please try again.';
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
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Create Secure Note</h3>
              <p className="text-[11px] text-slate-400">Add an encrypted record to your private vault</p>
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
            <label htmlFor="note-title" className="block text-xs font-medium text-slate-300">
              Note Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="note-title"
              type="text"
              placeholder="e.g. Q3 Security Protocol Review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="note-content" className="block text-xs font-medium text-slate-300">
                Encrypted Content <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-slate-500">{content.length} chars</span>
            </div>
            <textarea
              id="note-content"
              rows={5}
              placeholder="Write your confidential thoughts, credentials, or documentation here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-y leading-relaxed"
            />
          </div>

          {/* Compound Index Pill */}
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 text-indigo-300">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Compound Indexed:</span>
            </div>
            <code className="text-indigo-200 font-mono text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              {`{ userId: 1, createdAt: -1 }`}
            </code>
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Encrypting & Saving...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Save Note</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
