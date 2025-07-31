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
    enum: ['multiple-choice', 'true-false', 'short-answer', 'coding', 'essay'],
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
  // For multiple choice questions
  options: [{
    text: String,
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  // For other question types
  correctAnswer: {
    type: String,
    trim: true
  },
  explanation: {
    type: String,
    trim: true
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

questionSchema.pre('save', function (next) {
  if (this.type === 'multiple-choice' && this.options && Array.isArray(this.options)) {
    const correctOption = this.options.find(opt => opt.isCorrect === true);
    if (correctOption) {
      this.correctAnswer = correctOption.text;
    }
  }
  next();
});

// Index for efficient searching
questionSchema.index({ topic: 1, difficulty: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ company: 1 });

module.exports = mongoose.model('Question', questionSchema);