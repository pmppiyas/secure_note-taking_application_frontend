import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export const instant = false;

export default function DashboardGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
