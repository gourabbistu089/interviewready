import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SubtopicForm from '../components/Subtopics/SubtopicForm';
import SubtopicCard from '../components/Subtopics/SubtopicCard';
import Modal from '../components/UI/Modal';
import RippleSpinner from '../components/UI/LoadingSpinner';

const SubtopicsManagement = () => {
  const { subtopics, topics, searchTerm , setSearchTerm,loading} = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingSubtopic, setEditingSubtopic] = useState(null);
  const [filterTopic, setFilterTopic] = useState('all');
  console.log("filterTopic", filterTopic);
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredSubtopics = subtopics.filter(subtopic => {
    const matchesSearch = subtopic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subtopic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = filterTopic === 'all' || subtopic.topicId._id === filterTopic;
    const matchesDifficulty = filterDifficulty === 'all' || subtopic.difficulty === filterDifficulty;
    
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  const handleEdit = (subtopic) => {
    setEditingSubtopic(subtopic);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSubtopic(null);
  };

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
 if(loading){
    return <RippleSpinner/>
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subtopics Management</h1>
          <p className="text-gray-600 mt-1">Manage detailed learning content for each topic</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Subtopic</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subtopics..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Topics</option>
            {topics.map(topic => (
              <option key={topic._id} value={topic._id}>
                {topic.title}
              </option>
            ))}
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Subtopics Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredSubtopics.map((subtopic) => (
          <motion.div key={subtopic._id} variants={itemVariants}>
            <SubtopicCard subtopic={subtopic} onEdit={handleEdit} />
          </motion.div>
        ))}
      </motion.div>

      {filteredSubtopics.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subtopics found</h3>
          <p className="text-gray-500">Create your first subtopic to get started</p>
        </motion.div>
      )}

      {/* Subtopic Form Modal */}
      <Modal isOpen={showForm} onClose={handleCloseForm} title={editingSubtopic ? 'Edit Subtopic' : 'Create New Subtopic'} size="xl">
        <SubtopicForm subtopic={editingSubtopic} onClose={handleCloseForm} />
      </Modal>
    </motion.div>
  );
};

export default SubtopicsManagement;