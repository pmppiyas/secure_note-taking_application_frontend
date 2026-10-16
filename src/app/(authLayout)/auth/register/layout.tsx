import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Create Account | Secure Note-Taking & Posts App',
  },
  description: 'Register for Secure Notes with personalized multi-key indexed interests.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
