// src/models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Question title is required'],
    trim: true
  },
  question: {
    type: String,
    required: [true, 'Question content is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['coding', 'essay'],
    required: true
  },
  // Coding question specifics
  topics: [String], // Array of topics this question belongs to
   content: {
    // Practice questions links
    practiceLinks: {
      url: String,
    },

    // YouTube video links
    youtubeLinks: {
      url: String,
    },
    // Notes links (external or internal)
    notesLinks: {
      url: String,
    },
    // Handwritten PDF files (Google Drive links)
    handwrittenPDFs: {
      driveUrl: String,
    },
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    // required: true
  },
  subtopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subtopic'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },

  // Additional metadata
  tags: [String],
  company: [String], // Which company asked this question
  frequency: {
    type: Number,
    default: 1 // How often this question appears
  },
  timeLimit: {
    type: Number, // in minutes
    default: 2
  },
  points: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isRevision: {
  type: Boolean,
  default: false
},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient searching
questionSchema.index({ topic: 1, difficulty: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ company: 1 });

module.exports = mongoose.model('Question', questionSchema);