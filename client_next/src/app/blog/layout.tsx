import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Expert interview insights, coding tips, system design walkthroughs, and career advice from top tech professionals.',
  keywords: ['tech blog', 'interview tips', 'coding blog', 'system design', 'career advice', 'software engineering'],
  openGraph: {
    title: 'Interview Insights Blog | InterviewReady',
    description:
      'Expert interview insights, coding tips, system design walkthroughs, and career advice from top tech professionals.',
    type: 'website',
    url: 'https://interviewready-xi.vercel.app/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview Insights Blog | InterviewReady',
    description: 'Expert interview insights, coding tips, and career advice from top tech professionals.',
  },
  alternates: { canonical: 'https://interviewready-xi.vercel.app/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
