import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "All Users' Notes | Secure Note-Taking & Posts App",
  },
  description: "Global platform notes audit and administrative repository.",
};

export default function AllNotesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
