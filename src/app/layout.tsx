import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/providers/ReduxProvider';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Secure Note-Taking & Posts App',
    template: '%s | Secure Note-Taking & Posts App',
  },
  description:
    'Enterprise secure note-taking application with compound indexing, RBAC, and real-time MongoDB aggregations.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/icon.png?v=2', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
  },
  openGraph: {
    title: 'Secure Note-Taking & Posts App',
    description:
      'Enterprise secure note-taking application with compound indexing, RBAC, and real-time MongoDB aggregations.',
    url: '/',
    siteName: 'Secure Note-Taking & Posts App',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Secure Notes Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Secure Note-Taking & Posts App',
    description:
      'Enterprise secure note-taking application with compound indexing, RBAC, and real-time MongoDB aggregations.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/icon.png?v=2" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
      </head>
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 relative overflow-x-hidden">
        {/* Unified ambient background glow */}
        <div className="fixed inset-0 -z-10 bg-[#030712] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.2),rgba(3,7,18,0))] pointer-events-none" />
        </div>

        <ReduxProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
