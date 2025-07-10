// src/models/MockInterview.js
const mongoose = require('mongoose');

const mockInterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  questions: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    userAnswer: String,
    isCorrect: Boolean,
    timeSpent: Number, // in seconds
    points: Number
  }],
  configuration: {
    totalQuestions: {
      type: Number,
      default: 10
    },
    timeLimit: {
      type: Number, // in minutes
      default: 30
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'mixed'],
      default: 'mixed'
    },
    questionTypes: [{
      type: String,
      enum: ['multiple-choice', 'true-false', 'short-answer', 'coding']
    }]
  },
  results: {
    totalQuestions: Number,
    correctAnswers: Number,
    wrongAnswers: Number,
    skippedQuestions: Number,
    totalTimeSpent: Number, // in seconds
    score: Number, // percentage
    totalPoints: Number,
    earnedPoints: Number
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned'],
    default: 'in-progress'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  feedback: {
    strengths: [String],
    improvements: [String],
    recommendations: [String]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

// Index for efficient querying
mockInterviewSchema.index({ user: 1, topic: 1 });
mockInterviewSchema.index({ status: 1 });

module.exports = mongoose.model('MockInterview', mockInterviewSchema);