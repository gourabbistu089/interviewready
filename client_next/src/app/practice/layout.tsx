import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Hub',
  description:
    'Curated DSA, SQL, and frontend practice problems with links to LeetCode, GeeksforGeeks, and HackerRank — organized by topic and difficulty.',
  keywords: ['DSA practice', 'LeetCode', 'coding problems', 'SQL practice', 'algorithms', 'data structures', 'interview problems'],
  openGraph: {
    title: 'Practice Hub | InterviewReady',
    description:
      'Curated DSA, SQL, and frontend practice problems organized by topic and difficulty for technical interview prep.',
    type: 'website',
    url: 'https://interviewready-xi.vercel.app/practice',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Practice Hub | InterviewReady',
    description: 'Curated DSA, SQL, and coding problems organized by topic and difficulty.',
  },
  alternates: { canonical: 'https://interviewready-xi.vercel.app/practice' },
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
