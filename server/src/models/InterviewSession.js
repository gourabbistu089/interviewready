// backend/models/InterviewSession.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  userAnswer: {
    type: String,
    default: ''
  },
  aiResponse: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    min: 1,
    max: 10
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'fullstack', 'dsa']
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  questions: [questionSchema],
  overallScore: {
    type: Number,
    min: 0,
    max: 10
  },
  feedback: {
    type: String
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'abandoned'],
    default: 'ongoing'
  }
});

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);