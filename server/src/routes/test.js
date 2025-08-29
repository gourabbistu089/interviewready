// backend/routes/test.js
const express = require('express');
const AIInterviewService = require('../services/aiService');
const auth = require('../middleware/auth');

const router = express.Router();

// Test question generation
router.post('/generate-question', auth, async (req, res) => {
  try {
    const { role, questionNumber = 1 } = req.body;

    const validRoles = ['frontend', 'backend', 'fullstack', 'dsa'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const question = await AIInterviewService.generateQuestion(role, questionNumber);

    res.json({
      question,
      role,
      questionNumber,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Generate question test error:', error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

// Test answer evaluation
router.post('/evaluate-answer', async (req, res) => {
  try {
    const { question, answer, role } = req.body;

    if (!question || !answer || !role) {
      return res.status(400).json({ error: 'Question, answer, and role are required' });
    }

    const evaluation = await AIInterviewService.evaluateAnswer(question, answer, role);

    res.json({
      evaluation,
      input: { question, answer, role },
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Evaluate answer test error:', error);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
});

module.exports = router;