// src/controllers/mockInterviewController.js
const MockInterview = require('../models/MockInterview');
const Question = require('../models/Question');
const User = require('../models/User');

// @desc    Start mock interview
// @route   POST /api/mock-interviews
// @access  Private
const startMockInterview = async (req, res) => {
  try {
    const { title, topic, configuration } = req.body;

    // Default configuration
    const defaultConfig = {
      totalQuestions: 10,
      timeLimit: 30,
      difficulty: 'mixed',
      questionTypes: ['multiple-choice', 'true-false', 'short-answer']
    };

    const config = { ...defaultConfig, ...configuration };

    // Build question filter
    const filter = { topic, isActive: true };
    
    if (config.difficulty !== 'mixed') {
      filter.difficulty = config.difficulty;
    }
    
    if (config.questionTypes && config.questionTypes.length > 0) {
      filter.type = { $in: config.questionTypes };
    }

    // Get random questions
    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: config.totalQuestions } }
    ]);

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No questions found for the selected criteria'
      });
    }

    // Create mock interview
    const mockInterview = await MockInterview.create({
      user: req.user.id,
      title,
      topic,
      configuration: config,
      questions: questions.map(q => ({
        question: q._id,
        userAnswer: '',
        isCorrect: false,
        timeSpent: 0,
        points: 0
      }))
    });

    // Populate and return
    const populatedInterview = await MockInterview.findById(mockInterview._id)
      .populate('topic', 'name')
      .populate('questions.question', 'title question type options correctAnswer timeLimit points');

    res.status(201).json({
      success: true,
      message: 'Mock interview started successfully',
      data: populatedInterview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get mock interview
// @route   GET /api/mock-interviews/:id
// @access  Private
const getMockInterview = async (req, res) => {
  try {
    const mockInterview = await MockInterview.findById(req.params.id)
      .populate('topic', 'name')
      .populate('questions.question', 'title question type options correctAnswer explanation timeLimit points');

    if (!mockInterview) {
      return res.status(404).json({
        success: false,
        message: 'Mock interview not found'
      });
    }

    // Check if user owns this interview
    if (mockInterview.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this interview'
      });
    }

    res.json({
      success: true,
      data: mockInterview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Submit answer to question
// @route   PUT /api/mock-interviews/:id/answer
// @access  Private
const submitAnswer = async (req, res) => {
  try {
    const { questionId, userAnswer, timeSpent } = req.body;

    const mockInterview = await MockInterview.findById(req.params.id)
      .populate('questions.question');

    if (!mockInterview) {
      return res.status(404).json({
        success: false,
        message: 'Mock interview not found'
      });
    }

    // Check if user owns this interview
    if (mockInterview.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this interview'
      });
    }

    // Find the question in the interview
    const questionIndex = mockInterview.questions.findIndex(
      q => q.question._id.toString() === questionId
    );

    if (questionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Question not found in this interview'
      });
    }

    const question = mockInterview.questions[questionIndex];
    const originalQuestion = question.question;

    // Check if answer is correct
    let isCorrect = false;
    let points = 0;

    if (originalQuestion.type === 'multiple-choice') {
      // For multiple choice, check if selected option is correct
      const selectedOption = originalQuestion.options.find(
        opt => opt.text === userAnswer
      );
      isCorrect = selectedOption && selectedOption.isCorrect;
    } else if (originalQuestion.type === 'true-false') {
      isCorrect = userAnswer.toLowerCase() === originalQuestion.correctAnswer.toLowerCase();
    } else {
      // For short answer, basic string comparison (can be enhanced with fuzzy matching)
      isCorrect = userAnswer.toLowerCase().trim() === originalQuestion.correctAnswer.toLowerCase().trim();
    }

    if (isCorrect) {
      points = originalQuestion.points || 1;
    }

    // Update the answer
    mockInterview.questions[questionIndex].userAnswer = userAnswer;
    mockInterview.questions[questionIndex].isCorrect = isCorrect;
    mockInterview.questions[questionIndex].timeSpent = timeSpent;
    mockInterview.questions[questionIndex].points = points;

    await mockInterview.save();

    res.json({
      success: true,
      message: 'Answer submitted successfully',
      data: {
        isCorrect,
        points,
        correctAnswer: originalQuestion.correctAnswer,
        explanation: originalQuestion.explanation
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Complete mock interview
// @route   PUT /api/mock-interviews/:id/complete
// @access  Private
const completeMockInterview = async (req, res) => {
  try {
    const mockInterview = await MockInterview.findById(req.params.id)
      .populate('questions.question');

    if (!mockInterview) {
      return res.status(404).json({
        success: false,
        message: 'Mock interview not found'
      });
    }

    // Check if user owns this interview
    if (mockInterview.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this interview'
      });
    }

    // Calculate results
    const totalQuestions = mockInterview.questions.length;
    const correctAnswers = mockInterview.questions.filter(q => q.isCorrect).length;
    const wrongAnswers = mockInterview.questions.filter(q => !q.isCorrect && q.userAnswer).length;
    const skippedQuestions = mockInterview.questions.filter(q => !q.userAnswer).length;
    const totalTimeSpent = mockInterview.questions.reduce((sum, q) => sum + q.timeSpent, 0);
    const earnedPoints = mockInterview.questions.reduce((sum, q) => sum + q.points, 0);
    const totalPoints = mockInterview.questions.reduce((sum, q) => sum + (q.question.points || 1), 0);
    const score = Math.round((earnedPoints / totalPoints) * 100);

    // Generate basic feedback
    const feedback = generateFeedback(mockInterview.questions, score);

    // Update the interview
    mockInterview.status = 'completed';
    mockInterview.completedAt = new Date();
    mockInterview.results = {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      skippedQuestions,
      totalTimeSpent,
      score,
      totalPoints,
      earnedPoints
    };
    mockInterview.feedback = feedback;

    await mockInterview.save();

    res.json({
      success: true,
      message: 'Mock interview completed successfully',
      data: mockInterview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's mock interviews
// @route   GET /api/mock-interviews
// @access  Private
const getUserMockInterviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { user: req.user.id };
    
    // Filter by status if provided
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Filter by topic if provided
    if (req.query.topic) {
      filter.topic = req.query.topic;
    }

    const mockInterviews = await MockInterview.find(filter)
      .populate('topic', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MockInterview.countDocuments(filter);

    res.json({
      success: true,
      data: {
        interviews: mockInterviews,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete mock interview
// @route   DELETE /api/mock-interviews/:id
// @access  Private
const deleteMockInterview = async (req, res) => {
  try {
    const mockInterview = await MockInterview.findById(req.params.id);

    if (!mockInterview) {
      return res.status(404).json({
        success: false,
        message: 'Mock interview not found'
      });
    }

    // Check if user owns this interview
    if (mockInterview.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this interview'
      });
    }

    await MockInterview.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Mock interview deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get mock interview statistics
// @route   GET /api/mock-interviews/stats
// @access  Private
const getMockInterviewStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get basic statistics
    const stats = await MockInterview.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalInterviews: { $sum: 1 },
          completedInterviews: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          averageScore: {
            $avg: { $cond: [{ $eq: ['$status', 'completed'] }, '$results.score', null] }
          },
          totalTimeSpent: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$results.totalTimeSpent', 0] }
          }
        }
      }
    ]);

    // Get topic-wise performance
    const topicStats = await MockInterview.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId), status: 'completed' } },
      {
        $lookup: {
          from: 'topics',
          localField: 'topic',
          foreignField: '_id',
          as: 'topicInfo'
        }
      },
      {
        $group: {
          _id: '$topic',
          topicName: { $first: { $arrayElemAt: ['$topicInfo.name', 0] } },
          interviewCount: { $sum: 1 },
          averageScore: { $avg: '$results.score' },
          bestScore: { $max: '$results.score' }
        }
      },
      { $sort: { averageScore: -1 } }
    ]);

    // Get recent performance trend
    const recentTrend = await MockInterview.find({
      user: userId,
      status: 'completed'
    })
      .select('results.score completedAt')
      .sort({ completedAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        overall: stats[0] || {
          totalInterviews: 0,
          completedInterviews: 0,
          averageScore: 0,
          totalTimeSpent: 0
        },
        topicPerformance: topicStats,
        recentTrend: recentTrend.reverse()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Helper function to generate feedback
const generateFeedback = (questions, score) => {
  const feedback = {
    strengths: [],
    improvements: [],
    recommendations: []
  };

  // Analyze performance by question type
  const typePerformance = {};
  questions.forEach(q => {
    const type = q.question.type;
    if (!typePerformance[type]) {
      typePerformance[type] = { correct: 0, total: 0 };
    }
    typePerformance[type].total++;
    if (q.isCorrect) {
      typePerformance[type].correct++;
    }
  });

  // Generate strengths
  Object.keys(typePerformance).forEach(type => {
    const performance = typePerformance[type];
    const percentage = (performance.correct / performance.total) * 100;
    if (percentage >= 80) {
      feedback.strengths.push(`Strong performance in ${type.replace('-', ' ')} questions`);
    }
  });

  // Generate improvements
  Object.keys(typePerformance).forEach(type => {
    const performance = typePerformance[type];
    const percentage = (performance.correct / performance.total) * 100;
    if (percentage < 60) {
      feedback.improvements.push(`Need improvement in ${type.replace('-', ' ')} questions`);
    }
  });

  // Generate recommendations based on score
  if (score >= 90) {
    feedback.recommendations.push('Excellent performance! Consider taking more challenging questions.');
  } else if (score >= 70) {
    feedback.recommendations.push('Good performance! Focus on areas that need improvement.');
  } else if (score >= 50) {
    feedback.recommendations.push('Average performance. Review fundamentals and practice more.');
  } else {
    feedback.recommendations.push('Below average performance. Consider studying the basics thoroughly.');
  }

  return feedback;
};

module.exports = {
  startMockInterview,
  getMockInterview,
  submitAnswer,
  completeMockInterview,
  getUserMockInterviews,
  deleteMockInterview,
  getMockInterviewStats
};