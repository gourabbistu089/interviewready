// src/models/Topic.js
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Topic name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Topic description is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'data-science', 'data-structure', 'core','others'],
    required: true
  },
  icon: {
    type: String, 
    default: ''
  },
  color: {
    type: String,
    default: '#3B82F6' // Default blue color
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  subTopics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subtopic'
  }],
  estimatedTime: {
    type: String, // e.g., "2 weeks", "1 month"
    default: '1 week'
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  practiceTopics: {
    type: Boolean,
    default: false // Indicates if this topic is for practice
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);