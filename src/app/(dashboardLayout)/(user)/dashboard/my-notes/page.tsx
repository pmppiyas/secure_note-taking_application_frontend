'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import PageHeader from '@/components/shared/PageHeader';
import PaginationControls from '@/components/shared/PaginationControls';
import CreateNoteModal from '@/components/notes/CreateNoteModal';
import ViewNoteModal from '@/components/notes/ViewNoteModal';
import EditNoteModal from '@/components/notes/EditNoteModal';
import DeleteNoteModal from '@/components/notes/DeleteNoteModal';
import { useGetMyNotesQuery } from '@/redux/api/noteApi';
import { Note } from '@/types';
import {
  FileText,
  Plus,
  Search,
  Lock,
  Shield,
  LayoutGrid,
  List,
  Eye,
  Edit3,
  Trash2,
  Calendar,
  Sparkles,
  Inbox,
} from 'lucide-react';

export default function UserMyNotesPage() {
  const { user } = useAppSelector((state) => state.auth);

  // Pagination & view state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  // RTK Query hook with server pagination
  const { data, isLoading, isFetching } = useGetMyNotesQuery({
    page,
    limit,
  });

  const notes = data?.data || [];
  const meta = data?.meta || {
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 1,
  };

  // Filter notes client-side for rapid search
  const filteredNotes = notes.filter((n) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
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
      {/* Shared Compact Page Header with New Note Action */}
      <PageHeader
        icon={FileText}
        title="My Notes"
        description="Encrypted private notes optimized with ESR compound indexes."
        badge="Vault"
        badgeColor="indigo"
      >
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Note</span>
        </button>
      </PageHeader>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Vault Total</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              {meta.total} {meta.total === 1 ? 'Note' : 'Notes'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-medium">ESR Compliant</span>
              <span>• {`{ userId: 1, createdAt: -1 }`}</span>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Current Scope</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              Page {meta.page} of {meta.totalPages || 1}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Limit: {meta.limit} notes per page
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Account Access</span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight uppercase">
              {user?.role || 'User'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {user?.email || 'Authenticated User'}
            </p>
          </div>
        </div>
      </div>

      {/* Notes Container */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-5">
        {/* Top Controls: Search, View Mode Toggle, Create button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Personal Notes Repository</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Strictly filtered by your verified userId.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 w-44 sm:w-56"
              />
            </div>

            {/* Grid vs Table View Mode */}
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-sm'
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
                    ? 'bg-indigo-600 text-white shadow-sm'
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
                <div className="h-4 bg-white/10 rounded w-2/3"></div>
                <div className="h-3 bg-white/5 rounded w-full"></div>
                <div className="h-3 bg-white/5 rounded w-4/5"></div>
                <div className="pt-2 flex justify-between items-center">
                  <div className="h-3 bg-white/5 rounded w-20"></div>
                  <div className="h-5 bg-white/10 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredNotes.length === 0 && (
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
              <Inbox className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-white">
              {searchQuery ? 'No matching notes found' : 'No notes in your vault yet'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
              {searchQuery
                ? `No notes match "${searchQuery}". Try a different keyword.`
                : 'Create your first encrypted note to leverage MongoDB compound indexing and secure storage.'}
            </p>
            {!searchQuery && (
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="mt-5 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Your First Note</span>
              </button>
            )}
          </div>
        )}

        {/* Content: Grid View */}
        {!isLoading && filteredNotes.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="group relative p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 hover:bg-slate-900/80 transition flex flex-col justify-between shadow-lg shadow-black/20"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-indigo-300 transition line-clamp-1">
                      {note.title}
                    </h3>
                    <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex-shrink-0">
                      <Lock className="w-3 h-3" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {note.content}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(note.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition">
                    <button
                      type="button"
                      onClick={() => setViewingNote(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingNote(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition"
                      title="Edit Note"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingNote(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content: Table View */}
        {!isLoading && filteredNotes.length > 0 && viewMode === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Content Preview</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredNotes.map((note) => (
                  <tr
                    key={note._id}
                    className="hover:bg-white/[0.03] transition group"
                  >
                    <td className="py-3 px-4 font-semibold text-white whitespace-nowrap max-w-[200px] truncate">
                      {note.title}
                    </td>
                    <td className="py-3 px-4 text-slate-400 max-w-[320px] truncate">
                      {note.content}
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {formatDate(note.createdAt)}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setViewingNote(note)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingNote(note)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingNote(note)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
          itemLabel="notes"
        />

        {/* Submitting / Fetching overlay indicator */}
        {isFetching && !isLoading && (
          <div className="text-right text-[11px] text-slate-500 italic">
            Synchronizing with MongoDB Atlas...
          </div>
        )}
      </div>

      {/* CRUD Modals */}
      <CreateNoteModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <ViewNoteModal
        note={viewingNote}
        isOpen={!!viewingNote}
        onClose={() => setViewingNote(null)}
        onEdit={(n) => setEditingNote(n)}
        onDelete={(n) => setDeletingNote(n)}
        canEdit={true}
      />

      <EditNoteModal
        note={editingNote}
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
      />

      <DeleteNoteModal
        note={deletingNote}
        isOpen={!!deletingNote}
        onClose={() => setDeletingNote(null)}
      />
    </div>
  );
}
