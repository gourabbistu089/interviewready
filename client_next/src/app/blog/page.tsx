'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search, BookOpen, Clock, TrendingUp, Eye, MessageCircle,
  Bookmark, Loader2, ChevronDown,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import axios from 'axios';
import { API_URL } from '@/constants';
import { useAppDispatch } from '@/redux/hooks';
import { setBlog } from '@/redux/features/blogSlice';
import type { Blog } from '@/types';

interface Category { id: string; name: string; count: number; }

export default function BlogPage() {
  const [searchTerm,       setSearchTerm]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles,         setArticles]         = useState<Blog[]>([]);
  const [hasMore,          setHasMore]          = useState(true);
  const [loading,          setLoading]          = useState(false);

  // Use refs for page and loading to avoid stale-closure infinite loop
  const pageRef    = useRef(1);
  const loadingRef = useRef(false);
  const loader     = useRef<HTMLDivElement>(null);
  const router     = useRouter();
  const dispatch   = useAppDispatch();

  // Stable callback — no page/loading in deps, uses refs instead
  const fetchArticles = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/blogs?page=${pageRef.current}&limit=9`);
      if (res.data.success) {
        const newArticles: Blog[] = res.data.blogs;
        setArticles((prev) => [...prev, ...newArticles]);
        pageRef.current += 1;
        setHasMore(newArticles.length >= 9);
      }
    } catch { /* non-critical */ }
    loadingRef.current = false;
    setLoading(false);
  }, []); // empty deps — fetchArticles is stable across renders

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && hasMore) fetchArticles(); },
      { threshold: 1.0 },
    );
    const el = loader.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [fetchArticles, hasMore]); // fetchArticles is stable, re-runs only when hasMore flips

  const categoryCounts: Record<string, Category> = {};
  articles.forEach((a) => {
    if (categoryCounts[a.category]) categoryCounts[a.category].count++;
    else categoryCounts[a.category] = { id: a.category, name: a.category, count: 1 };
  });

  const categories: Category[] = [
    { id: 'all', name: 'All Articles', count: articles.length },
    ...Object.values(categoryCounts),
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadMore = async (article: Blog) => {
    dispatch(setBlog(article));
    router.push(`/blog/${article._id}`);
    try {
      await axios.put(`${API_URL}/blogs/${article._id}/views`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch { /* non-critical */ }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Interview Insights Blog</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Expert advice, industry insights, and career guidance from top professionals</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
          <Card className="p-5">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  <input
                    type="text" placeholder="Search articles, topics…" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={
                    selectedCategory === cat.id
                      ? { background: 'var(--accent)', color: '#080808' }
                      : { background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }
                  }
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
              <BookOpen className="h-4 w-4" style={{ color: 'var(--accent)' }} />
              {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find((c) => c.id === selectedCategory)?.name} Articles`}
            </h2>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" style={{ color: 'var(--text-secondary)' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{filteredArticles.length} articles found</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((article, index) => (
              <motion.div key={article._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }}>
                <Card hover className="h-full">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-2.5 py-0.5 rounded text-xs font-medium"
                        style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}
                      >
                        {article.category}
                      </span>
                      <button style={{ color: 'var(--text-secondary)' }}><Bookmark className="h-4 w-4" /></button>
                    </div>
                    <h3 className="text-sm font-bold mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>{article.title}</h3>
                    <p className="text-xs mb-3 leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{article.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}>{tag}</span>
                      ))}
                      {article.tags.length > 2 && <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}>+{article.tags.length - 2}</span>}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={article.author?.profilePicture} alt={article.author?.fullName} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{article.author?.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{article.readTime} min</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <div className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /><span>{article.views?.toLocaleString()}</span></div>
                        <div className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /><span>{article.comments?.length ?? 0}</span></div>
                      </div>
                      <Button onClick={() => handleReadMore(article)} size="small" variant="ghost">Read More</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <motion.div ref={loader} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10">
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading more articles…</span>
                </div>
              ) : (
                <button
                  onClick={fetchArticles}
                  className="flex flex-col items-center gap-2 transition-colors duration-150"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <div className="p-3 rounded-full" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                    <ChevronDown className="h-5 w-5 animate-bounce" />
                  </div>
                  <span className="text-sm">Load more articles</span>
                </button>
              )}
            </motion.div>
          )}

          {!loading && filteredArticles.length === 0 && (
            <Card className="p-12 text-center">
              <BookOpen className="h-10 w-10 mx-auto mb-4" style={{ color: 'var(--text-secondary)' }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No articles found</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search criteria or browse different categories.</p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
