'use client';

import React, { useState } from 'react';
import { useGetAllNotesForAdminQuery } from '@/redux/api/noteApi';
import { Note } from '@/types';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import TablePagination from '@/components/ui/table-pagination';
import ViewNoteModal from '@/components/notes/ViewNoteModal';
import DeleteNoteModal from '@/components/notes/DeleteNoteModal';
import {
  FileText,
  Search,
  Calendar,
  User as UserIcon,
  Trash2,
  Eye,
  Inbox,
  Loader2,
  Shield,
  Layers,
} from 'lucide-react';

interface AllNotesTableProps {
  initialSearch?: string;
}

export default function AllNotesTable({ initialSearch = '' }: AllNotesTableProps) {
  // Pagination & Search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Modals state
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  // Fetch all notes across the platform via RTK Query
  const { data, isLoading, isFetching } = useGetAllNotesForAdminQuery({
    page,
    limit,
  });

  const notes = data?.data || [];
  const meta = data?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  // Filter notes client-side
  const filteredNotes = notes.filter((n) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchTitle = n.title?.toLowerCase().includes(q);
    const matchContent = n.content?.toLowerCase().includes(q);

    const author =
      typeof n.userId === 'object' && n.userId !== null ? n.userId : null;
    const matchAuthorName = author?.name?.toLowerCase().includes(q);
    const matchAuthorEmail = author?.email?.toLowerCase().includes(q);

    return matchTitle || matchContent || matchAuthorName || matchAuthorEmail;
  });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex-1 flex flex-col space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, content, or owner..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition"
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

        {/* Right side stats */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <span>Global Notes Vault:</span>
            <strong className="text-emerald-400 font-bold">{meta.total}</strong>
          </div>
        </div>
      </div>

      {/* Shadcn UI Table Wrapper */}
      <div className="flex-1 flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md overflow-hidden min-h-[440px]">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
            <span className="text-xs">Loading all platform notes...</span>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center mx-auto text-slate-500">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">No notes found</p>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery
                  ? 'No notes match your filter keywords.'
                  : 'No notes have been registered in the platform yet.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/60">
                <TableRow>
                  <TableHead className="w-[260px]">Title</TableHead>
                  <TableHead className="w-[300px]">Content Snippet</TableHead>
                  <TableHead className="w-[220px]">Owner Name & Email</TableHead>
                  <TableHead className="w-[130px]">Created Date</TableHead>
                  <TableHead className="w-[100px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotes.map((note) => {
                  const author =
                    typeof note.userId === 'object' && note.userId !== null
                      ? note.userId
                      : null;
                  const authorName = author?.name || 'Unknown User';
                  const authorEmail = author?.email || (typeof note.userId === 'string' ? `ID: ${note.userId.slice(-6)}` : 'N/A');

                  return (
                    <TableRow key={note._id} className="hover:bg-slate-800/40 transition">
                      {/* Title */}
                      <TableCell>
                        <button
                          type="button"
                          onClick={() => setViewingNote(note)}
                          className="flex items-start gap-2.5 text-left group cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform flex-shrink-0 mt-0.5">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-white group-hover:text-emerald-300 transition text-xs block line-clamp-1">
                              {note.title}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              ID: {note._id.slice(-6)}
                            </span>
                          </div>
                        </button>
                      </TableCell>

                      {/* Content Snippet */}
                      <TableCell>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {note.content}
                        </p>
                      </TableCell>

                      {/* Owner Name & Email */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 text-[10px] font-bold flex-shrink-0">
                            {authorName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-medium text-white block truncate">
                              {authorName}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono block truncate">
                              {authorEmail}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Created Date */}
                      <TableCell>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{formatDate(note.createdAt)}</span>
                        </span>
                      </TableCell>

                      {/* Action: View / Delete */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingNote(note)}
                            title="View Full Note"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingNote(note)}
                            title="Delete Note"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Shadcn TablePagination */}
        <div className="p-3.5 bg-slate-950/60 border-t border-white/5 mt-auto">
          <TablePagination
            page={page}
            limit={limit}
            total={meta.total}
            totalPages={meta.totalPages}
            onPageChange={(p) => setPage(p)}
            onLimitChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
            itemLabel="notes"
          />
        </div>
      </div>

      {/* Modals */}
      <ViewNoteModal
        note={viewingNote}
        isOpen={!!viewingNote}
        onClose={() => setViewingNote(null)}
        onDelete={(note) => {
          setViewingNote(null);
          setDeletingNote(note);
        }}
        canEdit={false}
      />

      <DeleteNoteModal
        note={deletingNote}
        isOpen={!!deletingNote}
        onClose={() => setDeletingNote(null)}
      />
    </div>
  );
}
