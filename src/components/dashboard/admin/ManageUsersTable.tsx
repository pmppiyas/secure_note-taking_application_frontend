'use client';

import React, { useState } from 'react';
import { useGetAllUsersQuery } from '@/redux/api/userApi';
import { User } from '@/types';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import TablePagination from '@/components/ui/table-pagination';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import {
  Users,
  Plus,
  Search,
  Shield,
  User as UserIcon,
  Edit,
  Trash2,
  Sparkles,
  Loader2,
  Calendar,
  Inbox,
  CheckCircle2,
} from 'lucide-react';

interface ManageUsersTableProps {
  initialSearch?: string;
}

export default function ManageUsersTable({ initialSearch = '' }: ManageUsersTableProps) {
  // Pagination & Search state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  // Fetch users with RTK Query
  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    page,
    limit,
  });

  const users = data?.data || [];
  const meta = data?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  // Filter users by client search (name, email, role, or interest)
  const filteredUsers = users.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchName = u.name?.toLowerCase().includes(q);
    const matchEmail = u.email?.toLowerCase().includes(q);
    const matchRole = u.role?.toLowerCase().includes(q);
    const matchInterests = u.interests?.some((i) => i.toLowerCase().includes(q));
    return matchName || matchEmail || matchRole || matchInterests;
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
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
            placeholder="Search by name, email, interest..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/60 transition"
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

        {/* Right side stats + Add User button */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5 font-mono">
            <span>Total Accounts:</span>
            <strong className="text-white font-bold">{meta.total}</strong>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/25 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Shadcn UI Table Wrapper */}
      <div className="flex-1 flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md overflow-hidden min-h-[440px]">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
            <span className="text-xs">Loading user directory...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center mx-auto text-slate-500">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">No users found</p>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery
                  ? 'Try searching with different keywords.'
                  : 'Get started by creating the first system user.'}
              </p>
            </div>
            {!searchQuery && (
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add User</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/60">
                <TableRow>
                  <TableHead className="w-[240px]">User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[120px]">Role</TableHead>
                  <TableHead>Interests</TableHead>
                  <TableHead className="w-[130px]">Created</TableHead>
                  <TableHead className="w-[110px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const isAdmin = user.role?.toUpperCase() === 'ADMIN';
                  return (
                    <TableRow key={user._id} className="hover:bg-slate-800/40 transition">
                      {/* Name & Avatar */}
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border ${
                              isAdmin
                                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                                : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                            }`}
                          >
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-white block truncate text-xs">
                              {user.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {user._id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Email */}
                      <TableCell>
                        <span className="text-xs text-slate-300 font-mono">
                          {user.email}
                        </span>
                      </TableCell>

                      {/* Role Badge */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                            isAdmin
                              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                              : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                          }`}
                        >
                          {isAdmin ? (
                            <Shield className="w-3 h-3" />
                          ) : (
                            <UserIcon className="w-3 h-3" />
                          )}
                          <span>{user.role}</span>
                        </span>
                      </TableCell>

                      {/* Interests Badges */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {user.interests && user.interests.length > 0 ? (
                            user.interests.slice(0, 3).map((interest, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] whitespace-nowrap"
                              >
                                #{interest}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-[11px] italic">
                              None
                            </span>
                          )}
                          {user.interests && user.interests.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px]">
                              +{user.interests.length - 3}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Created Date */}
                      <TableCell>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{formatDate(user.createdAt)}</span>
                        </span>
                      </TableCell>

                      {/* Actions: Edit / Delete */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingUser(user)}
                            title="Edit User"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20 transition cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingUser(user)}
                            title="Delete User"
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
            itemLabel="users"
          />
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <EditUserModal
        isOpen={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
      />

      <DeleteUserModal
        isOpen={!!deletingUser}
        user={deletingUser}
        onClose={() => setDeletingUser(null)}
      />
    </div>
  );
}
