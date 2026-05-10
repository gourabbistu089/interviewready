'use client';

import React, { useState, useEffect } from 'react';
import {
  Search, BookOpen, Code, Database, Globe, Smartphone, Brain,
  Bookmark, Play, Youtube, FileText, PenTool, ExternalLink,
  Monitor, Layers, Server, Shield, Cpu, Network, GitBranch, Zap,
} from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import PracticeResourceTable from '@/components/PracticeResourceTable';
import type { Topic, Subtopic } from '@/types';

const ICON_MAP: Record<string, React.ElementType> = {
  Search, BookOpen, Code, Database, Globe, Smartphone, Brain, Bookmark, Play,
  Youtube, FileText, PenTool, ExternalLink, Monitor, Layers, Server, Shield,
  Cpu, Network, GitBranch, Zap,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PracticeSubtopic = Subtopic & { questions: any[] };

export default function PracticePage() {
  const [topics,            setTopics]            = useState<Topic[]>([]);
  const [selectedTopic,     setSelectedTopic]     = useState<Topic | null>(null);
  const [subtopics,         setSubtopics]         = useState<PracticeSubtopic[]>([]);
  const [filteredResources, setFilteredResources] = useState<PracticeSubtopic[]>([]);
  const [searchTerm,        setSearchTerm]        = useState('');

  const topicsData = useAppSelector((s) => s.topics.topics);

  useEffect(() => {
    if (topicsData?.length) {
      const practiceTopics = topicsData.filter((t) => t.practiceTopics === true);
      setTopics(practiceTopics);
      if (practiceTopics.length > 0) {
        setSelectedTopic(practiceTopics[0]);
        const subs = (practiceTopics[0].subTopics ?? []) as PracticeSubtopic[];
        setSubtopics(subs);
        setFilteredResources(subs);
      }
    }
  }, [topicsData]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 min-h-screen flex-shrink-0" style={{ background: 'var(--bg-surface)', borderRight: '0.5px solid var(--border)' }}>
          <div className="p-5" style={{ borderBottom: '0.5px solid var(--border)' }}>
            <h2 className="text-base font-bold mb-1" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Practice Hub</h2>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Master interview questions across all topics</p>
          </div>
          <div className="p-3">
            <div className="space-y-1">
              {topics.map((topic) => {
                const Icon = ICON_MAP[topic.icon ?? ''] ?? BookOpen;
                const isSelected = selectedTopic?._id === topic._id;
                return (
                  <button
                    key={topic._id}
                    onClick={() => {
                      setSelectedTopic(topic);
                      const subs = (topic.subTopics ?? []) as PracticeSubtopic[];
                      setSubtopics(subs);
                      setFilteredResources(subs);
                      setSearchTerm('');
                    }}
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
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                          {(topic as Topic & { count?: number }).count ?? topic.subTopics?.length ?? 0} questions
                        </p>
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
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
                <BookOpen className="h-4 w-4" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{selectedTopic?.title}</h1>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selectedTopic?.description}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text" placeholder="Search resources…" value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  if (!val) { setFilteredResources(subtopics); return; }
                  setFilteredResources(subtopics.filter((r) => r.title.toLowerCase().includes(val.toLowerCase())));
                }}
                className="w-full pl-9"
              />
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <PracticeResourceTable filteredResources={filteredResources} />
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-10 w-10 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
              <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>No resources found</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or select a different topic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
