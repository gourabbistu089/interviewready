'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, Star, Target,
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from '@/constants';

interface Feedback {
  feedback: string;
  positives?: string;
  tip?: string;
  score: number;
  nextQuestion?: string;
  questionNumber?: number;
  isComplete?: boolean;
}

interface InterviewResponse {
  sessionId: string;
  question: string;
  questionNumber: number;
  totalQuestions: number;
}

interface CompleteResponse {
  [key: string]: unknown;
}

interface InterviewSessionProps {
  role: string;
  onComplete: (result: CompleteResponse) => void;
  onBack: () => void;
}

const apiService = {
  startInterview: async (role: string, token: string): Promise<InterviewResponse> => {
    const res = await axios.post(
      `${API_URL}/interview/start`,
      { role },
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  submitAnswer: async (sessionId: string, answer: string, token: string): Promise<Feedback> => {
    const res = await axios.post(
      `${API_URL}/interview/answer`,
      { sessionId, answer },
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },

  completeInterview: async (sessionId: string, token: string): Promise<CompleteResponse> => {
    const res = await axios.post(
      `${API_URL}/interview/complete`,
      { sessionId },
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    );
    return res.data;
  },
};

export default function InterviewSession({ role, onComplete, onBack }: InterviewSessionProps) {
  const [sessionId,       setSessionId]       = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [questionNumber,  setQuestionNumber]  = useState(1);
  const [totalQuestions,  setTotalQuestions]  = useState(10);
  const [userAnswer,      setUserAnswer]      = useState('');
  const [feedback,        setFeedback]        = useState<Feedback | null>(null);
  const [loading,         setLoading]         = useState(false);
  const [isComplete,      setIsComplete]      = useState(false);
  const [showFeedback,    setShowFeedback]    = useState(false);
  const [score,           setScore]           = useState(0);
  const [isStarting,      setIsStarting]      = useState(true);

  useEffect(() => { startInterview(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startInterview = async () => {
    const token = localStorage.getItem('token') ?? '';
    if (!token) { console.error('Not authenticated'); return; }
    setLoading(true);
    try {
      const response = await apiService.startInterview(role, token);
      setSessionId(response.sessionId);
      setCurrentQuestion(response.question);
      setQuestionNumber(response.questionNumber);
      setTotalQuestions(response.totalQuestions);
      setIsStarting(false);
    } catch (err) {
      console.error('Error starting interview:', err);
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    const token = localStorage.getItem('token') ?? '';
    setLoading(true);
    try {
      const response = await apiService.submitAnswer(sessionId, userAnswer, token);
      setFeedback(response);
      setScore(response.score);
      setShowFeedback(true);
      if (response.isComplete) setIsComplete(true);
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
    setLoading(false);
  };

  const nextQuestion = () => {
    if (feedback?.nextQuestion) {
      setCurrentQuestion(feedback.nextQuestion);
      setQuestionNumber(feedback.questionNumber ?? questionNumber + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowFeedback(false);
    }
  };

  const completeInterview = async () => {
    const token = localStorage.getItem('token') ?? '';
    setLoading(true);
    try {
      const response = await apiService.completeInterview(sessionId, token);
      onComplete(response);
    } catch (err) {
      console.error('Error completing interview:', err);
    }
    setLoading(false);
  };

  if (loading && isStarting) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <motion.div
          animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 rounded-full border-2 border-t-transparent"
          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm transition-colors duration-150"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Role Selection
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Clock className="h-4 w-4" />
                Q{questionNumber} / {totalQuestions}
              </div>
              <span
                className="px-3 py-1 rounded text-xs font-medium"
                style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent-border)' }}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="h-px rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                className="h-full"
                style={{ background: 'var(--accent)' }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1.5" style={{ color: 'var(--text-secondary)' }}>
              <span>Progress</span>
              <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6 mb-6"
          style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
            <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>Question {questionNumber}</h2>
          </div>
          <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>{currentQuestion}</p>
        </motion.div>

        {/* Answer Input */}
        <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
            Your Answer
          </label>
          <div className="relative">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here…"
              className="w-full h-36 resize-none text-sm"
              style={{ background: 'var(--bg-elevated)' }}
              disabled={loading || showFeedback}
            />
            <div className="absolute bottom-3 right-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
              {userAnswer.length} chars
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {!showFeedback && (
              <button
                onClick={submitAnswer}
                disabled={loading || !userAnswer.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-40"
                style={{ background: 'var(--accent)', color: '#080808' }}
              >
                {loading && (
                  <motion.div
                    animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 rounded-full border-2 border-t-transparent border-current"
                  />
                )}
                Submit Answer
              </button>
            )}
          </div>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && feedback && (
            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              className="rounded-xl p-6 mb-6"
              style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>Feedback</h3>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(251,191,36,0.08)', border: '0.5px solid rgba(251,191,36,0.2)' }}
                >
                  <Star className="h-4 w-4" style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  <span className="text-sm font-bold" style={{ color: '#fbbf24' }}>{score}/10</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg p-4" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
                  <h4 className="font-semibold text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>AI Feedback</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{feedback.feedback}</p>
                </div>

                {feedback.positives && (
                  <div className="rounded-lg p-4" style={{ background: 'rgba(74,222,158,0.05)', border: '0.5px solid rgba(74,222,158,0.2)', borderLeft: '2px solid var(--success)' }}>
                    <h4 className="font-semibold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--success)' }}>
                      <CheckCircle className="h-3.5 w-3.5" />
                      Strengths
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feedback.positives}</p>
                  </div>
                )}

                {feedback.tip && (
                  <div className="rounded-lg p-4" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)', borderLeft: '2px solid var(--accent)' }}>
                    <h4 className="font-semibold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                      <Target className="h-3.5 w-3.5" />
                      Improvement Tip
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feedback.tip}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                {isComplete ? (
                  <button
                    onClick={completeInterview}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-40"
                    style={{ background: 'rgba(74,222,158,0.12)', color: 'var(--success)', border: '0.5px solid rgba(74,222,158,0.2)' }}
                  >
                    {loading && (
                      <motion.div
                        animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-t-transparent border-current"
                      />
                    )}
                    Complete Interview
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
                    style={{ background: 'var(--accent)', color: '#080808' }}
                  >
                    Next Question
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
