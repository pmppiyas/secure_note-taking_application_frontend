'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import PaginationControls from '@/components/shared/PaginationControls';
import ViewNoteModal from '@/components/notes/ViewNoteModal';
import EditNoteModal from '@/components/notes/EditNoteModal';
import DeleteNoteModal from '@/components/notes/DeleteNoteModal';
import CreateNoteModal from '@/components/notes/CreateNoteModal';
import { useGetAllNotesAdminQuery } from '@/redux/api/noteApi';
import { Note } from '@/types';
import {
  ShieldCheck,
  Search,
  Database,
  Layers,
  Eye,
  Trash2,
  Calendar,
  User,
  Plus,
  Inbox,
  LayoutGrid,
  List,
} from 'lucide-react';

export default function AdminAllNotesPage() {
  // Pagination & view state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  // RTK Query admin hook with server pagination
  const { data, isLoading, isFetching } = useGetAllNotesAdminQuery({
    page,
    limit,
  });

  const notes = data?.data || [];
  const meta = data?.meta || {
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  };

  // Filter notes client-side based on search query
  const filteredNotes = notes.filter((n) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const author =
      typeof n.userId === 'object' && n.userId !== null ? n.userId : null;
    const authorName = author?.name?.toLowerCase() || '';
    const authorEmail = author?.email?.toLowerCase() || '';

    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      authorName.includes(q) ||
      authorEmail.includes(q)
    );
  });

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Shared Compact Page Header */}
      <PageHeader
        icon={ShieldCheck}
        title="All Users' Notes"
        description="Global encrypted notes vault inspection utilizing ESR compound indexes."
        badge="Vault Governance"
        badgeColor="amber"
      >
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/25 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Note</span>
        </button>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Notes in System</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              {meta.total} {meta.total === 1 ? 'Record' : 'Records'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Active documents across all registered accounts
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Compound Index Spec</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm font-bold font-mono text-emerald-300 tracking-tight">
              {`{ userId: 1, createdAt: -1 }`}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              ESR optimization applied to user queries
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pagination Scope</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">
              Page {meta.page} of {meta.totalPages || 1}
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Limit: {meta.limit} per page (Server paginated)
            </p>
          </div>
        </div>
      </div>

      {/* Global Notes Table Section */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Platform Notes Governance</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect notes across all accounts with author details and compound index audit.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search by title, author, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 w-52 sm:w-64"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition ${
                  viewMode === 'table'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition ${
                  viewMode === 'grid'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-slate-900/60 border border-white/5 animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredNotes.length === 0 && (
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Inbox className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-white">
              {searchQuery ? 'No matching notes found' : 'No notes registered in platform'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
              {searchQuery
                ? `No notes match "${searchQuery}". Try a different keyword.`
                : 'As users create notes, their encrypted records will appear here for administrative oversight.'}
            </p>
          </div>
        )}

        {/* Content: Table View */}
        {!isLoading && filteredNotes.length > 0 && viewMode === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Content Preview</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredNotes.map((note) => {
                  const author =
                    typeof note.userId === 'object' && note.userId !== null
                      ? note.userId
                      : null;
                  return (
                    <tr
                      key={note._id}
                      className="hover:bg-white/[0.03] transition group"
                    >
                      {/* Author */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-semibold text-white block">
                              {author ? author.name : 'Unknown User'}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              {author ? author.email : String(note.userId)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-3 px-4 font-semibold text-white max-w-[200px] truncate">
                        {note.title}
                      </td>

                      {/* Content Preview */}
                      <td className="py-3 px-4 text-slate-400 max-w-[260px] truncate">
                        {note.content}
                      </td>

                      {/* Created Date */}
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {formatDate(note.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setViewingNote(note)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingNote(note)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Content: Grid View */}
        {!isLoading && filteredNotes.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => {
              const author =
                typeof note.userId === 'object' && note.userId !== null
                  ? note.userId
                  : null;
              return (
                <div
                  key={note._id}
                  className="group relative p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 hover:bg-slate-900/80 transition flex flex-col justify-between shadow-lg shadow-black/20"
                >
                  <div className="space-y-3">
                    {/* Author chip */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-5 h-5 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-300 truncate">
                          {author ? author.name : 'Unknown User'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {author ? author.role : 'USER'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-amber-300 transition line-clamp-1">
                      {note.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {note.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setViewingNote(note)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                        title="Inspect Note"
                      >
                        <Eye className="w-3.5 h-3.5" />
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
              );
            })}
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

        {isFetching && !isLoading && (
          <div className="text-right text-[11px] text-slate-500 italic">
            Synchronizing administrative records...
          </div>
        )}
      </div>

      {/* Modals */}
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
