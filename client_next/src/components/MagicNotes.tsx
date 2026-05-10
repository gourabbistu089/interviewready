'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MagicNotesProps {
  magicNotes: string | null;
  setIsModalOpen: (v: boolean) => void;
  title?: string;
}

export default function MagicNotes({ magicNotes, setIsModalOpen, title = 'Magic Notes' }: MagicNotesProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!magicNotes) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.7)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsModalOpen(false)}
      >
        <div className="flex items-center justify-center min-h-screen overflow-y-auto p-4">
          <motion.div
            className={`flex flex-col overflow-y-auto rounded-xl ${
              isFullscreen ? 'w-screen h-screen' : 'w-full max-w-5xl max-h-[92vh]'
            }`}
            style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-6 py-4 flex items-center justify-between rounded-t-xl"
              style={{ background: 'var(--bg-elevated)', borderBottom: '0.5px solid var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)' }}
                >
                  <BookOpen className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                </div>
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>{title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg transition-colors duration-150"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg transition-colors duration-150"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-8 prose max-w-none overflow-y-auto flex-1">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{magicNotes}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
