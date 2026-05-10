import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cheatsheets',
  description:
    'Quick-reference coding cheatsheets for JavaScript, TypeScript, Python, Java, C++, Pandas, NumPy, and more — with explained code snippets organized by concept and difficulty.',
  keywords: [
    'coding cheatsheet', 'JavaScript cheatsheet', 'Python cheatsheet', 'TypeScript cheatsheet',
    'interview cheatsheet', 'programming reference', 'coding snippets', 'Java cheatsheet',
  ],
  openGraph: {
    title: 'Coding Cheatsheets | InterviewReady',
    description:
      'Quick-reference cheatsheets for JavaScript, Python, Java, C++, and more — organized by concept and difficulty.',
    type: 'website',
    url: 'https://interviewready-xi.vercel.app/cheatsheet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding Cheatsheets | InterviewReady',
    description: 'Quick-reference coding cheatsheets for JavaScript, Python, Java, C++, and more.',
  },
  alternates: { canonical: 'https://interviewready-xi.vercel.app/cheatsheet' },
};

export default function CheatsheetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
