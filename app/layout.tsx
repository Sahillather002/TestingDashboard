import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { getCookie } from '@/utils/getCookie';
import { verifyToken } from '@/utils/verifyToken';
import { NextResponse } from 'next/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sqrx India',
  description: 'Testing Dashboard for Sqrx'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const token = getCookie('token');
  const user = verifyToken(token);

  // For next-auth, you need to pass a session object if using `SessionProvider`
  const session = null; // Update this based on how you get the session

  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session} user={user}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
