import type { Metadata } from 'next';

const API_URL  = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000/api';
const BASE_URL = 'https://interviewready-xi.vercel.app';

interface ArticleData {
  title?: string;
  content?: string;
  category?: string;
  author?: { name?: string };
  createdAt?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_URL}/articles/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Not found');
    const article: ArticleData = await res.json();

    const title       = article.title ?? 'Article';
    // Use first 160 chars of content as description, stripped of markdown
    const rawDesc     = (article.content ?? '').replace(/[#*`>\-]/g, '').trim().slice(0, 160);
    const description = rawDesc || 'Read this article on InterviewReady.';
    const url         = `${BASE_URL}/articles/${slug}`;

    return {
      title,
      description,
      keywords: article.category ? [article.category, 'technical article', 'interview prep'] : [],
      openGraph: {
        title,
        description,
        type: 'article',
        url,
        siteName: 'InterviewReady',
        ...(article.createdAt && { publishedTime: article.createdAt }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: { canonical: url },
    };
  } catch {
    return {
      title: 'Article',
      description: 'Read this technical article on InterviewReady.',
    };
  }
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
