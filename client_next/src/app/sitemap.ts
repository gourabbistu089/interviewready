import { MetadataRoute } from 'next';

const BASE_URL = 'https://interviewready-xi.vercel.app';
const API_URL  = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000/api';

interface BlogEntry { _id: string; updatedAt?: string; createdAt?: string; }
interface ArticleEntry { slug: string; updatedAt?: string; createdAt?: string; }

async function getBlogs(): Promise<BlogEntry[]> {
  try {
    const res = await fetch(`${API_URL}/blogs?page=1&limit=100`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.blogs ?? data) as BlogEntry[];
  } catch { return []; }
}

async function getArticles(): Promise<ArticleEntry[]> {
  try {
    const res = await fetch(`${API_URL}/articles`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (Array.isArray(data) ? data : data.articles ?? []) as ArticleEntry[];
  } catch { return []; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, articles] = await Promise.all([getBlogs(), getArticles()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/blog`,            lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/learning`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/practice`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/mock-interview`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/cheatsheet`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url:              `${BASE_URL}/blog/${b._id}`,
    lastModified:     b.updatedAt ? new Date(b.updatedAt) : new Date(),
    changeFrequency:  'monthly' as const,
    priority:         0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url:             `${BASE_URL}/articles/${a.slug}`,
    lastModified:    a.updatedAt ? new Date(a.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...articleRoutes];
}
