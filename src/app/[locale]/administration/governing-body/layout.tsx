import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Governing Body - Administration',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
