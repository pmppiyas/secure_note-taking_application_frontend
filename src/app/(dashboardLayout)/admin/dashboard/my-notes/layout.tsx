import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Admin Personal Vault | Secure Note-Taking & Posts App',
  },
  description: 'Private encrypted notes and operational audit logs for administrator accounts.',
};

export default function AdminMyNotesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
