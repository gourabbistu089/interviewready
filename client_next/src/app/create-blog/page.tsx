'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  BookOpen, Tag, Clock, FileText, Image, Folder, Save, Send,
  Plus, X, Upload, Trash2, Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '@/constants';

const BlogEditor = dynamic(() => import('@/components/BlogEditor'), { ssr: false });

interface BlogFormData {
  title: string; excerpt: string; content: string;
  featuredImage: File | null; category: string; tags: string[];
  status: string; readTime: number;
}

const CATEGORIES = ['Technology','Programming','Web Development','Data Science','Interview Tips','Computer Science','Tutorials','Best Practices','Others'];

export default function CreateBlogPage() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '', excerpt: '', content: '', featuredImage: null,
    category: '', tags: [], status: 'draft', readTime: 1,
  });
  const [newTag,       setNewTag]       = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading,    setIsLoading]    = useState(false);
  const [errors,       setErrors]       = useState<Record<string, string>>({});
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((p) => ({ ...p, featuredImage: file }));
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => { setFormData((p) => ({ ...p, featuredImage: null })); setImagePreview(null); };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((p) => ({ ...p, tags: [...p.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (t: string) => setFormData((p) => ({ ...p, tags: p.tags.filter((x) => x !== t) }));

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!formData.title.trim())    e.title = 'Title is required';
    if (!formData.excerpt.trim())  e.excerpt = 'Excerpt is required';
    if (!formData.content.trim())  e.content = 'Content is required';
    if (!formData.featuredImage)   e.featuredImage = 'Featured image is required';
    if (!formData.category)        e.category = 'Category is required';
    if (!formData.tags.length)     e.tags = 'At least one tag is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (status: string) => {
    if (!validateForm()) { toast.error(Object.values(errors)[0] ?? 'Please fill all required fields'); return; }
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('excerpt', formData.excerpt);
      fd.append('content', formData.content);
      fd.append('category', formData.category);
      fd.append('tags', JSON.stringify(formData.tags));
      fd.append('status', status);
      fd.append('readTime', String(formData.readTime));
      if (formData.featuredImage) fd.append('featuredImage', formData.featuredImage);

      const res = await axios.post(`${API_URL}/blogs`, fd, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success(`Blog ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
        router.push('/blog');
      }
    } catch {
      toast.error('Error submitting blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
            style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}
          >
            <BookOpen className="w-7 h-7" style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Create New Blog Post</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Share your knowledge and insights with the community</p>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
          <div className="p-8 space-y-8">
            {/* Featured Image */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
                <Image className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                Featured Image <span className="text-xs" style={{ color: 'var(--danger)' }}>*</span>
              </label>
              {!imagePreview ? (
                <div
                  className="rounded-xl p-8 text-center"
                  style={{
                    border: errors.featuredImage ? '0.5px dashed var(--danger)' : '0.5px dashed var(--border)',
                    background: 'var(--bg-elevated)',
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                      <Upload className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    </div>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Drop your image here or click to browse</p>
                    <label
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-opacity hover:opacity-90"
                      style={{ background: 'var(--accent)', color: '#080808' }}
                    >
                      <Upload className="w-4 h-4" />Choose Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-xl" style={{ border: '0.5px solid var(--border)' }} />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <button type="button" onClick={removeImage}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                      style={{ background: 'var(--danger)', color: '#ffffff' }}
                    >
                      <Trash2 className="w-4 h-4" />Remove Image
                    </button>
                  </div>
                </div>
              )}
              {errors.featuredImage && <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{errors.featuredImage}</p>}
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                <FileText className="w-4 h-4" style={{ color: 'var(--accent)' }} />Blog Title *
              </label>
              <input type="text" value={formData.title} onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                placeholder="Enter an engaging title for your blog post..." />
            </div>

            {/* Excerpt */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />Excerpt
              </label>
              <textarea value={formData.excerpt} onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
                rows={3} className="w-full resize-none" placeholder="Write a compelling excerpt..." />
            </div>

            {/* Editor */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                <BookOpen className="w-4 h-4" style={{ color: 'var(--accent)' }} />Content *
              </label>
              <div className="rounded-xl overflow-hidden" style={{ border: '0.5px solid var(--border)' }}>
                <BlogEditor formData={formData} setFormData={setFormData} />
              </div>
            </div>

            {/* Category & Read Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                  <Folder className="w-4 h-4" style={{ color: 'var(--accent)' }} />Category
                </label>
                <select value={formData.category} onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}>
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                  <Clock className="w-4 h-4" style={{ color: 'var(--accent)' }} />Read Time (minutes)
                </label>
                <input type="number" value={formData.readTime} onChange={(e) => setFormData((p) => ({ ...p, readTime: parseInt(e.target.value) || 1 }))}
                  min="1" />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                <Tag className="w-4 h-4" style={{ color: 'var(--accent)' }} />Tags
              </label>
              <div className="flex gap-3 mb-4">
                <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  className="flex-1" placeholder="Add a tag and press Enter..." />
                <button type="button" onClick={addTag}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-opacity hover:opacity-90"
                  style={{ background: 'var(--accent)', color: '#080808' }}
                >
                  <Plus className="w-4 h-4" />Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}
                    >
                      #{tag}
                      <button type="button" onClick={() => removeTag(tag)} className="transition-opacity hover:opacity-70">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errors.tags && <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{errors.tags}</p>}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6" style={{ borderTop: '0.5px solid var(--border)' }}>
              <button type="button" onClick={() => handleSubmit('draft')}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                <Save className="w-4 h-4" />Save as Draft
              </button>
              <button type="button" onClick={() => handleSubmit('published')} disabled={isLoading}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: 'var(--accent)', color: '#080808' }}
              >
                <Send className="w-4 h-4" />{isLoading ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
