import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'My Posts | Secure Note-Taking & Posts App',
  },
  description: 'Manage your community discussions and published submissions.',
};

export default function MyPostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
