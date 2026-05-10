'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Award } from 'lucide-react';
import RoleSelection from '@/components/Interview/RoleSelection';
import InterviewSession from '@/components/Interview/InterviewSession';

interface Results {
  overallScore: number;
  totalQuestions: number;
  finalFeedback?: string;
}

function InterviewResults({ results, onNewInterview }: { results: Results; onNewInterview: () => void }) {
  const scoreStyle = (s: number): React.CSSProperties =>
    s >= 8
      ? { color: 'var(--success)' }
      : s >= 6
      ? { color: 'var(--warning)' }
      : { color: 'var(--danger)' };

  const scoreMessage = (s: number) =>
    s >= 8 ? 'Excellent performance!' : s >= 6 ? 'Good work! Keep practicing.' : 'Keep learning and improving!';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto p-6">
      <div className="rounded-xl p-8 text-center" style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="mb-6">
          <div className="inline-flex p-3 rounded-xl mb-4" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
            <Award className="h-10 w-10" style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>Interview Complete!</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{scoreMessage(results.overallScore)}</p>
        </motion.div>

        <div className="rounded-lg p-6 mb-5" style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Overall Score</h3>
              <div className="text-4xl font-bold" style={{ ...scoreStyle(results.overallScore), fontFamily: 'Syne, sans-serif' }}>{results.overallScore}/10</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Questions Answered</h3>
              <div className="text-4xl font-bold" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>{results.totalQuestions}</div>
            </div>
          </div>
        </div>

        {results.finalFeedback && (
          <div className="rounded-lg p-5 mb-5 text-left whitespace-pre-line" style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>Final Feedback</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{results.finalFeedback}</p>
          </div>
        )}

        <button
          onClick={onNewInterview}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
          style={{ background: 'var(--accent)', color: '#080808' }}
        >
          <Play className="h-4 w-4" />
          New Interview
        </button>
      </div>
    </motion.div>
  );
}

type ViewType = 'roleSelection' | 'interview' | 'results';

export default function MockInterviewPage() {
  const [currentView,      setCurrentView]      = useState<ViewType>('roleSelection');
  const [selectedRole,     setSelectedRole]     = useState<string | null>(null);
  const [interviewResults, setInterviewResults] = useState<Results | null>(null);

  const handleRoleSelect          = (role: string)                   => { setSelectedRole(role); setCurrentView('interview'); };
  const handleInterviewComplete   = (results: Record<string, unknown>) => { setInterviewResults(results as unknown as Results); setCurrentView('results'); };
  const handleNewInterview        = ()                               => { setSelectedRole(null); setInterviewResults(null); setCurrentView('roleSelection'); };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <AnimatePresence mode="wait">
        {currentView === 'roleSelection' && (
          <motion.div key="roleSelection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RoleSelection onRoleSelect={handleRoleSelect} />
          </motion.div>
        )}
        {currentView === 'interview' && selectedRole && (
          <motion.div key="interview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <InterviewSession role={selectedRole} onComplete={handleInterviewComplete} onBack={() => setCurrentView('roleSelection')} />
          </motion.div>
        )}
        {currentView === 'results' && interviewResults && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <InterviewResults results={interviewResults} onNewInterview={handleNewInterview} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
