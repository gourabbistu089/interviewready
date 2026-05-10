import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Blog Post',
  robots: { index: false, follow: false },
};

export default function UpdateBlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
