// src/models/Subtopic.js
const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Subtopic name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Subtopic description is required'],
    trim: true
  },
  tags: [{
    type: String,
    required: [true, 'Subtopic tag is required'],
    trim: true
  }],
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  content: {
    // YouTube video links
    youtubeLinks: [{
      title: String,
      url: String,
      duration: String, // e.g., "15:30"
      thumbnail: String
    }],
    // Notes links (external or internal)
    notesLinks: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['external', 'internal', 'pdf']
      }
    }],
    // Handwritten PDF files (Google Drive links)
    handwrittenPDFs: [{
      title: String,
      driveUrl: String,
      fileName: String
    }],
    // Additional reading materials
    readingMaterials: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['article', 'documentation', 'book', 'tutorial']
      }
    }],
    // Code examples
    codeExamples: [{
      title: String,
      language: String,
      code: String,
      explanation: String
    }]
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  estimatedTime: {
    type: String, // e.g., "2 hours", "1 day"
    default: '1 hour'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  estimatedTime: {
    type: String,
    default: '30 minutes'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Subtopic', subtopicSchema);