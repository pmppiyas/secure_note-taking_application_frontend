import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Community Feed | Secure Note-Taking & Posts App',
  },
  description: 'Explore public community discussions with real-time $lookup author linkages.',
};

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
