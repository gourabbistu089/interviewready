const express = require('express');
const {
  startMockInterview,
  getMockInterview,
  submitAnswer,
  completeMockInterview,
  getUserMockInterviews,
  deleteMockInterview,
  getMockInterviewStats
} = require('../controllers/mockInterviewController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/mock-interviews/stats
// @desc    Get user's mock interview statistics
// @access  Private
router.get('/stats', auth, getMockInterviewStats);

// @route   GET /api/mock-interviews
// @desc    Get user's mock interviews with pagination and filters
// @access  Private
router.get('/', auth, getUserMockInterviews);

// @route   POST /api/mock-interviews
// @desc    Start a new mock interview
// @access  Private
router.post('/', auth, startMockInterview);

// @route   GET /api/mock-interviews/:id
// @desc    Get specific mock interview by ID
// @access  Private
router.get('/:id', auth, getMockInterview);

// @route   PUT /api/mock-interviews/:id/answer
// @desc    Submit answer to a question in mock interview
// @access  Private
router.put('/:id/answer', auth, submitAnswer);

// @route   PUT /api/mock-interviews/:id/complete
// @desc    Complete mock interview and calculate results
// @access  Private
router.put('/:id/complete', auth, completeMockInterview);

// @route   DELETE /api/mock-interviews/:id
// @desc    Delete mock interview
// @access  Private
router.delete('/:id', auth, deleteMockInterview);

module.exports = router;