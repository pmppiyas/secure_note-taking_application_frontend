import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Sign In | Secure Note-Taking & Posts App',
  },
  description: 'Access your private encrypted notes and personal user vault.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
