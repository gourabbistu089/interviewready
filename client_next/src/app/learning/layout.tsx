import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Hub',
  description:
    'Structured learning paths for DSA, system design, frontend, backend, databases, and more — with curated video lectures, notes, and progress tracking.',
  keywords: ['learning', 'DSA', 'system design', 'frontend', 'backend', 'video lectures', 'study guide', 'interview prep'],
  openGraph: {
    title: 'Learning Hub | InterviewReady',
    description:
      'Structured learning paths for DSA, system design, frontend, backend, and more — with video lectures and progress tracking.',
    type: 'website',
    url: 'https://interviewready-xi.vercel.app/learning',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning Hub | InterviewReady',
    description: 'Structured learning paths for tech interviews — DSA, system design, frontend, and more.',
  },
  alternates: { canonical: 'https://interviewready-xi.vercel.app/learning' },
};

export default function LearningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
