import type { Metadata } from 'next';

const BASE_URL = 'https://interviewready-xi.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; subtopic: string }>;
}): Promise<Metadata> {
  const { topic, subtopic } = await params;

  const decodedTopic    = decodeURIComponent(topic);
  const decodedSubtopic = decodeURIComponent(subtopic);

  const title       = `${decodedTopic} — ${decodedSubtopic} Quiz`;
  const description = `Test your ${decodedTopic} knowledge with an AI-generated ${decodedSubtopic} quiz. Personalized questions, instant feedback, and multiple difficulty levels.`;
  const url         = `${BASE_URL}/ai-quiz/${topic}/${subtopic}`;

  return {
    title,
    description,
    keywords: [decodedTopic, decodedSubtopic, 'AI quiz', 'interview quiz', 'coding quiz', 'practice questions'],
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'InterviewReady',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
    robots: { index: false }, // quiz sessions are ephemeral
  };
}

export default function AiQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
