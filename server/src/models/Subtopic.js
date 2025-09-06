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
    youtubeLinks: {
      url: String
    },
    notesLinks: {
      url: String
    },
    handwrittenPDFs: {
      url: String
    }
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
    type: String,
    default: '30 minutes'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  magicNotes: {
  type: String,
  trim: true,
  default: ''
}
}, { timestamps: true });

module.exports = mongoose.model('Subtopic', subtopicSchema);
