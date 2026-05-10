'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';
import { API_URL } from '@/constants';
import { Loader2 } from 'lucide-react';

interface Article {
  title: string;
  content: string;
  createdAt: string;
  author?: { name?: string };
}

export default function ViewArticlePage() {
  const params = useParams();
  const slug   = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles/${slug}`);
        setArticle(res.data);
      } catch {
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: 'var(--accent)' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>{error || 'Article not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto rounded-xl p-8" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
        <h1 className="text-3xl font-bold mb-3" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{article.title}</h1>
        <div className="text-xs mb-6 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
          <span>By <strong style={{ color: 'var(--text-primary)' }}>{article.author?.name || 'Admin'}</strong></span>
          <span>•</span>
          <span>{new Date(article.createdAt).toDateString()}</span>
        </div>
        <article className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              h1: ({ node, ...props }) => <h1 style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              h2: ({ node, ...props }) => <h2 style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              h3: ({ node, ...props }) => <h3 style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif', fontSize: '1.15rem', fontWeight: 600, marginTop: '1.25rem', marginBottom: '0.5rem' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              h4: ({ node, ...props }) => <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.5rem' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              p:  ({ node, ...props }) => <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.75' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              a:  ({ node, ...props }) => <a style={{ color: 'var(--accent)', textDecoration: 'underline' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ul: ({ node, ...props }) => <ul style={{ color: 'var(--text-secondary)', listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ol: ({ node, ...props }) => <ol style={{ color: 'var(--text-secondary)', listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              li: ({ node, ...props }) => <li style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              blockquote: ({ node, ...props }) => (
                <blockquote style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem', fontStyle: 'italic', margin: '1rem 0', color: 'var(--text-secondary)' }} {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              code: ({ node, className, children, ...props }: any) => {
                const isInline = !className;
                return isInline ? (
                  <code style={{ background: 'var(--bg-elevated)', color: 'var(--accent)', padding: '0.15em 0.4em', borderRadius: '4px', fontSize: '0.85em', fontFamily: 'monospace', border: '0.5px solid var(--border)' }} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={`${className} block`} {...props}>
                    {children}
                  </code>
                );
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              pre: ({ node, ...props }) => (
                <pre style={{ background: '#0a0a0a', color: '#c9d1d9', padding: '1rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1rem', border: '0.5px solid var(--border)', fontSize: '0.85rem' }} {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              img: ({ node, ...props }) => (
                // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                <img style={{ borderRadius: '8px', margin: '1rem 0', maxWidth: '100%', height: 'auto', border: '0.5px solid var(--border)' }} {...props} />
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              table: ({ node, ...props }) => (
                <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                  <table style={{ minWidth: '100%', borderCollapse: 'collapse', border: '0.5px solid var(--border)' }} {...props} />
                </div>
              ),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              thead: ({ node, ...props }) => <thead style={{ background: 'var(--bg-elevated)' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              th: ({ node, ...props }) => <th style={{ border: '0.5px solid var(--border)', padding: '0.5rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              td: ({ node, ...props }) => <td style={{ border: '0.5px solid var(--border)', padding: '0.5rem 1rem', color: 'var(--text-secondary)' }} {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              hr: ({ node, ...props }) => <hr style={{ margin: '2rem 0', borderColor: 'var(--border)' }} {...props} />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
