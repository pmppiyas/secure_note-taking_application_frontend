'use client';

import PageHeader from '@/components/shared/PageHeader';
import AllNotesTable from '@/components/dashboard/admin/AllNotesTable';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminAllNotesPage() {
  return (
    <div className="flex-1 flex flex-col space-y-4">
      {/* Page Header */}
      <PageHeader
        icon={ShieldCheck}
        title="All Users' Notes"
        description="Global platform notes registry protected with compound ESR index { userId: 1, createdAt: -1 }."
        badge="Notes Governance"
        badgeColor="emerald"
      >
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard Overview</span>
        </Link>
      </PageHeader>

      {/* Modular AllNotesTable using Shadcn Table and Pagination */}
      <AllNotesTable />
    </div>
  );
}
