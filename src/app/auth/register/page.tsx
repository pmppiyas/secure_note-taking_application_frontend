'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Lock,
  User,
  Tags,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Sparkles,
  Check,
  Plus,
  ShieldCheck,
  Database,
  Layers,
  X,
  Search,
} from 'lucide-react';
import { useRegisterMutation } from '@/redux/api/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { PREDEFINED_INTERESTS } from '@/constants/interests';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Selected interests state
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Coding',
    'Web Development',
  ]);

  // Autocomplete search state
  const [interestSearch, setInterestSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter predefined interests based on search query, excluding already selected
  const filteredSuggestions = PREDEFINED_INTERESTS.filter(
    (item) =>
      item.toLowerCase().includes(interestSearch.toLowerCase().trim()) &&
      !selectedInterests.includes(item)
  );

  const addInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (!trimmed) return;
    if (!selectedInterests.includes(trimmed)) {
      setSelectedInterests((prev) => [...prev, trimmed]);
    }
    setInterestSearch('');
    setIsDropdownOpen(false);
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.filter((item) => item !== interest));
  };

  const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        addInterest(filteredSuggestions[0]);
      } else if (interestSearch.trim().length > 0) {
        addInterest(interestSearch.trim());
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setServerError(null);

      const res = await registerUser({
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
        interests: selectedInterests,
      }).unwrap();

      if (res.data?.user && res.data?.token) {
        dispatch(
          setCredentials({
            user: res.data.user,
            token: res.data.token,
          })
        );

        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      const msg =
        err?.data?.message ||
        err?.error ||
        'Registration failed. Please check your information and try again.';
      setServerError(msg);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-br from-[#060919] via-[#090d26] to-[#040612] flex flex-col lg:flex-row text-slate-100 relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* LEFT PANEL: Hidden on mobile, visible on desktop */}
      <div className="hidden lg:flex lg:w-1/2 p-8 lg:p-14 flex-col justify-center relative z-10">
        <div className="max-w-md mx-auto lg:mx-0 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Join the Secure Community</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug text-white">
            Create your account & personalize interests.
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Encrypted private note vault with compound indexing and dynamic community interest discovery.
          </p>

          {/* Minimalist Feature Points */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>Private note vault compound-indexed by user ID</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                <Database className="w-3.5 h-3.5" />
              </div>
              <span>Optimized indexing with zero redundant index overhead</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span>Dynamic user grouping powered by Multikey Aggregation</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Compact Frosted Glass Card */}
      <div className="w-full lg:w-1/2 p-3 sm:p-6 lg:p-8 flex items-center justify-center relative z-10 flex-1">
        <div className="w-full max-w-sm p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-950/40 space-y-2">
          {/* Header */}
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-xs text-slate-400">
              Enter your details to create your secure profile.
            </p>
          </div>

          {/* Error Banner */}
          {serverError && (
            <div className="py-1 px-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-rose-300 text-xs">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-rose-400" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Full Name */}
            <div className="space-y-0.5">
              <label
                htmlFor="name"
                className="block text-[10px] font-semibold uppercase tracking-wider text-slate-300"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-3.5 h-3.5" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  autoComplete="name"
                  {...register('name')}
                  className={`w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/80 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    errors.name
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-[10px] text-rose-400 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-0.5">
              <label
                htmlFor="email"
                className="block text-[10px] font-semibold uppercase tracking-wider text-slate-300"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  {...register('email')}
                  className={`w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/80 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-rose-400 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-0.5">
              <label
                htmlFor="password"
                className="block text-[10px] font-semibold uppercase tracking-wider text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  autoComplete="new-password"
                  {...register('password')}
                  className={`w-full pl-9 pr-9 py-1.5 rounded-lg bg-slate-900/80 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    errors.password
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-rose-400 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Searchable Autocomplete Interests Selector */}
            <div className="space-y-1 relative" ref={dropdownRef}>
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                  <Tags className="w-3 h-3 text-indigo-400" />
                  <span>Select Interests</span>
                </label>
                <span className="text-[10px] text-indigo-400 font-medium">
                  {selectedInterests.length} selected
                </span>
              </div>

              {/* Autocomplete Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={interestSearch}
                  onChange={(e) => {
                    setInterestSearch(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  onKeyDown={handleInterestKeyDown}
                  placeholder="Type to search interests (e.g. Coding, AI)..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              {/* Autocomplete Suggestions Floating Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-36 overflow-y-auto rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl shadow-2xl p-1 text-xs">
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => addInterest(item)}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-indigo-600/30 transition-colors text-left cursor-pointer"
                      >
                        <span>{item}</span>
                        <Plus className="w-3 h-3 text-indigo-400" />
                      </button>
                    ))
                  ) : (
                    <div className="p-2 text-center text-slate-400 text-[11px]">
                      {interestSearch.trim() ? (
                        <button
                          type="button"
                          onClick={() => addInterest(interestSearch.trim())}
                          className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center justify-center gap-1 w-full"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add &quot;{interestSearch.trim()}&quot;</span>
                        </button>
                      ) : (
                        <span>All predefined interests selected!</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Selected Interests Displayed Below */}
              <div className="pt-1">
                {selectedInterests.length > 0 ? (
                  <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-0.5">
                    {selectedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-medium transition-all"
                      >
                        <span>{interest}</span>
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="text-indigo-400 hover:text-white transition-colors cursor-pointer"
                          aria-label={`Remove ${interest}`}
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic">
                    No interests added yet. Type above to add interests.
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-1 py-2 px-4 rounded-lg font-semibold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footnotes */}
          <div className="pt-1.5 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
