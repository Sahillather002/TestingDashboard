'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

export default function Providers({
  session,
  children,
  user
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
  user?: any; // Adjust the type if necessary
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          {/* You can provide `user` via context or other means here */}
          {children}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
