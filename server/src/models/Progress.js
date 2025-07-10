const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  subtopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subtopic'
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  type: {
    type: String,
    enum: ['topic', 'subtopic', 'question', 'mock-interview'],
    required: true
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'mastered'],
    default: 'not-started'
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  attempts: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number, // in minutes
    default: 0
  },
  lastAttempt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt field before saving
progressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set completedAt when status changes to completed or mastered
  if (this.isModified('status') && (this.status === 'completed' || this.status === 'mastered') && !this.completedAt) {
    this.completedAt = Date.now();
  }
  
  next();
});

// Create compound indexes for efficient queries
progressSchema.index({ user: 1, topic: 1, type: 1 });
progressSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Progress', progressSchema);