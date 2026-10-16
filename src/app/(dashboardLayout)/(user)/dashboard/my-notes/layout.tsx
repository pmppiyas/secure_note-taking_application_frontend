import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'My Notes | Secure Note-Taking & Posts App',
  },
  description: 'Manage and search your private encrypted notes repository.',
};

export default function MyNotesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
