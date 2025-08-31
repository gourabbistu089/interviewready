// Cheatsheet Schema

const mongoose = require('mongoose');

const cheatsheetSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    unique: true,
    enum: ['javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'php']
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  sections: [{
    title: {
      type: String,
      required: true
    },
    items: [{
      concept: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true
      },
      explanation: {
        type: String,
        required: true
      },
      tags: [String],
      difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
      }
    }]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Cheatsheet = mongoose.model('Cheatsheet', cheatsheetSchema);

module.exports = Cheatsheet;