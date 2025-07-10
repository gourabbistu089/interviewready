const express = require('express');
const {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicCategories,
  getSubtopicsByTopic,
  getSubtopic,
  createSubtopic,
  updateSubtopic,
  deleteSubtopic
} = require('../controllers/topicController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/topics
// @desc    Get all topics
// @access  Public
router.get('/', getTopics);

// @route   GET /api/topics/categories
// @desc    Get topic categories
// @access  Public
router.get('/categories', getTopicCategories);

// @route   GET /api/topics/:id
// @desc    Get topic by ID
// @access  Public
router.get('/:id', getTopicById);

// @route   GET /api/topics/:topicId/subtopics
// @desc    Get subtopics by topic
// @access  Public
router.get('/:topicId/subtopics', getSubtopicsByTopic);

// @route   POST /api/topics
// @desc    Create topic
// @access  Private (Admin only)
router.post('/', adminAuth, createTopic);

// @route   PUT /api/topics/:id
// @desc    Update topic
// @access  Private (Admin only)
router.put('/:id', adminAuth, updateTopic);

// @route   DELETE /api/topics/:id
// @desc    Delete topic
// @access  Private (Admin only)
router.delete('/:id', adminAuth, deleteTopic);


// @desc    Get single subtopic
// @route   GET /api/topics/subtopics/:id
// @access  Public
router.get('/subtopics/:id', getSubtopic);

// @desc    Create subtopic (Admin only)
// @route   POST /api/topics/:id/subtopics
// @access  Private/Admin
router.post('/:id/subtopics', adminAuth, createSubtopic);

// @desc    Update subtopic (Admin only)
// @route   PUT /api/topics/subtopics/:id
// @access  Private/Admin
router.put('/subtopics/:id', adminAuth, updateSubtopic);

// @desc    Delete subtopic (Admin only)
// @route   DELETE /api/topics/subtopics/:id
// @access  Private/Admin
router.delete('/subtopics/:id', adminAuth, deleteSubtopic);

module.exports = router;