import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Principal Message - Administration',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
