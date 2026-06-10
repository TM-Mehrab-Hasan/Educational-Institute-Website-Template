import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notices',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
