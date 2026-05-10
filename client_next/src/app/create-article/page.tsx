'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { API_URL } from '@/constants';
import toast from 'react-hot-toast';
import { FileText, Tag, Send } from 'lucide-react';

const ArticleEditor = dynamic(() => import('@/components/ArticleEditor'), { ssr: false });

export default function CreateArticlePage() {
  const [formData, setFormData] = useState({ title: '', category: '', content: '' });
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/articles`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Article published successfully!');
      setFormData({ title: '', category: '', content: '' });
    } catch {
      toast.error('Failed to publish article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
            style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}
          >
            <FileText className="w-7 h-7" style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Create New Article</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Write and publish a new article for the community</p>
        </div>

        <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                <FileText className="w-4 h-4" style={{ color: 'var(--accent)' }} />Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Enter article title"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                <Tag className="w-4 h-4" style={{ color: 'var(--accent)' }} />Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Data Structures, System Design"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                <FileText className="w-4 h-4" style={{ color: 'var(--accent)' }} />Content
              </label>
              <div className="rounded-xl overflow-hidden" style={{ border: '0.5px solid var(--border)' }}>
                <ArticleEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} />
              </div>
            </div>

            <div className="flex justify-end pt-2" style={{ borderTop: '0.5px solid var(--border)' }}>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: 'var(--accent)', color: '#080808' }}
              >
                <Send className="w-4 h-4" />
                {loading ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
