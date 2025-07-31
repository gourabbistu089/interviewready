// backend/routes/interview.js
const express = require('express');
const InterviewSession = require('../models/InterviewSession');
const Progress = require('../models/Progress');
const AIInterviewService = require('../services/aiService');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Start new interview
router.post('/start', auth, async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.user.id;
    console.log("userId", userId);

    // Validate role
    const validRoles = ['frontend', 'backend', 'fullstack', 'dsa'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    // Create new session
    const session = new InterviewSession({
      userId,
      role,
      startTime: new Date(),
      status: 'ongoing',
      questions: []
    });

    // Generate first question
    const firstQuestion = await AIInterviewService.generateQuestion(role, 1);
    console.log("firstQuestion", firstQuestion);

    session.questions.push({
      question: firstQuestion,
      timestamp: new Date()
    });

    await session.save();

    res.json({
      sessionId: session._id,
      question: firstQuestion,
      questionNumber: 1,
      totalQuestions: 5
    });
  } catch (error) {
    console.log('Start interview error:', error);
    console.error('Start interview error:', error);
    res.status(500).json({ error: 'Failed to start interview' });
  }
});

// Submit answer and get next question
router.post('/answer', auth, async (req, res) => {
  try {
    const { sessionId, answer } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!sessionId || !answer?.trim()) {
      return res.status(400).json({ error: 'Session ID and answer are required' });
    }

    // Find session
    const session = await InterviewSession.findOne({ 
      _id: sessionId, 
      userId,
      status: 'ongoing' 
    });

    if (!session) {
      return res.status(404).json({ error: 'Interview session not found' });
    }

    const currentQuestion = session.questions[session.questions.length - 1];

    // Evaluate the answer
    const evaluation = await AIInterviewService.evaluateAnswer(
      currentQuestion.question,
      answer.trim(),
      session.role
    );

    // Update current question with answer and feedback
    currentQuestion.userAnswer = answer.trim();
    currentQuestion.aiResponse = evaluation.feedback;
    currentQuestion.score = evaluation.score;

    let nextQuestion = null;
    let isComplete = false;

    // Generate next question if not at limit
    console.log("session.questions.length", session.questions.length);
    if (session.questions.length < 2) {
      nextQuestion = await AIInterviewService.generateQuestion(
        session.role,
        session.questions.length + 1
      );

      session.questions.push({
        question: nextQuestion,
        timestamp: new Date()
      });
    } else {
      isComplete = true;
    }

    await session.save();

    res.json({
      feedback: evaluation.feedback,
      score: evaluation.score,
      tip: evaluation.tip,
      positives: evaluation.positives,
      nextQuestion,
      questionNumber: session.questions.length,
      totalQuestions: 5,
      isComplete
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// Complete interview
router.post('/complete', auth, async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user._id;
    
    const user = await User.findById(userId);

    const session = await InterviewSession.findOne({ 
      _id: sessionId, 
      userId,
      status: 'ongoing' 
    });

    if (!session) {
      return res.status(404).json({ error: 'Interview session not found' });
    }

    // Calculate overall score
    const answeredQuestions = session.questions.filter(q => q.score !== undefined);
    const totalScore = answeredQuestions.reduce((sum, q) => sum + q.score, 0);
    const overallScore = answeredQuestions.length > 0 ? totalScore / answeredQuestions.length : 0;

    // Generate final feedback
    const finalFeedback = await AIInterviewService.generateFinalFeedback(
      answeredQuestions,
      session.role,
      overallScore
    );

    // Update session
    session.endTime = new Date();
    session.status = 'completed';
    session.overallScore = overallScore;
    session.feedback = finalFeedback;

    await session.save();

    // Update progress
    await updateUserProgress(userId, session.role, overallScore);

    // Update user stats
    user.stats.mockInterviews += 1;

    // Update user recent activity
    user.activity.latestInterviewSession = sessionId;
    await user.save();

    res.json({
      overallScore: Math.round(overallScore * 10) / 10,
      totalQuestions: answeredQuestions.length,
      finalFeedback,
      sessionId: session._id
    });
  } catch (error) {
    console.error('Complete interview error:', error);
    res.status(500).json({ error: 'Failed to complete interview' });
  }
});

// Get interview history
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { role, limit = 10, page = 1 } = req.query;

    const filter = { userId, status: 'completed' };
    if (role) filter.role = role;

    const sessions = await InterviewSession.find(filter)
      .sort({ startTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('role overallScore startTime endTime questions.length');

    const total = await InterviewSession.countDocuments(filter);

    res.json({
      sessions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to get interview history' });
  }
});

// Get specific interview details
router.get('/:sessionId', auth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    const session = await InterviewSession.findOne({ 
      _id: sessionId, 
      userId 
    });

    if (!session) {
      return res.status(404).json({ error: 'Interview session not found' });
    }

    res.json(session);
  } catch (error) {
    console.error('Get interview details error:', error);
    res.status(500).json({ error: 'Failed to get interview details' });
  }
});

// Helper function to update user progress
async function updateUserProgress(userId, role, score) {
  try {
    let progress = await Progress.findOne({ userId, role , isInterviewProgress: true });

    if (!progress) {
      progress = new Progress({
        userId,
        role,
        totalSessions: 1,
        averageScore: score,
        improvementTrend: [{ score, date: new Date() }],
        isInterviewProgress: true
      });
    } else {
      progress.totalSessions += 1;
      progress.averageScore = (
        (progress.averageScore * (progress.totalSessions - 1) + score) / 
        progress.totalSessions
      );
      progress.improvementTrend.push({ score, date: new Date() });
      
      // Keep only last 20 scores
      if (progress.improvementTrend.length > 20) {
        progress.improvementTrend = progress.improvementTrend.slice(-20);
      }
    }

    progress.lastUpdated = new Date();
    await progress.save();
  } catch (error) {
    console.error('Error updating progress:', error);
  }
}

module.exports = router;