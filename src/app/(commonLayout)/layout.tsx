import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';

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
