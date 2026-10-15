'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/providers/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import {
  ShieldAlert,
  Users,
  PieChart,
  Database,
  Layers,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <div className="flex-1 bg-slate-950 text-slate-100 flex flex-col">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-rose-950/40 via-indigo-950/40 to-slate-900 border border-indigo-500/20 shadow-xl">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Administrator Governance Panel</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Admin Control Center
              </h1>
              <p className="text-sm text-slate-400">
                Logged in as{' '}
                <span className="font-semibold text-white">{user?.name}</span> (
                {user?.email}) with role{' '}
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-xs uppercase">
                  {user?.role}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all flex items-center gap-2"
              >
                <span>View Public Feed</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Admin Oversight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    User Management
                  </h2>
                  <p className="text-xs text-slate-400">GET /api/v1/users</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Admins have full oversight to query paginated user directories
                sorted by `createdAt: -1` index.
              </p>
              <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                Admin Exclusive Endpoint
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Interests Aggregation
                  </h2>
                  <p className="text-xs text-slate-400">Scenario 1 ($unwind)</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Groups registered users dynamically by each individual interest
                using Multikey index `{'{ interests: 1 }'}`.
              </p>
              <span className="text-xs text-violet-400 font-medium flex items-center gap-1">
                Optimized Aggregation Pipeline
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Relational Post Join
                  </h2>
                  <p className="text-xs text-slate-400">Scenario 2 ($lookup)</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Performs MongoDB `$lookup` joining users with their authored
                posts via foreign field `{'{ userId: 1 }'}`.
              </p>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                Relational Emulation
              </span>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
