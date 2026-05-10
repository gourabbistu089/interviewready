import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import AppInitializer from './AppInitializer';
import Header from '@/components/layout/Header';
import { Toaster } from 'react-hot-toast';
import ChatbotLoader from '@/components/ChatbotLoader';

const BASE_URL = 'https://interviewready-xi.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'InterviewReady — Ace Your Tech Interview',
    template: '%s | InterviewReady',
  },
  description:
    'AI-powered mock interviews, DSA practice, coding cheatsheets, and curated learning resources to help you land your next tech job.',
  keywords: [
    'interview preparation',
    'coding interview',
    'mock interview',
    'DSA practice',
    'system design',
    'technical interview',
    'AI interview',
    'cheatsheet',
    'MERN stack',
  ],
  authors: [{ name: 'InterviewReady', url: BASE_URL }],
  creator: 'InterviewReady',
  publisher: 'InterviewReady',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'InterviewReady',
    title: 'InterviewReady — Ace Your Tech Interview',
    description:
      'AI-powered mock interviews, DSA practice, coding cheatsheets, and curated learning resources to help you land your next tech job.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'InterviewReady — Ace Your Tech Interview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'InterviewReady — Ace Your Tech Interview',
    description:
      'AI-powered mock interviews, DSA practice, coding cheatsheets, and curated learning resources.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },

  alternates: { canonical: BASE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <AppInitializer />
          <Header />
          <ChatbotLoader />
          <main className="flex-1">{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#101010',
                color: '#e2e2e2',
                borderRadius: '8px',
                border: '0.5px solid rgba(255,255,255,0.07)',
                boxShadow: 'none',
              },
              success: { iconTheme: { primary: '#4ade9e', secondary: '#101010' } },
              error:   { iconTheme: { primary: '#f87171', secondary: '#101010' } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
