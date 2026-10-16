'use client';

import React, { useState } from 'react';
import { Note } from '@/types';
import {
  X,
  FileText,
  Calendar,
  Lock,
  Edit3,
  Trash2,
  Copy,
  Check,
  User,
} from 'lucide-react';

interface ViewNoteModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
  canEdit?: boolean;
}

export default function ViewNoteModal({
  note,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  canEdit = true,
}: ViewNoteModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !note) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(note.createdAt).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const author =
    typeof note.userId === 'object' && note.userId !== null
      ? note.userId
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/15 shadow-2xl shadow-black/80 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/90 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white tracking-tight truncate">
                {note.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {formattedDate}
                </span>
                {note.updatedAt && note.updatedAt !== note.createdAt && (
                  <span className="text-slate-500 italic">• edited</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center gap-1 text-xs"
              title="Copy note content"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Copy</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Author Badge if populated (Admin view) */}
          {author && (
            <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-white">{author.name}</span>
                  <span className="text-slate-400 ml-2">({author.email})</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold uppercase">
                {author.role}
              </span>
            </div>
          )}

          {/* Main content */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans select-text">
            {note.content}
          </div>

          {/* Security & Indexing telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
              <span className="text-[11px] text-slate-500 block mb-1">Index Spec (ESR)</span>
              <div className="flex items-center gap-1.5 text-indigo-300 font-mono text-[11px]">
                <Lock className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                <code>{`{ userId: 1, createdAt: -1 }`}</code>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
              <span className="text-[11px] text-slate-500 block mb-1">Record ID</span>
              <code className="text-slate-300 font-mono text-[11px] truncate block">
                {note._id}
              </code>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3.5 border-t border-white/10 flex items-center justify-between bg-slate-900/90 flex-shrink-0">
          <div className="flex items-center gap-2">
            {canEdit && onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(note);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-white/10 transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Edit</span>
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onDelete(note);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Delete</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
