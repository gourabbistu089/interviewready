import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import QuestionForm from '../components/Questions/QuestionForm';
import QuestionCard from '../components/Questions/QuestionCard';
import Modal from '../components/UI/Modal';

const QuestionsManagement = () => {
  const { questions, topics, searchTerm , setSearchTerm, subtopics} = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterSubTopic, setFilterSubTopic] = useState('all');
  const [topicRelatedSubtopics, setTopicRelatedSubtopics] = useState([]);

  useEffect(() => {
    if(filterTopic == 'all'){
      setTopicRelatedSubtopics([]);
    }
    else{
      setTopicRelatedSubtopics(subtopics.filter(subtopic => subtopic.topicId._id === filterTopic));
    }
    
  },[filterTopic])

  // console.log("filterSubTopic", filterSubTopic);

  console.log("filterTopic", filterTopic);

  const types = ['all', 'multiple-choice', 'true-false', 'short-answer', 'coding', 'essay'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || question.type === filterType;
    const matchesDifficulty = filterDifficulty === 'all' || question.difficulty === filterDifficulty;
    const matchesTopic = filterTopic === 'all' || question?.topicId?._id === filterTopic;
    const matchesSubTopic = filterSubTopic === 'all' || question?.subtopicId?._id === filterSubTopic;
    
    return matchesSearch && matchesType && matchesDifficulty && matchesTopic && matchesSubTopic;
  });

  

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Questions Management</h1>
          <p className="text-gray-600 mt-1">Create and manage assessment questions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Question</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="all">All Topics</option>
            {topics.map(topic => (
              <option key={topic._id} value={topic._id}>
                {topic.title}
              </option>
            ))}
          </select>
          <select
            value={filterSubTopic}
            onChange={(e) => setFilterSubTopic(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="all">All Subtopics</option>
            {topicRelatedSubtopics.map(topic => (
              <option key={topic._id} value={topic._id}>
                {topic.title}
              </option>
            ))}
          </select>


        </div>
      </motion.div>

      {/* Questions Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredQuestions.map((question) => (
          <motion.div key={question._id} variants={itemVariants}>
            <QuestionCard question={question} onEdit={handleEdit} />
          </motion.div>
        ))}
      </motion.div>

      {filteredQuestions.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
          <p className="text-gray-500">Create your first question to get started</p>
        </motion.div>
      )}

      {/* Question Form Modal */}
      <Modal isOpen={showForm} onClose={handleCloseForm} title={editingQuestion ? 'Edit Question' : 'Create New Question'} size="xl">
        <QuestionForm question={editingQuestion} onClose={handleCloseForm} />
      </Modal>
    </motion.div>
  );
};

export default QuestionsManagement;