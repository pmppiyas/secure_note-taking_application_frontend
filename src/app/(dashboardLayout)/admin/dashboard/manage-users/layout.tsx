import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Manage Users | Secure Note-Taking & Posts App',
  },
  description: 'System user directory administration, role assignments, and account controls.',
};

export default function ManageUsersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
