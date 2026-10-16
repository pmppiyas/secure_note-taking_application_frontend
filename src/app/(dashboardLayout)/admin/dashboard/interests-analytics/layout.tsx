import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Interests Analytics | Secure Note-Taking & Posts App',
  },
  description: 'Scenario 1 MongoDB aggregation telemetry with $match, $unwind, and $group.',
};

export default function InterestsAnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
