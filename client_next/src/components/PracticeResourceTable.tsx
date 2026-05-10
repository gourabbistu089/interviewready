'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuestionModule from './QuestionModule';
import type { Subtopic } from '@/types';

// TODO: type practice subtopic more precisely when API shape is confirmed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PracticeSubtopic = Subtopic & { questions: any[] };

interface PracticeResourceTableProps {
  filteredResources: PracticeSubtopic[];
}

export default function PracticeResourceTable({ filteredResources }: PracticeResourceTableProps) {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    filteredResources[0] ? { [filteredResources[0]._id]: true } : {},
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-xl overflow-y-auto max-h-screen"
          style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
        >
          <div>
            {filteredResources.map((topic, index) => (
              <QuestionModule
                key={topic._id}
                topicIndex={index}
                topicId={topic._id}
                topic={topic}
                expandedTopics={expandedTopics}
                setExpandedTopics={setExpandedTopics}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
