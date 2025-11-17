const Topic = require("../models/Topic");
const Subtopic = require("../models/Subtopic");
const Question = require("../models/Question");
const Progress = require("../models/Progress");

// Get all topics - @route   GET /api/topics
const getTopics = async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 10 } = req.query;

    const query = { isActive: true };

    // Apply filters
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search };
    }

    const topics = await Topic.find(query)
      .select("title description icon color practiceTopics difficulty estimatedTime category order isActive updatedAt createdAt")
      .lean()
      .populate({
        path: "subTopics",
        populate: {
          path: "questions",
        },
      })
      // .sort({createdAt: -1})
      // .limit(limit * 1)
      // .skip((page - 1) * limit);

    const total = await Topic.countDocuments(query);

    res.json({
      success: true,
      topics,
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
      message: "Server error getting topics",
      error: error.message,
    });
  }
};

// get all subtopics
const getAllSubtopics = async (req, res) => {
  try {
    const subtopics = await Subtopic.find({ isActive: true })
      .populate("topicId", "title description")
      .populate("createdBy", "username firstName lastName")
      .sort({ order: 1 });

    res.json({
      success: true,
      subtopics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error getting subtopics",
      error: error.message,
    });
  }
};

// Get topic by ID
const getTopicById = async (req, res) => {
  console.log("Getting topic by ID:", req.params.id);
  try {
    const topic = await Topic.findById(req.params.id).populate(
      "prerequisites",
      "title description"
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    // Get subtopics
    const subtopics = await Subtopic.find({
      topicId: topic._id,
      isActive: true,
    }).sort({ order: 1 });

    // Get questions count
    const questionsCount = await Question.countDocuments({
      topicId: topic._id,
      isActive: true,
    });

    // Get user progress if authenticated
    let progress = null;
    if (req.user) {
      progress = await Progress.findOne({
        user: req.user.id,
        topic: topic._id,
        type: "topic",
      });
    }

    res.json({
      success: true,
      topic: {
        ...topic.toObject(),
        subtopics,
        questionsCount,
        progress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error getting topic",
      error: error.message,
    });
  }
};

// Create topic (Admin only) - @route   POST /api/topics
const createTopic = async (req, res) => {
  // console.log("user id from req.user:", req.user.id);
  try {
    const topicData = {
      ...req.body,
      createdBy: req.user.id,
    };

    const topic = await Topic.create(topicData);

    res.status(201).json({
      success: true,
      message: "Topic created successfully",
      topic,
    });
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating topic",
      error: error.message,
    });
  }
};

// Update topic (Admin only)  - @route   PUT /api/topics/:id
const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    res.json({
      success: true,
      message: "Topic updated successfully",
      topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error updating topic",
      error: error.message,
    });
  }
};

// Delete topic (Admin only)
const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    // Delete related subtopics, questions, and progress
    await Subtopic.deleteMany({ topicId: req.params.id });
    await Question.deleteMany({ topicId: req.params.id });
    await Progress.deleteMany({ topic: req.params.id });

    res.json({
      success: true,
      message: "Topic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error deleting topic",
      error: error.message,
    });
  }
};

// Get topic categories
const getTopicCategories = async (req, res) => {
  try {
    const categories = await Topic.distinct("category");

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error getting categories",
      error: error.message,
    });
  }
};

// Get subtopics by topic - @route   GET /api/topics/:id/subtopics
const getSubtopicsByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    const subtopics = await Subtopic.find({ topicId, isActive: true })
      .populate("createdBy", "username firstName lastName")
      .sort({ order: 1 });

    res.json({
      success: true,
      subtopics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error getting subtopics",
      error: error.message,
    });
  }
};

// @desc    Get single subtopic
// @route   GET /api/topics/subtopics/:id
// @access  Public
const getSubtopic = async (req, res) => {
  try {
    const subtopic = await Subtopic.findById(req.params.id).populate(
      "topicId",
      "title description"
    );

    if (!subtopic) {
      return res.status(404).json({
        success: false,
        message: "Subtopic not found",
      });
    }

    res.json({
      success: true,
      data: subtopic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create subtopic (Admin only)
// @route   POST /api/topics/:id/subtopics
// @access  Private/Admin
const createSubtopic = async (req, res) => {
  try {
    // Get the topic to which this subtopic belongs
    const {topicId} = req.body;
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    const subtopic = await Subtopic.create({
      ...req.body,
      createdBy: req.user.id,
      // topicId: req.params.id,
    });

    // Update the topic's subTopics array
    topic.subTopics.push(subtopic._id);
    await topic.save();

    const populatedSubtopic = await Subtopic.findById(subtopic._id).populate(
      "topicId",
      "title description"
    );

    res.status(201).json({
      success: true,
      message: "Subtopic created successfully",
      data: populatedSubtopic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update subtopic (Admin only)
// @route   PUT /api/topics/subtopics/:id
// @access  Private/Admin
const updateSubtopic = async (req, res) => {
  try {
    const subtopic = await Subtopic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("topicId", "title");

    if (!subtopic) {
      return res.status(404).json({
        success: false,
        message: "Subtopic not found",
      });
    }

    res.json({
      success: true,
      message: "Subtopic updated successfully",
      data: subtopic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete subtopic (Admin only)
// @route   DELETE /api/topics/subtopics/:id
// @access  Private/Admin
const deleteSubtopic = async (req, res) => {
  try {
    const subtopic = await Subtopic.findByIdAndDelete(req.params.id);
    if (!subtopic) {
      return res.status(404).json({
        success: false,
        message: "Subtopic not found",
      }); 
    }

    res.json({
      success: true,
      message: "Subtopic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicCategories,
  getSubtopicsByTopic,
  getSubtopic,
  createSubtopic,
  updateSubtopic,
  deleteSubtopic,
  getAllSubtopics,
};
