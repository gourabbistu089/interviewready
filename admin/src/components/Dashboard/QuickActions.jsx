import React from 'react';
import { motion } from 'framer-motion';
import { Plus, BookOpen, FileText, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Create Topic',
      icon: BookOpen,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate('/topics')
    },
    {
      title: 'Add Subtopic',
      icon: FileText,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => navigate('/subtopics')
    },
    {
      title: 'New Question',
      icon: HelpCircle,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      onClick: () => navigate('/questions')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <Plus className="w-5 h-5 text-gray-400" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className={`w-full flex items-center space-x-3 p-4 rounded-lg text-white font-medium transition-colors ${action.color}`}
            >
              <Icon className="w-5 h-5" />
              <span>{action.title}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default QuickActions;