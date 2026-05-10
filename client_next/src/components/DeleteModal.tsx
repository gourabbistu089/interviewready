'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteModal({ isOpen, onClose, onConfirm, isLoading }: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative p-8 max-w-sm w-full mx-4 rounded-xl"
            style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)' }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--danger-dim)', border: '0.5px solid rgba(248,113,113,0.2)' }}
              >
                <Trash2 className="h-6 w-6" style={{ color: 'var(--danger)' }} />
              </div>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Delete Blog?</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                This action cannot be undone. The blog post will be permanently deleted.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{ border: '0.5px solid var(--border)', color: 'var(--text-secondary)', background: 'transparent' }}
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-40"
                  style={{ background: 'var(--danger-dim)', color: 'var(--danger)', border: '0.5px solid rgba(248,113,113,0.2)' }}
                >
                  {isLoading ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors duration-150"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
