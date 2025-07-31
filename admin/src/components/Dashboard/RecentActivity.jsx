import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, FileText, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const RecentActivity = () => {
  const { topics, subtopics, questions } = useApp();

  const recentItems = [
    ...topics.slice(0, 2).map(topic => ({
      ...topic,
      type: 'topic',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-100'
    })),
    ...subtopics.slice(0, 2).map(subtopic => ({
      ...subtopic,
      type: 'subtopic',
      icon: FileText,
      color: 'text-green-600 bg-green-100'
    })),
    ...questions.slice(0, 2).map(question => ({
      ...question,
      type: 'question',
      icon: HelpCircle,
      color: 'text-yellow-600 bg-yellow-100'
    }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

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
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {recentItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={`${item.type}-${item._id}`}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 capitalize">{item.type} • {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {recentItems.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;