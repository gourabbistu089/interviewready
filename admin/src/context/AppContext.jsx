import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getTopics,
  createTopic as apiCreateTopic,
  updateTopic as apiUpdateTopic,
  deleteTopic as apiDeleteTopic,
  getSubtopics,
  createSubtopic as apiCreateSubtopic,
  updateSubtopic as apiUpdateSubtopic,
  deleteSubtopic as apiDeleteSubtopic,
  getQuestions,
  createQuestion as apiCreateQuestion,
  updateQuestion as apiUpdateQuestion,
  deleteQuestion as apiDeleteQuestion,
} from '../api/api'; // Adjust the import path as neededr'; // Adjust the import path as needed

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  // Get token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchTopics(),
        fetchSubtopics(),
        fetchQuestions()
      ]);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Topics
  const fetchTopics = async () => {
    try {
      const data = await getTopics();
      console.log("Fetched topics:", data);
      setTopics(data?.topics);
    } catch (err) {
      console.error('Error fetching topics:', err);
      throw err;
    }
  };

  // Fetch Subtopics
  const fetchSubtopics = async () => {
    try {
      const data = await getSubtopics();
      console.log("Fetched subtopics:", data);
      setSubtopics(data?.subtopics || []);
    } catch (err) {
      console.error('Error fetching subtopics:', err);
      throw err;
    }
  };

  // Fetch Questions
  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      console.log("Fetched questions:", data);
      setQuestions(data.questions || []);
    } catch (err) {
      console.error('Error fetching questions:', err);
      throw err;
    }
  };

  // Topic CRUD Operations
  const addTopic = async (topic) => {
    try {
      setLoading(true);
      const newTopic = await apiCreateTopic(topic);
      console.log("New topic created:", newTopic);
      setTopics(prev => [...prev, newTopic?.topic]);
      return newTopic;
    } catch (err) {
      setError('Failed to create topic');
      console.error('Error creating topic:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTopic = async (id, updatedTopic) => {
    try {
      setLoading(true);
      const updated = await apiUpdateTopic(id, updatedTopic);
      setTopics(prev => prev.map(topic => 
        topic._id === id ? { ...topic, ...updated } : topic
      ));
      return updated;
    } catch (err) {
      setError('Failed to update topic');
      console.error('Error updating topic:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTopic = async (id) => {
    try {
      setLoading(true);
      await apiDeleteTopic(id);
      setTopics(prev => prev.filter(topic => topic._id !== id));
      // Also remove related subtopics and questions
      setSubtopics(prev => prev.filter(subtopic => subtopic.topicId !== id));
      setQuestions(prev => prev.filter(question => question.topicId !== id));
    } catch (err) {
      setError('Failed to delete topic');
      console.error('Error deleting topic:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Subtopic CRUD Operations
  const addSubtopic = async (subtopic) => {
    try {
      setLoading(true);
      const newSubtopic = await apiCreateSubtopic(subtopic);
      console.log("New subtopic created:", newSubtopic);
      setSubtopics(prev => [...prev, newSubtopic.data]);
      return newSubtopic;
    } catch (err) {
      setError('Failed to create subtopic');
      console.error('Error creating subtopic:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSubtopic = async (id, updatedSubtopic) => {
    try {
      setLoading(true);
      const updated = await apiUpdateSubtopic(id, updatedSubtopic);
      setSubtopics(prev => prev.map(subtopic => 
        subtopic._id === id ? { ...subtopic, ...updated } : subtopic
      ));
      return updated;
    } catch (err) {
      setError('Failed to update subtopic');
      console.error('Error updating subtopic:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSubtopic = async (id) => {
    try {
      setLoading(true);
      await apiDeleteSubtopic(id);
      setSubtopics(prev => prev.filter(subtopic => subtopic._id !== id));
      // Also remove related questions
      setQuestions(prev => prev.filter(question => question.subtopicId !== id));
    } catch (err) {
      setError('Failed to delete subtopic');
      console.error('Error deleting subtopic:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Question CRUD Operations
  const addQuestion = async (question) => {
    try {
      setLoading(true);
      const newQuestion = await apiCreateQuestion(question);
      console.log("New question created:", newQuestion);
      setQuestions(prev => [...prev, newQuestion.question]);
      return newQuestion;
    } catch (err) {
      setError('Failed to create question');
      console.error('Error creating question:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuestion = async (id, updatedQuestion) => {
    try {
      setLoading(true);
      const updated = await apiUpdateQuestion(id, updatedQuestion);
      console.log("Updated question:", updated);
      setQuestions(prev => prev.map(question => 
        question._id === id ? { ...question, ...updated?.question } : question
      ));
      return updated;
    } catch (err) {
      setError('Failed to update question');
      console.error('Error updating question:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      setLoading(true);
      await apiDeleteQuestion(id);
      setQuestions(prev => prev.filter(question => question._id !== id));
    } catch (err) {
      setError('Failed to delete question');
      console.error('Error deleting question:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Utility functions
  const clearError = () => setError(null);

  const refreshData = () => {
    fetchAllData();
  };

  const value = {
    // State
    topics,
    subtopics,
    questions,
    loading,
    setLoading,
    searchTerm,
    user,
    token,
    error,
    
    // Setters
    setSearchTerm,
    setUser,
    
    // Topic operations
    addTopic,
    updateTopic,
    deleteTopic,
    
    // Subtopic operations
    addSubtopic,
    updateSubtopic,
    deleteSubtopic,
    
    // Question operations
    addQuestion,
    updateQuestion,
    deleteQuestion,
    
    // Utility functions
    clearError,
    refreshData,
    fetchTopics,
    fetchSubtopics,
    fetchQuestions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};