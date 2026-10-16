import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Public Posts Governance | Secure Note-Taking & Posts App',
  },
  description: 'Global community posts governance with author linkages and relational aggregations.',
};

export default function AdminPostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
