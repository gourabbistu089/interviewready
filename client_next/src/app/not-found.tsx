'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  } as const;
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <motion.div className="max-w-5xl w-full relative z-10" variants={containerVariants} initial="hidden" animate="visible">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* 404 Visual */}
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="relative w-full lg:w-[45%] max-w-xl"
          >
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center aspect-video"
              style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
            >
              <div className="text-8xl font-black" style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>404</div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div variants={itemVariants} className="relative w-full lg:w-1/2 max-w-xl">
            <div
              className="relative rounded-2xl p-8 lg:p-10 lg:min-h-[400px]"
              style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)' }}
            >
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-3 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black" style={{ color: '#ffffff', fontFamily: 'Syne, sans-serif' }}>
                    Page Not Found
                  </h1>
                  <p className="text-lg md:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Oops! You seem to have taken a wrong turn
                  </p>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved to another universe.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/"
                      className="group px-5 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 flex items-center gap-2"
                      style={{ background: 'var(--accent)', color: '#080808' }}
                    >
                      <Home className="w-4 h-4" />Back to Home
                    </Link>
                  </motion.div>
                  <motion.button
                    onClick={() => window.history.back()}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-80 flex items-center gap-2 justify-center"
                    style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}
                  >
                    <ArrowLeft className="w-4 h-4" />Go Back
                  </motion.button>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
                    style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                    Error Code: 404
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
