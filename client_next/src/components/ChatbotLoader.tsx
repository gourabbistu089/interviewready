'use client';

import dynamic from 'next/dynamic';

const InterviewChatbot = dynamic(() => import('@/components/InterviewChatbot'), { ssr: false });

export default function ChatbotLoader() {
  return <InterviewChatbot />;
}
