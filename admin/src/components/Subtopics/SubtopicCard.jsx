import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Clock, Tag, BookOpen, Video, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SubtopicCard = ({ subtopic, onEdit }) => {
  const { deleteSubtopic, topics } = useApp();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this subtopic?')) {
      deleteSubtopic(subtopic._id);
    }
  };

  const parentTopic = topics.find(topic => topic._id === subtopic.topicId);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const contentCount = {
    youtube: subtopic.content?.youtubeLinks?.length || 0,
    notes: subtopic.content?.notesLinks?.length || 0,
    pdfs: subtopic.content?.handwrittenPDFs?.length || 0,
    reading: subtopic.content?.readingMaterials?.length || 0,
    code: subtopic.content?.codeExamples?.length || 0
  };

  const totalContent = Object.values(contentCount).reduce((sum, count) => sum + count, 0);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{subtopic.title}</h3>
            {parentTopic && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <BookOpen className="w-4 h-4" />
                <span>{parentTopic.title}</span>
              </div>
            )}
          </div>
          <div className="flex space-x-1 ml-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(subtopic)}
              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{subtopic.description}</p>

        {/* Tags */}
        {subtopic.tags && subtopic.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {subtopic.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {subtopic.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                +{subtopic.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Content Summary */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <Video className="w-3 h-3" />
            <span>{contentCount.youtube} Videos</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <FileText className="w-3 h-3" />
            <span>{contentCount.notes} Notes</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[subtopic.difficulty]}`}>
              {subtopic.difficulty}
            </span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{subtopic.estimatedTime}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {totalContent} content items
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubtopicCard;