'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Youtube, FileText, PenTool, Play, Clock,
  CheckCircle, Circle, Sparkles,
} from 'lucide-react';
import MagicNotes from './MagicNotes';
import type { Subtopic } from '@/types';

interface LearningResourceTableProps {
  filteredResources: Subtopic[];
  completedSubtopics: Subtopic[];
  setCompletedSubtopics: React.Dispatch<React.SetStateAction<Subtopic[]>>;
  updateProgress: (id: string, type: string) => void;
  selectedTopic: string;
}

// TODO: type subtopic content fields more precisely when API shape is confirmed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResourceContent = any;

const difficultyStyle = (d?: string): React.CSSProperties => {
  switch (d?.toLowerCase()) {
    case 'easy':   return { background: 'rgba(74,222,158,0.08)', color: '#4ade9e', border: '0.5px solid rgba(74,222,158,0.2)' };
    case 'medium': return { background: 'rgba(251,191,36,0.08)', color: '#fbbf24', border: '0.5px solid rgba(251,191,36,0.2)' };
    case 'hard':   return { background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '0.5px solid rgba(248,113,113,0.2)' };
    default:       return { background: 'var(--accent-dim)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' };
  }
};

export default function LearningResourceTable({
  filteredResources,
  completedSubtopics,
  setCompletedSubtopics,
  updateProgress,
  selectedTopic,
}: LearningResourceTableProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isModalOpen,    setIsModalOpen]    = useState<string | null>(null);

  useEffect(() => {
    if (completedSubtopics?.length) {
      setCompletedItems(new Set(completedSubtopics.map((s) => s._id)));
    }
  }, [completedSubtopics]);

  const toggleComplete = (id: string) => {
    setCompletedItems((prev) => {
      const next = new Set(prev);
      if (!next.has(id)) {
        setCompletedSubtopics((p) => [...p, { _id: id } as Subtopic]);
        next.add(id);
        updateProgress(id, 'subtopic');
      }
      return next;
    });
  };

  const iconBtn = (url: string | undefined, icon: React.ReactNode, activeStyle: React.CSSProperties) =>
    url
      ? <button onClick={() => window.open(url, '_blank')} className="p-2 rounded-lg transition-colors duration-150" style={activeStyle}>{icon}</button>
      : <div className="p-2 rounded-lg" style={{ background: 'var(--bg-base)', border: '0.5px solid var(--border)' }}>{icon}</div>;

  return (
    <>
      <div className="max-h-screen overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ background: 'var(--bg-elevated)', borderBottom: '0.5px solid var(--border)' }}>
                  <tr>
                    <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider w-12" style={{ color: 'var(--text-secondary)' }}>Status</th>
                    <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Topic</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider w-20 text-center" style={{ color: 'var(--text-secondary)' }}>YT</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider w-20 text-center" style={{ color: 'var(--text-secondary)' }}>Notes</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider w-20 text-center" style={{ color: 'var(--text-secondary)' }}>PDF</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider w-20 text-center" style={{ color: 'var(--text-secondary)' }}>Time</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider w-28 text-center" style={{ color: 'var(--text-secondary)' }}>Quiz</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((resource) => {
                    const content: ResourceContent = (resource as ResourceContent).content ?? {};
                    const isCompleted = completedItems.has(resource._id);

                    return (
                      <tr
                        key={resource._id}
                        className="transition-colors duration-150"
                        style={{ borderBottom: '0.5px solid var(--border)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {/* Status */}
                        <td className="p-4">
                          <button onClick={() => toggleComplete(resource._id)} className="transition-colors duration-150">
                            {isCompleted
                              ? <CheckCircle className="h-5 w-5" style={{ color: 'var(--success)' }} />
                              : <Circle className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />}
                          </button>
                        </td>

                        {/* Topic */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{resource.title}</h3>
                                <span className="px-2 py-0.5 rounded text-xs font-medium" style={difficultyStyle(resource.difficulty)}>
                                  {resource.difficulty}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {resource.tags?.map((tag, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--accent-dim)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => setIsModalOpen(resource.magicNotes ?? null)}
                              className="p-1.5 rounded-lg transition-colors duration-150"
                              style={
                                resource.magicNotes
                                  ? { background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '0.5px solid rgba(251,191,36,0.2)' }
                                  : { background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }
                              }
                            >
                              <Sparkles className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* YouTube */}
                        <td className="p-4"><div className="flex justify-center">
                          {iconBtn(
                            content.youtubeLinks?.url,
                            <Youtube className="h-4 w-4" style={{ color: content.youtubeLinks?.url ? '#f87171' : 'var(--text-muted)' }} />,
                            { background: 'rgba(248,113,113,0.08)', border: '0.5px solid rgba(248,113,113,0.2)' },
                          )}
                        </div></td>

                        {/* Notes */}
                        <td className="p-4"><div className="flex justify-center">
                          {iconBtn(
                            content.notesLinks?.url,
                            <FileText className="h-4 w-4" style={{ color: content.notesLinks?.url ? 'var(--accent)' : 'var(--text-muted)' }} />,
                            { background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' },
                          )}
                        </div></td>

                        {/* PDFs */}
                        <td className="p-4"><div className="flex justify-center">
                          {iconBtn(
                            content.handwrittenPDFs?.url,
                            <PenTool className="h-4 w-4" style={{ color: content.handwrittenPDFs?.url ? 'var(--success)' : 'var(--text-muted)' }} />,
                            { background: 'rgba(74,222,158,0.08)', border: '0.5px solid rgba(74,222,158,0.2)' },
                          )}
                        </div></td>

                        {/* Time */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1">
                            <Clock className="h-3.5 w-3.5" style={{ color: 'var(--text-secondary)' }} />
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{(resource as ResourceContent).estimatedTime}</span>
                          </div>
                        </td>

                        {/* Quiz */}
                        <td className="p-4"><div className="flex justify-center">
                          <Link
                            href={`/ai-quiz/${encodeURIComponent(selectedTopic)}/${encodeURIComponent(resource.title)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150"
                            style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}
                          >
                            <Play className="h-3 w-3" />
                            Start
                          </Link>
                        </div></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MagicNotes magicNotes={isModalOpen} setIsModalOpen={(v) => setIsModalOpen(v ? isModalOpen : null)} />
      )}
    </>
  );
}
