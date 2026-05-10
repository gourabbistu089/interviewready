import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Mock Interview',
  description:
    'Practice real technical interviews with an AI interviewer — choose your role, answer questions, and get instant scored feedback to improve your performance.',
  keywords: ['mock interview', 'AI interview', 'technical interview practice', 'interview simulator', 'coding interview', 'behavioral interview'],
  openGraph: {
    title: 'AI Mock Interview | InterviewReady',
    description:
      'Practice real technical interviews with an AI interviewer and get instant scored feedback.',
    type: 'website',
    url: 'https://interviewready-xi.vercel.app/mock-interview',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Mock Interview | InterviewReady',
    description: 'Practice real technical interviews with an AI interviewer and get instant scored feedback.',
  },
  alternates: { canonical: 'https://interviewready-xi.vercel.app/mock-interview' },
};

export default function MockInterviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
