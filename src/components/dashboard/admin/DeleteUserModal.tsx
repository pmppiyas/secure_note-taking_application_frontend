'use client';

import React from 'react';
import { useDeleteUserMutation } from '@/redux/api/userApi';
import { User } from '@/types';
import { X, Trash2, Loader2, AlertTriangle } from 'lucide-react';

interface DeleteUserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeleteUserModal({
  isOpen,
  user,
  onClose,
  onSuccess,
}: DeleteUserModalProps) {
  const [deleteUser, { isLoading, error }] = useDeleteUserMutation();

  if (!isOpen || !user) return null;

  const handleDelete = async () => {
    try {
      await deleteUser(user._id).unwrap();
      if (onSuccess) onSuccess();
      onClose();
    } catch {
      // Handled in UI
    }
  };

  const getErrorMessage = () => {
    if (error && 'data' in error) {
      const errData = error.data as { message?: string };
      return errData.message || 'Failed to delete user. Please try again.';
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete User Account</h3>
              <p className="text-xs text-slate-400">This action is permanent and irreversible</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {getErrorMessage() && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {getErrorMessage()}
          </div>
        )}

        <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">User Name:</span>
            <span className="font-semibold text-white">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Email:</span>
            <span className="font-semibold text-white">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Role:</span>
            <span className="font-semibold text-rose-300 uppercase">{user.role}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Are you sure you want to delete user <strong className="text-white">{user.name}</strong>?
          Their access token will be invalidated and this account will be permanently purged from MongoDB.
        </p>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 border border-white/10 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Account</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
