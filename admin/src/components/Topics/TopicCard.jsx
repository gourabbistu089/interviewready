import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, Clock, Users, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const TopicCard = ({ topic, onEdit }) => {
  const { deleteTopic } = useApp();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      deleteTopic(topic._id);
    }
  };

  const categoryColors = {
    frontend: 'bg-blue-100 text-blue-800',
    backend: 'bg-green-100 text-green-800',
    fullstack: 'bg-purple-100 text-purple-800',
    'data-science': 'bg-indigo-100 text-indigo-800',
    'data-structure': 'bg-yellow-100 text-yellow-800',
    core: 'bg-red-100 text-red-800',
    others: 'bg-gray-100 text-gray-800'
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Header with color accent */}
      <div 
        className="h-2"
        style={{ backgroundColor: topic.color }}
      />

      <div className="p-6">
        {/* Title and badges */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{topic.title}</h3>
          <div className="flex space-x-1 ml-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(topic)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
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
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{topic.description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[topic.category]}`}>
            {topic.category}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[topic.difficulty]}`}>
            {topic.difficulty}
          </span>
          {topic.practiceTopics && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
              Practice
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{topic.estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>Order: {topic.order}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;