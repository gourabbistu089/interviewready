'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Database, Layers, Brain,
  Clock, Target, Play, CheckCircle2,
  Trophy, Zap, Star, Users,
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  challenge: string;
  difficulty: string;
  difficultyStyle: React.CSSProperties;
  topics: string[];
  duration: string;
  questions: number;
  popularity: number;
  students: string;
}

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const roles: Role[] = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    icon: Code2,
    description: 'React, TypeScript, Modern CSS',
    challenge: 'Build beautiful, responsive user interfaces',
    difficulty: 'Intermediate',
    difficultyStyle: { background: 'rgba(251,191,36,0.08)', color: '#fbbf24', border: '0.5px solid rgba(251,191,36,0.2)' },
    topics: ['React Hooks', 'State Management', 'CSS Grid', 'Performance'],
    duration: '20',
    questions: 5,
    popularity: 95,
    students: '12.3k',
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    icon: Database,
    description: 'Node.js, APIs, System Design',
    challenge: 'Design scalable server architectures',
    difficulty: 'Advanced',
    difficultyStyle: { background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '0.5px solid rgba(248,113,113,0.2)' },
    topics: ['RESTful APIs', 'Database Design', 'Authentication', 'Microservices'],
    duration: '25',
    questions: 6,
    popularity: 88,
    students: '8.7k',
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    icon: Layers,
    description: 'End-to-end Development',
    challenge: 'Master the complete development stack',
    difficulty: 'Expert',
    difficultyStyle: { background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '0.5px solid rgba(248,113,113,0.25)' },
    topics: ['System Architecture', 'DevOps', 'Testing', 'Performance'],
    duration: '30',
    questions: 8,
    popularity: 92,
    students: '15.1k',
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    icon: Brain,
    description: 'Problem Solving Excellence',
    challenge: 'Master algorithmic thinking & coding interviews',
    difficulty: 'Expert',
    difficultyStyle: { background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '0.5px solid rgba(248,113,113,0.25)' },
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'],
    duration: '35',
    questions: 4,
    popularity: 97,
    students: '20.5k',
  },
];

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setTimeout(() => onRoleSelect(roleId), 500);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>Mock Interviews</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Practice with realistic interview scenarios and get instant AI feedback</p>
          </div>

          {/* Role Cards */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
              >
                <motion.div
                  className="relative p-6 rounded-xl cursor-pointer transition-colors duration-150"
                  style={{
                    background: selectedRole === role.id ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                    border: selectedRole === role.id ? '0.5px solid var(--accent-border)' : '0.5px solid var(--border)',
                  }}
                  whileTap={{ scale: 0.99 }}
                  onMouseEnter={(e) => { if (selectedRole !== role.id) (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}
                  onMouseLeave={(e) => { if (selectedRole !== role.id) (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'; }}
                >
                  {/* Icon + Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}
                      >
                        <role.icon className="h-6 w-6" style={{ color: 'var(--accent)' }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>{role.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{role.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="px-2 py-0.5 rounded text-xs font-medium" style={role.difficultyStyle}>{role.difficulty}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{role.popularity}%</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{role.challenge}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {role.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                        <Target className="h-3.5 w-3.5" />
                        <span className="text-xs">{role.questions} Q&apos;s</span>
                      </div>
                      <div className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-xs">{role.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                        <Users className="h-3.5 w-3.5" />
                        <span className="text-xs">{role.students}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRoleSelect(role.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                      style={{ background: 'var(--accent)', color: '#080808' }}
                    >
                      <Play className="h-3.5 w-3.5" />
                      Start
                    </button>
                  </div>

                  <AnimatePresence>
                    {selectedRole === role.id && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(8,8,8,0.6)' }}
                      >
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ delay: 0.05, type: 'spring', stiffness: 250 }}
                          className="p-3 rounded-full"
                          style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--accent-border)' }}
                        >
                          <CheckCircle2 className="h-7 w-7" style={{ color: 'var(--success)' }} />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Footer bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <div
              className="inline-flex items-center gap-6 rounded-xl px-6 py-3"
              style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
            >
              <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <Zap className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="w-px h-4" style={{ background: 'var(--border)' }} />
              <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <Target className="h-4 w-4" style={{ color: 'var(--success)' }} />
                <span className="text-sm">Real-time Feedback</span>
              </div>
              <div className="w-px h-4" style={{ background: 'var(--border)' }} />
              <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <Trophy className="h-4 w-4" style={{ color: '#fbbf24' }} />
                <span className="text-sm">Personalized Coaching</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
