import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Personal Overview | Secure Note-Taking & Posts App',
  },
  description: 'Your workspace overview, note summaries, discussions count, and category telemetry.',
};

export default function UserDashboardOverviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
