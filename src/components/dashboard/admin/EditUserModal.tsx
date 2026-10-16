'use client';

import React, { useState, useEffect } from 'react';
import { useUpdateUserMutation } from '@/redux/api/userApi';
import { PREDEFINED_INTERESTS } from '@/constants/interests';
import { User, UserRole } from '@/types';
import {
  X,
  Edit3,
  Loader2,
  AlertCircle,
  Shield,
  Mail,
  Lock,
  User as UserIcon,
  Sparkles,
  Check,
} from 'lucide-react';

interface EditUserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('USER');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [validationError, setValidationError] = useState('');

  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setRole(user.role || 'USER');
      setSelectedInterests(user.interests || []);
      setPassword('');
      setValidationError('');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Please enter a user name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (password && password.length < 6) {
      setValidationError('Password must be at least 6 characters long if changed.');
      return;
    }

    try {
      const payload: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        interests: string[];
        password?: string;
      } = {
        id: user._id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        interests: selectedInterests,
      };

      if (password.trim()) {
        payload.password = password.trim();
      }

      await updateUser(payload).unwrap();

      if (onSuccess) onSuccess();
      onClose();
    } catch {
      // RTK Query error handled below
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (error && 'data' in error) {
      const errData = error.data as { message?: string };
      return errData.message || 'Failed to update user. Please try again.';
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Edit User Profile</h3>
              <p className="text-xs text-slate-400">
                Update account details, role permissions, and interest categories
              </p>
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {getErrorMessage() && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{getErrorMessage()}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 transition"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 transition"
              />
            </div>
          </div>

          {/* New Password (Optional) */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Reset Password (leave empty to keep current)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password (optional)"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 transition"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Security Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('USER')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  role === 'USER'
                    ? 'bg-indigo-600/20 border-indigo-500/60 text-indigo-300'
                    : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Standard User</span>
                {role === 'USER' && <Check className="w-3.5 h-3.5 ml-auto" />}
              </button>

              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  role === 'ADMIN'
                    ? 'bg-rose-600/20 border-rose-500/60 text-rose-300'
                    : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Administrator</span>
                {role === 'ADMIN' && <Check className="w-3.5 h-3.5 ml-auto" />}
              </button>
            </div>
          </div>

          {/* Interactive Predefined Interests */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Interests ({selectedInterests.length} selected)</span>
              </label>
              {selectedInterests.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedInterests([])}
                  className="text-[11px] text-slate-400 hover:text-rose-400 transition cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="max-h-36 overflow-y-auto p-2 rounded-xl bg-slate-950/40 border border-white/10 flex flex-wrap gap-1.5">
              {PREDEFINED_INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-white/5'
                    }`}
                  >
                    <span>{interest}</span>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>

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
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update User</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
