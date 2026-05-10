'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, BookOpen, CheckCircle, Circle,
  Code2, PlayCircle, FileText, Star,
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from '@/constants';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/hooks';
import type { Subtopic } from '@/types';

// TODO: type question shape more precisely when API shape is confirmed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyQuestion = any;

interface QuestionModuleProps {
  topicIndex: number;
  topicId: string;
  topic: Subtopic & { questions: AnyQuestion[] };
  expandedTopics: Record<string, boolean>;
  setExpandedTopics: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const difficultyAccent = (d: string) => {
  if (d === 'easy')   return 'var(--success)';
  if (d === 'medium') return 'var(--warning)';
  if (d === 'hard')   return 'var(--danger)';
  return 'var(--border)';
};

export default function QuestionModule({ topicIndex, topicId, topic, expandedTopics, setExpandedTopics }: QuestionModuleProps) {
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [revisionQuestions,  setRevisionQuestions]  = useState<string[]>([]);
  const { user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    setRevisionQuestions(user?.revisionQuestions ?? []);
  }, [user]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_URL}/progress/${topicId}/questions`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (res.data.success) {
          setCompletedQuestions(res.data.data?.[0]?.completedQuestions ?? []);
        }
      } catch { /* non-critical */ }
    };
    load();
  }, [topicId]);

  const toggleTopic = (id: string) =>
    setExpandedTopics((prev) => ({ [id]: !prev[id] }));

  const addToMarked = async (questionId: string) => {
    if (completedQuestions.includes(questionId)) return;
    setCompletedQuestions((prev) => [...prev, questionId]);
    try {
      const res = await axios.post(
        `${API_URL}/progress/`,
        { subtopicId: topicId, questionId, type: 'question' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      );
      if (res.data.success) toast.success('Marked as completed');
    } catch { toast.error('Failed to update progress'); }
  };

  const toggleRevision = async (questionId: string) => {
    setRevisionQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    );
    try {
      const res = await axios.post(
        `${API_URL}/users/revision/${questionId}`, {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      );
      if (res.data.success) toast.success(res.data.message ?? 'Revision status updated');
    } catch { toast.error('Failed to add to revision list'); }
  };

  const pct = topic.questions.length ? Math.round((completedQuestions.length / topic.questions.length) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: topicIndex * 0.05 }}
      style={{ borderBottom: '0.5px solid var(--border)' }}
    >
      {/* Header */}
      <div
        onClick={() => toggleTopic(topic._id)}
        className="p-5 cursor-pointer select-none transition-colors duration-150"
        style={{ borderLeft: `3px solid ${difficultyAccent('easy')}` }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}
            >
              <BookOpen className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>{topic.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--accent-dim)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}>
                  {topic.questions.length} problems
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 ml-4">
            <div className="text-right">
              <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                {completedQuestions.length}/{topic.questions.length}
              </div>
              <div className="w-32 h-px rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: 'var(--accent)' }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{pct}%</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>done</div>
            </div>
            <motion.div
              className="p-2 rounded-lg"
              style={{ color: 'var(--text-secondary)' }}
              animate={{ rotate: expandedTopics[topic._id] ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <AnimatePresence>
        {expandedTopics[topic._id] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: 'var(--bg-base)', borderTop: '0.5px solid var(--border)' }}
          >
            <div className="p-4">
              {/* Column headers */}
              <div
                className="grid grid-cols-12 gap-4 mb-3 px-4 py-2 rounded-lg"
                style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
              >
                <div className="col-span-1 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Done</div>
                <div className="col-span-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Problem</div>
                <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Practice</div>
                <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Video</div>
                <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Notes</div>
                <div className="col-span-1 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Mark</div>
              </div>

              <div className="space-y-2">
                {topic.questions.map((question: AnyQuestion, qi: number) => (
                  <motion.div
                    key={question._id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: qi * 0.04 }}
                    className="grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg transition-colors duration-150"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '0.5px solid var(--border)',
                      borderLeft: `2px solid ${difficultyAccent(question.difficulty)}`,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-surface)')}
                  >
                    {/* Status */}
                    <div className="col-span-1 flex justify-center">
                      <button onClick={() => addToMarked(question._id)}>
                        {completedQuestions.includes(question._id)
                          ? <CheckCircle className="w-5 h-5" style={{ color: 'var(--success)' }} />
                          : <Circle className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />}
                      </button>
                    </div>

                    {/* Problem */}
                    <div className="col-span-4">
                      <h4 className="text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{question.title}</h4>
                      <div className="flex flex-wrap gap-1">
                        {question.company?.slice(0, 3).map((comp: string, ci: number) => (
                          <span
                            key={ci}
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded"
                            style={{ background: 'var(--accent-dim)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                          >
                            {comp}
                          </span>
                        ))}
                        {question.company?.length > 3 && (
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>+{question.company.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Practice */}
                    <div className="col-span-2 flex justify-center">
                      {question.content?.practiceLinks?.url
                        ? <a href={question.content.practiceLinks.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg transition-colors duration-150" style={{ background: 'rgba(74,222,158,0.08)', border: '0.5px solid rgba(74,222,158,0.2)' }}><Code2 className="w-4 h-4" style={{ color: 'var(--success)' }} /></a>
                        : <div className="p-2 rounded-lg" style={{ background: 'var(--bg-base)', border: '0.5px solid var(--border)' }}><Code2 className="w-4 h-4" style={{ color: 'var(--text-muted)' }} /></div>}
                    </div>

                    {/* Video */}
                    <div className="col-span-2 flex justify-center">
                      {question.content?.youtubeLinks?.url
                        ? <a href={question.content.youtubeLinks.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg transition-colors duration-150" style={{ background: 'rgba(248,113,113,0.08)', border: '0.5px solid rgba(248,113,113,0.2)' }}><PlayCircle className="w-4 h-4" style={{ color: 'var(--danger)' }} /></a>
                        : <div className="p-2 rounded-lg" style={{ background: 'var(--bg-base)', border: '0.5px solid var(--border)' }}><PlayCircle className="w-4 h-4" style={{ color: 'var(--text-muted)' }} /></div>}
                    </div>

                    {/* Notes */}
                    <div className="col-span-2 flex justify-center">
                      {question.content?.notesLinks?.url
                        ? <a href={question.content.notesLinks.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg transition-colors duration-150" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}><FileText className="w-4 h-4" style={{ color: 'var(--accent)' }} /></a>
                        : <div className="p-2 rounded-lg" style={{ background: 'var(--bg-base)', border: '0.5px solid var(--border)' }}><FileText className="w-4 h-4" style={{ color: 'var(--text-muted)' }} /></div>}
                    </div>

                    {/* Revision */}
                    <div className="col-span-1 flex justify-center">
                      <button onClick={() => toggleRevision(question._id)} className="p-2 rounded-lg transition-colors duration-150" style={
                        revisionQuestions.includes(question._id)
                          ? { background: 'rgba(251,191,36,0.1)', border: '0.5px solid rgba(251,191,36,0.2)' }
                          : { background: 'var(--bg-base)', border: '0.5px solid var(--border)' }
                      }>
                        <Star className="w-4 h-4" style={{ color: revisionQuestions.includes(question._id) ? '#fbbf24' : 'var(--text-muted)', fill: revisionQuestions.includes(question._id) ? '#fbbf24' : 'transparent' }} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
