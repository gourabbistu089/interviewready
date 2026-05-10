import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Article',
  robots: { index: false, follow: false },
};

export default function CreateArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
