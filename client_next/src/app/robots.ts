import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = 'https://interviewready-xi.vercel.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/blog',
          '/blog/',
          '/learning',
          '/practice',
          '/mock-interview',
          '/cheatsheet',
          '/articles/',
          '/ai-quiz/',
        ],
        disallow: [
          '/dashboard',
          '/admin',
          '/create-blog',
          '/update-blog/',
          '/create-article',
          '/login',
          '/register',
          '/api/',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
