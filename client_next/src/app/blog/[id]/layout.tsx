import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000/api';
const BASE_URL = 'https://interviewready-xi.vercel.app';

interface BlogData {
  title?: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  author?: { fullName?: string };
  tags?: string[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Not found');
    const raw = await res.json();
    const blog: BlogData = raw.blog ?? raw;

    const title       = blog.title ?? 'Blog Post';
    const description = blog.excerpt ?? 'Read this blog post on InterviewReady.';
    const image       = blog.featuredImage;
    const url         = `${BASE_URL}/blog/${id}`;

    return {
      title,
      description,
      keywords: blog.tags ?? [],
      openGraph: {
        title,
        description,
        type: 'article',
        url,
        siteName: 'InterviewReady',
        ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(image && { images: [image] }),
      },
      alternates: { canonical: url },
    };
  } catch {
    return {
      title: 'Blog Post',
      description: 'Read this blog post on InterviewReady.',
    };
  }
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
