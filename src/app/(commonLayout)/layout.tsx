import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: {
    absolute: 'Home | Secure Note-Taking & Posts App',
  },
  description: 'Enterprise secure note-taking application with compound indexing and real-time MongoDB aggregations.',
};

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="flex-1 pt-16 flex flex-col">{children}</main>
    </>
  );
}
