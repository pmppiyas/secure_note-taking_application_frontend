import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Admin Governance | Secure Note-Taking & Posts App',
  },
  description: 'Enterprise administration dashboard, user management, and system metrics.',
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
