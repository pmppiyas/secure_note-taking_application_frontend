'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Database,
  Layers,
} from 'lucide-react';
import { useLoginMutation } from '@/redux/api/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setServerError(null);
      const res = await login({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      }).unwrap();

      if (res.data?.user && res.data?.token) {
        dispatch(
          setCredentials({
            user: res.data.user,
            token: res.data.token,
          })
        );

        const role = (res.data.user.role || '').toUpperCase();
        if (role === 'ADMIN') {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const msg =
        err?.data?.message ||
        err?.error ||
        'Failed to sign in. Please verify your credentials.';
      setServerError(msg);
    }
  };

  const handleQuickFill = (email: string, pass: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', pass, { shouldValidate: true });
    setServerError(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-br from-[#060919] via-[#090d26] to-[#040612] flex flex-col text-slate-100 relative">
      {/* Ambient background glows constrained within container */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] w-full flex-1 flex flex-col lg:flex-row">
        {/* LEFT PANEL: Hidden on mobile, visible on desktop split-screen */}
        <div className="hidden lg:flex lg:w-1/2 p-8 lg:p-14 flex-col justify-center relative z-10">
        <div className="max-w-md mx-auto lg:mx-0 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Secure Authentication</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug text-white">
            Welcome to your verified notes workspace.
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Role-based governance, high-performance database indexing, and
            real-time MongoDB aggregations.
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
              <span>Multi-role access control for Users & Admins</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span>Real-time community feed & relational profile lookup</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Compact Frosted Glass Card */}
      <div className="w-full lg:w-1/2 p-3 sm:p-6 lg:p-8 flex items-center justify-center relative z-10 flex-1">
        <div className="w-full max-w-sm p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-950/40 space-y-2.5">
          {/* Header */}
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Sign In
            </h2>
            <p className="text-xs text-slate-400">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Quick Test Login
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                Click to fill
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@example.com', 'admin123')}
                className="py-1 px-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-[11px] font-medium transition-colors text-center cursor-pointer"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickFill('alice@example.com', 'password123')
                }
                className="py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-[11px] font-medium transition-colors text-center cursor-pointer"
              >
                User Demo (Alice)
              </button>
            </div>
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
            {/* Email Field */}
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

            {/* Password Field */}
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
                  placeholder="••••••••"
                  autoComplete="current-password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-1 py-2 px-4 rounded-lg font-semibold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footnotes */}
          <div className="pt-1.5 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/register"
                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
