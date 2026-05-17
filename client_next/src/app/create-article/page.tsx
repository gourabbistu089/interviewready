'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { API_URL } from '@/constants';
import toast from 'react-hot-toast';
import { FileText, Tag, Send, Save, Folder } from 'lucide-react';

const ArticleEditor = dynamic(() => import('@/components/ArticleEditor'), { ssr: false });

const CATEGORIES = [
  'Data Structures & Algorithms',
  'System Design',
  'Web Development',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Computer Science',
  'Interview Tips',
  'Best Practices',
  'Others',
];

interface FormData {
  title: string;
  category: string;
  content: string;
}

export default function CreateArticlePage() {
  const [formData, setFormData] = useState<FormData>({ title: '', category: '', content: '' });
  const [loading, setLoading]   = useState(false);
  const [errors,  setErrors]    = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!formData.title.trim())    e.title    = 'Title is required';
    if (!formData.category)        e.category = 'Category is required';
    if (!formData.content.trim())  e.content  = 'Content is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validate()) { toast.error(Object.values(errors)[0] ?? 'Please fill all required fields'); return; }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/articles`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Article published successfully!');
      setFormData({ title: '', category: '', content: '' });
      setErrors({});
    } catch {
      toast.error('Failed to publish article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
            style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}
          >
            <FileText className="w-7 h-7" style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
            Create New Article
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Write and publish a technical article for the community
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-8">

              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  <FileText className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  Article Title <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className="w-full"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Enter a clear and descriptive title..."
                  style={errors.title ? { borderColor: 'var(--danger) !important' } : {}}
                />
                {errors.title && <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{errors.title}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  <Folder className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  Category <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select
                  className="w-full"
                  value={formData.category}
                  onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                >
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{errors.category}</p>}
              </div>

              {/* Tags hint */}
              <div
                className="flex items-start gap-3 rounded-lg px-4 py-3"
                style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}
              >
                <Tag className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Use the toolbar below to add headings, bold, code blocks, tables, images, and YouTube embeds.
                  The <strong style={{ color: 'var(--accent)' }}>Embed YouTube</strong> button lets you paste any YouTube link and it will render as a responsive video.
                </p>
              </div>

              {/* Content editor */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  <FileText className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  Content <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <div className="rounded-xl overflow-hidden" style={{ border: errors.content ? '0.5px solid var(--danger)' : '0.5px solid var(--border)' }}>
                  <ArticleEditor
                    value={formData.content}
                    onChange={(content) => setFormData((p) => ({ ...p, content }))}
                  />
                </div>
                {errors.content && <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{errors.content}</p>}
              </div>

            </div>

            {/* Footer actions */}
            <div
              className="flex flex-col sm:flex-row gap-3 px-8 py-5"
              style={{ borderTop: '0.5px solid var(--border)', background: 'var(--bg-elevated)' }}
            >
              <button
                type="button"
                onClick={() => { setFormData({ title: '', category: '', content: '' }); setErrors({}); }}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                <Save className="w-4 h-4" />
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
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
