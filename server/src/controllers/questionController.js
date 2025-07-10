const Question = require("../models/Question");
const Topic = require("../models/Topic");
const Subtopic = require("../models/Subtopic");
const Progress = require("../models/Progress");

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const {
      topicId,
      subtopicId,
      difficulty,
      type,
      page = 1,
      limit = 10,
      search,
      company,
      tags,
    } = req.query;

    const query = { isActive: true };

    // Apply filters
    if (topicId) query.topicId = topicId;
    if (subtopicId) query.subtopicId = subtopicId;
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (company) query.company = company;
    if (tags) query.tags = { $in: tags.split(",") };
    if (search) {
      query.$text = { $search: search };
    }

    const questions = await Question.find(query)
      .populate("topicId", "title category")
      .populate("subtopicId", "title")
      .populate("createdBy", "username firstName lastName")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Question.countDocuments(query);

    res.json({
      success: true,
      questions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error getting questions",
      error: error.message,
    });
  }
};

// Get question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("topicId", "title category")
      .populate("subtopicId", "title")
      .populate("createdBy", "username firstName lastName");

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Get user progress if authenticated
    let progress = null;
    if (req.user) {
      progress = await Progress.findOne({
        user: req.user.id,
        question: question._id,
        type: "question",
      });
    }

    res.json({
      success: true,
      question: {
        ...question.toObject(),
        progress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error getting question",
      error: error.message,
    });
  }
};

// Create question (Admin only)
const createQuestion = async (req, res) => {
  try {
    const questionData = {
      ...req.body,
      subtopicId: req.params.subtopicId,
      createdBy: req.user.id,
    };

    // get subtopic 
    const subtopic = await Subtopic.findById(req.params.subtopicId);
    if (!subtopic) {
      return res.status(404).json({
        success: false,
        message: "Subtopic not found",
      });
    }
    const question = await Question.create(questionData);

    // Update subtopic with new question
    subtopic.questions.push(question._id);
    await subtopic.save();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error creating question",
      error: error.message,
    });
  }
};

// Update question (Admin only)
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.json({
      success: true,
      message: "Question updated successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error updating question",
      error: error.message,
    });
  }
};

// Delete question (Admin only)
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Delete related progress
    await Progress.deleteMany({ question: req.params.id });

    res.json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error deleting question",
      error: error.message,
    });
  }
};

// @desc    Save/Unsave question
// @route   POST /api/questions/:id/save
// @access  Private
const toggleSaveQuestion = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const questionId = req.params.id;

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Check if already saved
    const isSaved = user.savedQuestions.includes(questionId);

    if (isSaved) {
      // Remove from saved questions
      user.savedQuestions = user.savedQuestions.filter(
        id => id.toString() !== questionId
      );
      await user.save();

      res.json({
        success: true,
        message: 'Question removed from saved list',
        saved: false
      });
    } else {
      // Add to saved questions
      user.savedQuestions.push(questionId);
      await user.save();

      res.json({
        success: true,
        message: 'Question saved successfully',
        saved: true
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get saved questions
// @route   GET /api/questions/saved
// @access  Private
const getSavedQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedQuestions',
        populate: {
          path: 'topic',
          select: 'name'
        }
      });

    res.json({
      success: true,
      count: user.savedQuestions.length,
      data: user.savedQuestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// Submit question answer
const submitAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { answer, timeSpent } = req.body;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Calculate score based on question type
    let score = 0;
    let isCorrect = false;

    if (question.type === "multiple-choice") {
      const correctOption = question.options.find((option) => option.isCorrect);
      if (correctOption && answer === correctOption.text) {
        score = 100;
        isCorrect = true;
      }
    } else if (question.type === "coding") {
      // For coding questions, you might want to implement a more sophisticated scoring system
      // This is a basic implementation
      if (answer && answer.length > 0) {
        score = 75; // Base score for attempt
      }
    }

    // Update or create progress
    let progress = await Progress.findOne({
      user: req.user.id,
      question: questionId,
      type: "question",
    });

    if (progress) {
      progress.attempts += 1;
      progress.score = Math.max(progress.score || 0, score);
      progress.timeSpent += timeSpent || 0;
      progress.lastAttempt = new Date();
      progress.status = isCorrect ? "completed" : "in-progress";
    } else {
      progress = new Progress({
        user: req.user.id,
        question: questionId,
        topic: question.topicId,
        subtopic: question.subtopicId,
        type: "question",
        attempts: 1,
        score,
        timeSpent: timeSpent || 0,
        lastAttempt: new Date(),
        status: isCorrect ? "completed" : "in-progress",
      });
    }

    await progress.save();

    res.json({
      success: true,
      message: "Answer submitted successfully",
      score,
      isCorrect,
      correctAnswer:
        question.type === "multiple-choice"
          ? question.options.find((option) => option.isCorrect)?.text
          : question.correctAnswer,
      explanation: question.explanation,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error submitting answer",
      error: error.message,
    });
  }
};

// Get random questions
const getRandomQuestions = async (req, res) => {
  try {
    const { count = 10, difficulty, topicId, type } = req.query;

    const query = { isActive: true };

    if (difficulty) query.difficulty = difficulty;
    if (topicId) query.topicId = topicId;
    if (type) query.type = type;

    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: parseInt(count) } },
    ]);

    // Populate references
    await Question.populate(questions, [
      { path: "topicId", select: "title category" },
      { path: "subtopicId", select: "title" },
    ]);

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error getting random questions",
      error: error.message,
    });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  submitAnswer,
  getRandomQuestions,
  toggleSaveQuestion,
  getSavedQuestions,
};
