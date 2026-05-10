'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, BookOpen, Code, Database, Globe, Smartphone, Brain,
  Bookmark, Play, Youtube, FileText, PenTool, ExternalLink,
  Monitor, Layers, Server, Shield, Cpu, Network, GitBranch, Zap,
  PlayCircle,
} from 'lucide-react';
import LearningResourceTable from '@/components/LearningResourceTable';
import { useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import { API_URL } from '@/constants';
import toast from 'react-hot-toast';
import type { Topic, Subtopic } from '@/types';

const ICON_MAP: Record<string, React.ElementType> = {
  Search, BookOpen, Code, Database, Globe, Smartphone, Brain, Bookmark, Play,
  Youtube, FileText, PenTool, ExternalLink, Monitor, Layers, Server, Shield,
  Cpu, Network, GitBranch, Zap,
};

export default function LearningPage() {
  const [selectedTopic,      setSelectedTopic]      = useState<Topic | null>(null);
  const [searchTerm,         setSearchTerm]         = useState('');
  const [completedSubtopics, setCompletedSubtopics] = useState<Subtopic[]>([]);
  const router = useRouter();

  const topicsData = useAppSelector((s) => s.topics.topics);
  const topics = useMemo(() => topicsData.filter((t) => !t.practiceTopics), [topicsData]);

  useEffect(() => {
    if (topics.length > 0 && !selectedTopic) setSelectedTopic(topics[0]);
  }, [topics, selectedTopic]);

  const subtopics = useMemo(() => selectedTopic?.subTopics ?? [], [selectedTopic]);

  const filteredResources = useMemo(() => {
    if (!searchTerm.trim()) return subtopics;
    return subtopics.filter((r) => r.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [subtopics, searchTerm]);

  const getProgressData = async () => {
    if (!selectedTopic) return;
    try {
      const res = await axios.get(`${API_URL}/progress/${selectedTopic._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.data.success) setCompletedSubtopics(res.data.data[0]?.completedSubtopics ?? []);
    } catch { /* non-critical */ }
  };

  const updateProgress = async (id: string, type: string) => {
    if (!selectedTopic) return;
    try {
      const res = await axios.post(
        `${API_URL}/progress/`,
        { topicId: selectedTopic._id, subtopicId: id, type },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      );
      if (res.data.success) toast.success('Marked as completed');
    } catch {
      toast.error('Failed to update progress');
    }
  };

  useEffect(() => { getProgressData(); }, [selectedTopic]); // eslint-disable-line react-hooks/exhaustive-deps

  const total    = selectedTopic?.subTopics?.length ?? 0;
  const progress = total ? Math.round((completedSubtopics.length / total) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 min-h-screen flex-shrink-0" style={{ background: 'var(--bg-surface)', borderRight: '0.5px solid var(--border)' }}>
          <div className="p-5" style={{ borderBottom: '0.5px solid var(--border)' }}>
            <h2 className="text-base font-bold mb-1" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Learning Topics</h2>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Choose a topic to start learning</p>
          </div>
          <div className="p-3">
            <div className="space-y-1">
              {topics.map((topic) => {
                const Icon = ICON_MAP[topic.icon ?? ''] ?? BookOpen;
                const isSelected = selectedTopic?._id === topic._id;
                return (
                  <button
                    key={topic._id}
                    onClick={() => { setSelectedTopic(topic); setSearchTerm(''); }}
                    className="w-full p-3 rounded-lg text-left transition-colors duration-150"
                    style={{
                      background: isSelected ? 'var(--accent-dim)' : 'transparent',
                      border: isSelected ? '0.5px solid var(--accent-border)' : '0.5px solid transparent',
                      color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 flex-shrink-0" style={{ color: isSelected ? 'var(--accent)' : 'var(--text-secondary)' }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{topic.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{topic.subTopics?.length ?? 0} resources</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{selectedTopic?.title ?? 'Select a Topic'}</h1>
              {selectedTopic && (
                <button
                  onClick={() => router.push(`/ai-quiz/${encodeURIComponent(selectedTopic.title)}/interview-related/?questions=50`)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{ background: 'var(--accent)', color: '#080808' }}
                >
                  <PlayCircle size={16} />
                  Start Mock Interview
                </button>
              )}
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{selectedTopic?.description ?? 'Choose a topic from the sidebar to get started'}</p>
            <div className="h-px rounded-full overflow-hidden mb-2" style={{ background: 'var(--border)' }}>
              <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: 'var(--accent)' }} />
            </div>
            <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span>{completedSubtopics.length} of {total} completed</span>
              <span>{progress}%</span>
            </div>
          </div>

          {selectedTopic && (
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text" placeholder="Search resources…" value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9"
                />
              </div>
            </div>
          )}

          {selectedTopic && (
            filteredResources.length > 0 ? (
              <LearningResourceTable
                filteredResources={filteredResources}
                completedSubtopics={completedSubtopics}
                setCompletedSubtopics={setCompletedSubtopics}
                updateProgress={updateProgress}
                selectedTopic={selectedTopic.title}
              />
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-10 w-10 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{searchTerm ? 'No resources found' : 'No resources available'}</h3>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{searchTerm ? 'Try adjusting your search or select a different topic.' : 'This topic has no resources yet.'}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
