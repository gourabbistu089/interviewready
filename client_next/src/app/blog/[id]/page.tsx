'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, MessageCircle, Share2, Eye, Clock, Calendar,
  Tag, Send, ThumbsUp, Bookmark, TrendingUp,
  ChevronDown, ChevronUp, Trash2, Edit,
} from 'lucide-react';
import { API_URL } from '@/constants';
import axios from 'axios';
import { DeleteModal } from '@/components/DeleteModal';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/hooks';
import type { Blog, Comment } from '@/types';

export default function BlogDetailPage() {
  const params      = useParams();
  const id          = params.id as string;
  const router      = useRouter();
  const currentUser = useAppSelector((s) => s.auth.user);
  const reduxBlog   = useAppSelector((s) => s.blogs.blog);

  const [blog,             setBlogState]        = useState<Blog | null>(reduxBlog);
  const [liked,            setLiked]            = useState(false);
  const [likeCount,        setLikeCount]        = useState(0);
  const [comments,         setComments]         = useState<Comment[]>([]);
  const [newComment,       setNewComment]       = useState('');
  const [showComments,     setShowComments]     = useState(false);
  const [isBookmarked,     setIsBookmarked]     = useState(false);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [showModal,        setShowModal]        = useState(false);
  const [deleteLoading,    setDeleteLoading]    = useState(false);

  useEffect(() => {
    if (!reduxBlog) {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`${API_URL}/blogs/${id}`);
          setBlogState(res.data.blog ?? res.data);
        } catch {
          router.replace('/blog');
        }
      };
      fetchBlog();
    } else {
      setBlogState(reduxBlog);
    }
  }, [reduxBlog, id, router]);

  useEffect(() => {
    if (!blog) return;
    setLiked(blog.likes?.some((l) => l.user === currentUser?._id) ?? false);
    setLikeCount(blog.likes?.length ?? 0);
    setComments(blog.comments ?? []);
  }, [blog, currentUser]);

  useEffect(() => {
    const containers = document.querySelectorAll('.ql-code-block-container');
    containers.forEach((container) => {
      const btn = document.createElement('button');
      btn.innerText = 'Copy';
      btn.className = 'copy-btn';
      btn.addEventListener('click', () => {
        const code = Array.from(container.querySelectorAll('.ql-code-block')).map((d) => (d as HTMLElement).innerText).join('\n');
        if (code.trim()) {
          navigator.clipboard.writeText(code);
          btn.innerText = 'Copied!';
          setTimeout(() => { btn.innerText = 'Copy'; }, 2000);
        }
      });
      (container as HTMLElement).style.position = 'relative';
      container.appendChild(btn);
    });
  }, [blog]);

  const handleLike = async () => {
    setLiked((p) => !p);
    setLikeCount((p) => liked ? p - 1 : p + 1);
    try {
      await axios.post(`${API_URL}/blogs/${blog!._id}/toggle-like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch { /* non-critical */ }
  };

  const handleBlogDelete = async () => {
    if (!blog) return;
    try {
      setDeleteLoading(true);
      await axios.delete(`${API_URL}/blogs/${blog._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Blog Deleted Successfully');
      router.push('/blog');
    } catch {
      toast.error('Failed to delete blog');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim() || !blog) return;
    const comment: Comment = {
      _id: Date.now().toString(),
      author: currentUser!,
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setComments((p) => [...p, comment]);
    setNewComment('');
    try {
      await axios.post(`${API_URL}/blogs/${blog._id}/add-comment`, { content: newComment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch { /* non-critical */ }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const formatTime = (d: string) => new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (!blog) return null;

  const isAuthor = blog.author?._id === currentUser?._id;

  return (
    <>
      {showModal && (
        <DeleteModal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleBlogDelete} isLoading={deleteLoading} />
      )}

      <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <motion.div
          className="max-w-5xl mx-auto px-4 md:px-6 pt-8 pb-12"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden" animate="visible"
        >
          {/* Hero */}
          <motion.div className="mb-10" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span
                  className="px-3 py-1 rounded text-sm font-medium"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}
                >
                  {blog.category}
                </span>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /><span>{blog.views} views</span></div>
                  <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>{blog.readTime} min read</span></div>
                </div>
              </div>

              {isAuthor ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/update-blog/${blog._id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}
                  >
                    <Edit className="w-4 h-4" />Update
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: 'var(--danger-dim)', color: 'var(--danger)', border: '0.5px solid rgba(248,113,113,0.2)' }}
                  >
                    <Trash2 className="w-4 h-4" />Delete
                  </button>
                </div>
              ) : null}
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
              {blog.title}
            </h1>
            <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{blog.excerpt}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden" style={{ border: '0.5px solid var(--border)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" src={blog.author?.profilePicture} alt={blog.author?.firstName} />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{blog.author?.firstName} {blog.author?.lastName}</div>
                <div className="text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar className="w-3.5 h-3.5" />{formatDate(blog.publishedAt ?? blog.createdAt ?? '')}
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden mb-10" style={{ border: '0.5px solid var(--border)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={blog.featuredImage} alt={blog.title} className="w-full h-72 md:h-[420px] object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-2 rounded-lg transition-colors duration-150"
                  style={{ background: 'rgba(8,8,8,0.6)', border: '0.5px solid var(--border)', color: isBookmarked ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  className="p-2 rounded-lg transition-colors duration-150"
                  style={{ background: 'rgba(8,8,8,0.6)', border: '0.5px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div className="mb-10" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <div className="rounded-xl p-6 md:p-10" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div className="mb-10" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
              <h3 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
                <Tag className="w-4 h-4" style={{ color: 'var(--accent)' }} />Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-sm"
                    style={{ background: 'var(--accent-dim)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-secondary)' }} />{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Engagement */}
          <motion.div className="mb-10" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <div className="rounded-xl p-5" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLike}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={liked
                      ? { background: 'rgba(248,113,113,0.08)', color: 'var(--danger)', border: '0.5px solid rgba(248,113,113,0.2)' }
                      : { background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }
                    }
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} /><span>{likeCount}</span>
                  </button>
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                  >
                    <MessageCircle className="w-4 h-4" /><span>{comments.length}</span>
                  </button>
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                  >
                    <Share2 className="w-4 h-4" /><span>Share</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Eye className="w-4 h-4" /><span>{blog.views} views</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comments */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                className="rounded-xl p-6 md:p-8"
                style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-base font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
                  <MessageCircle className="w-4 h-4" style={{ color: 'var(--accent)' }} />Discussion ({comments.length})
                </h3>

                <div className="mb-6 rounded-lg overflow-hidden" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={currentUser?.profilePicture} alt={currentUser?.firstName} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex-1">
                        <textarea
                          value={newComment} onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Join the conversation…" rows={3}
                          className="w-full resize-none text-sm"
                          style={{ background: 'transparent', border: 'none', outline: 'none', padding: 0, boxShadow: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3" style={{ borderTop: '0.5px solid var(--border)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{newComment.length}/500</span>
                    <button
                      onClick={handleComment} disabled={!newComment.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-40"
                      style={{ background: 'var(--accent)', color: '#080808' }}
                    >
                      <Send className="w-3.5 h-3.5" />Post Comment
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-10">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    comments.slice(0, showMoreComments ? comments.length : 3).map((comment, i) => (
                      <motion.div
                        key={comment._id}
                        className="rounded-lg p-4"
                        style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      >
                        <div className="flex items-start gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={comment.author?.profilePicture} alt={comment.author?.firstName} className="w-8 h-8 rounded-full object-cover" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{comment.author?.firstName} {comment.author?.lastName}</span>
                              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{formatTime(comment.createdAt)}</span>
                            </div>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{comment.content}</p>
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 text-xs transition-colors duration-150" style={{ color: 'var(--text-secondary)' }}>
                                <ThumbsUp className="w-3.5 h-3.5" /><span>{comment.likes}</span>
                              </button>
                              <button className="text-xs transition-colors duration-150" style={{ color: 'var(--text-secondary)' }}>Reply</button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {comments.length > 3 && (
                  <div className="text-center mt-5">
                    <button
                      onClick={() => setShowMoreComments(!showMoreComments)}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                      style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                    >
                      {showMoreComments ? <><ChevronUp className="w-4 h-4" />Show Less</> : <><ChevronDown className="w-4 h-4" />Load More Comments ({comments.length - 3})</>}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
