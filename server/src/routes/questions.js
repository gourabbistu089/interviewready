const express = require('express');
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  submitAnswer,
  getRandomQuestions,
  toggleSaveQuestion,
  getSavedQuestions
} = require('../controllers/questionController');
const { validate, questionValidationRules } = require('../middleware/validation');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/questions
// @desc    Get all questions
// @access  Public
router.get('/', getQuestions);

// @route   GET /api/questions/random
// @desc    Get random questions
// @access  Public
router.get('/random', getRandomQuestions);

// @route   GET /api/questions/:id
// @desc    Get question by ID
// @access  Public 
router.get('/:id', getQuestionById);

// @route   POST /api/questions/:subtopicId
// @desc    Create question
// @access  Private (Admin only)
router.post('/:subtopicId', adminAuth,  createQuestion);

// @route   PUT /api/questions/:id
// @desc    Update question
// @access  Private (Admin only)
router.put('/:id', adminAuth, validate(questionValidationRules()), updateQuestion);

// @route   DELETE /api/questions/:id
// @desc    Delete question
// @access  Private (Admin only)
router.delete('/:id', adminAuth, deleteQuestion);


// @desc    Save/Unsave question
// @route   POST /api/questions/:id/save
// @access  Private
router.post('/:id/save', auth, toggleSaveQuestion);

// @desc    Get saved questions
// @route   GET /api/questions/saved
// @access  Private
router.get('/saved', auth, getSavedQuestions);

// @route   POST /api/questions/:questionId/submit
// @desc    Submit answer to question
// @access  Private
router.post('/:questionId/submit', auth, submitAnswer);

module.exports = router;