import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notice Board',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
