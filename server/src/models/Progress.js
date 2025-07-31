const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    // required: true,
  },
  subtopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subtopic",
    // required: true,
  },
  // Track completed subtopics under this topic
  completedSubtopics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtopic",
    },
  ],
  // Track completed questions under each subtopic
  completedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  // Interview progress
  isInterviewProgress: {
    type: Boolean,
    default: false,
  },
  role:{
    type: String,
  },
  totalSessions: {
    type: Number,
    default: 0,
  },
  averageScore: {
    type: Number,
    default: 0,
  },
  improvementTrend: [
  {
    score: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }
  ],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Progress", progressSchema);
