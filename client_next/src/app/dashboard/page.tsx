'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain, TrendingUp, Award, Clock, CheckCircle, ArrowRight, Zap,
  Activity, FileText, PlayCircle, Code, Users, Lightbulb, Mic, Rocket,
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateProfilePicture } from '@/redux/features/authSlice';
import axios from 'axios';
import { API_URL } from '@/constants';
import toast from 'react-hot-toast';

const difficultyStyle = (d?: string): React.CSSProperties => {
  if (!d) return { background: 'var(--accent-dim)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' };
  if (['easy', 'beginner'].includes(d))       return { background: 'rgba(74,222,158,0.08)', color: '#4ade9e', border: '0.5px solid rgba(74,222,158,0.2)' };
  if (['medium', 'intermediate'].includes(d)) return { background: 'rgba(251,191,36,0.08)', color: '#fbbf24', border: '0.5px solid rgba(251,191,36,0.2)' };
  if (['hard', 'advanced'].includes(d))       return { background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '0.5px solid rgba(248,113,113,0.2)' };
  return { background: 'var(--accent-dim)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' };
};

const statusStyle = (s: string): React.CSSProperties => {
  if (s === 'completed')  return { background: 'rgba(74,222,158,0.08)', color: '#4ade9e', border: '0.5px solid rgba(74,222,158,0.2)' };
  if (s === 'published')  return { background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' };
  if (s === 'in-progress') return { background: 'rgba(251,191,36,0.08)', color: '#fbbf24', border: '0.5px solid rgba(251,191,36,0.2)' };
  return { background: 'var(--accent-dim)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' };
};

export default function DashboardPage() {
  const { user }  = useAppSelector((s) => s.auth);
  const dispatch  = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const stats = [
    { title: 'Questions Solved',  value: user?.stats?.questionsCompleted, icon: CheckCircle, description: 'Coding problems solved' },
    { title: 'Modules Completed', value: user?.stats?.modulesCompleted,   icon: Award,       description: 'Learning modules finished' },
    { title: 'Mock Interviews',   value: user?.stats?.mockInterviews,     icon: Brain,       description: 'Practice sessions completed' },
    { title: 'Blogs Written',     value: user?.stats?.blogsWritten,       icon: FileText,    description: 'Articles published' },
  ];

  const recentActivity = [
    { type: 'question', title: user?.activity?.latestQuestion?.title,                    topic: user?.activity?.latestQuestion?.tags?.[0],             status: 'completed', difficulty: user?.activity?.latestQuestion?.difficulty,   icon: Code },
    { type: 'module',   title: user?.activity?.latestSubtopic?.title,                    topic: user?.activity?.latestSubtopic?.tags?.[0],             status: 'completed', difficulty: user?.activity?.latestSubtopic?.difficulty,   icon: PlayCircle },
    { type: 'mock',     title: user?.activity?.latestInterviewSession?.role ? `Mock Interview: ${user.activity.latestInterviewSession.role}` : undefined, topic: user?.activity?.latestInterviewSession?.role, status: 'completed', difficulty: 'medium', icon: Users },
    { type: 'blog',     title: user?.activity?.latestBlog?.title,                        topic: user?.activity?.latestBlog?.category,                  status: 'published', difficulty: 'intermediate',                               icon: FileText },
  ];

  const quickActions = [
    { title: 'Practice Questions', description: 'Solve curated coding problems',  icon: Code,       href: '/practice',        stats: '2,500+ questions' },
    { title: 'Mock Interview',     description: 'AI-powered interview practice',   icon: Brain,      href: '/mock-interview',  stats: 'Real-time feedback' },
    { title: 'Write Blog',         description: 'Share your knowledge',            icon: FileText,   href: '/create-blog',     stats: 'Build your portfolio' },
    { title: 'Learning Modules',   description: 'Structured learning paths',       icon: PlayCircle, href: '/learning',        stats: '50+ modules' },
  ];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profilePicture', file);
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/users/upload-profile-picture`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(updateProfilePicture(res.data.profilePicture));
    } catch {
      toast.error('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
                Welcome back, {user?.fullName}
              </h1>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>Ready to continue your coding journey?</p>
            </div>
            <div className="hidden md:block">
              <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                <div className="relative w-12 h-12 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user?.profilePicture} alt="profile" className="w-12 h-12 rounded-full object-cover" style={{ border: '0.5px solid var(--border)' }} />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="absolute inset-0 rounded-full flex items-center justify-center transition opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} /> : '📷'}
                  </button>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Member since</p>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.08 }}>
                <div
                  className="p-5 rounded-xl transition-colors duration-150"
                  style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{stat.title}</p>
                      <p className="text-3xl font-bold mb-0.5" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{stat.value ?? 0}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stat.description}</p>
                    </div>
                    <div className="p-2 rounded-lg" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                      <Icon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="xl:col-span-2">
            <div className="p-5 rounded-xl" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
              <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
                <Zap className="h-4 w-4" style={{ color: 'var(--warning)' }} /> Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} href={action.href} className="block group">
                      <div
                        className="p-4 rounded-lg transition-colors duration-150"
                        style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(226,226,226,0.18)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-lg" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                            <Icon className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                          </div>
                          <ArrowRight className="h-3.5 w-3.5" style={{ color: 'var(--text-secondary)' }} />
                        </div>
                        <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{action.title}</h3>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{action.description}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--accent)' }}>{action.stats}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="xl:col-span-3">
            <div className="p-5 rounded-xl" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
              <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
                <Activity className="h-4 w-4" style={{ color: 'var(--accent)' }} /> Recent Activity
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  if (!activity.title && !activity.topic) return null;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
                    >
                      <div className="flex items-center flex-1">
                        <Icon className="h-4 w-4 mr-3 flex-shrink-0" style={{ color: 'var(--text-secondary)' }} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{activity.title}</h3>
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{activity.topic}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs" style={difficultyStyle(activity.difficulty)}>
                            {activity.difficulty}
                          </span>
                        </div>
                      </div>
                      <span className="ml-3 px-2 py-0.5 rounded text-xs font-medium" style={statusStyle(activity.status)}>
                        {activity.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mt-8 px-6 py-8 rounded-xl" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            <h2 className="text-xl font-bold text-center mb-8" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Get the Most Out of InterviewReady</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { icon: Lightbulb, title: 'Smart Learning Paths',   desc: 'Follow structured roadmaps tailored for DSA, System Design, and Core CS subjects.' },
                { icon: Rocket,    title: 'Daily Practice Booster', desc: 'Strengthen your skills with daily curated problems and flash quizzes.' },
                { icon: Mic,       title: 'Mock Interview Arena',   desc: 'Practice with AI-powered mock interviews and get actionable feedback.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="rounded-lg p-5" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                  <div className="p-2 inline-flex rounded-lg mb-3" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-8 py-6 text-center text-sm" style={{ borderTop: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>
        <p>© {new Date().getFullYear()} <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>InterviewReady</span>. Designed with passion to empower future engineers.</p>
      </footer>
    </div>
  );
}
