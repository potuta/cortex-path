import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Sign In or Create Account',
  description:
    'Sign in to CortexPath to access your codebase intelligence dashboard, or create a free account and start mapping your codebase in minutes.',
  openGraph: {
    title: 'Sign In or Create Account | CortexPath',
    description:
      'Access your CortexPath dashboard to explore architecture maps, logic summaries, and AI-powered codebase insights.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
