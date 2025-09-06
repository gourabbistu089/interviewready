import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Maximize2, Minimize2 } from 'lucide-react';

const MagicNotes = ({ magicNotes, setIsModalOpen, title = "Magic Notes" }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  if (!magicNotes) return null;

  return (
    <AnimatePresence>
      {magicNotes && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 bg-opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <motion.div
              className={`
                bg-white shadow-2xl 
                ${isFullscreen ? 'w-[100vw]' : 'w-full max-w-5xl h-[92vh]'}
                flex flex-col overflow-y-auto min-h-full bg-red-400
              `}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 ">
                <div className="min-h-full overflow-y-auto bg-gray-50">
                  <div className="p-6">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      {/* File header */}
                      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-600 ml-2">notes.txt</span>
                      </div>
                      
                      {/* Text content */}
                      <div className="bg-white  h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-y-auto">
                        <pre className="p-6 text-sm text-gray-800 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
                          {magicNotes}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MagicNotes