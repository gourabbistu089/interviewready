import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Blog Post',
  robots: { index: false, follow: false },
};

export default function CreateBlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
