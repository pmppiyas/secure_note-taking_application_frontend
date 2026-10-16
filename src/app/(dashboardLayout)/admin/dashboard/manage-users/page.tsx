'use client';

import PageHeader from '@/components/shared/PageHeader';
import ManageUsersTable from '@/components/dashboard/admin/ManageUsersTable';
import { Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminManageUsersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        icon={Users}
        title="Manage Users Directory"
        description="Comprehensive user directory indexed by createdAt with role authorization and account controls."
        badge="Admin Governance"
        badgeColor="rose"
      >
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard Overview</span>
        </Link>
      </PageHeader>

      {/* Directory Table Component with Shadcn Table and Modal CRUD */}
      <ManageUsersTable />
    </div>
  );
}
