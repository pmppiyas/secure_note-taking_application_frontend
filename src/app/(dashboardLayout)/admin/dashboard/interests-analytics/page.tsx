'use client';

import PageHeader from '@/components/shared/PageHeader';
import InterestsAggregationTable from '@/components/dashboard/admin/InterestsAggregationTable';
import { BarChart3, ArrowLeft, Layers } from 'lucide-react';
import Link from 'next/link';

export default function AdminInterestsAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        icon={BarChart3}
        title="Interests Analytics"
        description="Scenario 1 MongoDB aggregation pipeline: $match -> $unwind '$interests' -> $group on multikey index."
        badge="Aggregation S1"
        badgeColor="purple"
      >
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard Overview</span>
        </Link>
      </PageHeader>

      {/* Modular InterestsAggregationTable */}
      <InterestsAggregationTable />
    </div>
  );
}
