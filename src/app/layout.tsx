import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/providers/ReduxProvider';
import Navbar from '@/components/Navbar';
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
  title: 'Secure Note-Taking & Posts App',
  description: 'Enterprise secure note-taking application with RBAC and MongoDB aggregations',
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
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 relative overflow-x-hidden">
        {/* Unified ambient background glow behind both Navbar and Hero */}
        <div className="fixed inset-0 -z-10 bg-[#030712] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.2),rgba(3,7,18,0))] pointer-events-none" />
        </div>

        <ReduxProvider>
          <Suspense fallback={null}>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
