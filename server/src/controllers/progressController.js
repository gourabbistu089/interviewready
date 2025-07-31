const mongoose = require("mongoose");
const InterviewSession = require("../models/InterviewSession");
const Progress = require("../models/Progress");
const User = require("../models/User");


// Add or update progress for a subtopic or question
exports.updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId, subtopicId, questionId, type } = req.body;
    let progress;
    const user = await User.findById(userId);

    // Handle subtopic completion
    if (type == "subtopic" && subtopicId) {
      progress = await Progress.findOne({ userId, topicId });
      if (!progress) {
        progress = await Progress.create({
          userId,
          topicId,
          completedSubtopics: [],
          completedQuestions: [],
        });
      }
       if (!progress.completedSubtopics.includes(subtopicId)) {
        progress.completedSubtopics.push(subtopicId);
      }
      // Update user stats
      user.stats.modulesCompleted += 1;
      // Update user recent activity
      user.activity.latestSubtopic = subtopicId;
      await user.save();

    }

    // Handle question progress
    else if (type == "question" && questionId) {
      progress = await Progress.findOne({userId, subtopicId});
      if (!progress) {
        progress = await Progress.create({
          userId,
          subtopicId,
          completedSubtopics: [],
          completedQuestions: [],
        });
      }
      if (!progress.completedQuestions.includes(questionId)) {
        progress.completedQuestions.push(questionId);
      }
      // Update user stats
      user.stats.questionsCompleted += 1;
      // Update user recent activity
      user.activity.latestQuestion = questionId;
      await user.save();
    }
    await progress.save();
    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get progress for a user
exports.getUserSpecificTopicProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId } = req.params;

    const progress = await Progress.find({ userId, topicId })
      .populate("topicId")
      .populate("completedSubtopics")
    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getUserSpecificSubTopicProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subtopicId } = req.params;

    const progress = await Progress.find({ userId, subtopicId })
      // .populate("subtopicId")
      // .populate("completedQuestions");

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get progress for a user
exports.getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const progress = await Progress.find({ userId })
      .populate("topicId")
      .populate("completedSubtopics")
      .populate("questionProgress.subtopicId")
      .populate("questionProgress.completedQuestions");

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// get user interview progress
exports.getUserInterviewProgress =   async (req, res) => {
    try {
      const userId = req.user.id;
      const { role } = req.body; // Get role from request body

      console.log("userId", userId);
      console.log("role", role);

      // Validate role is provided
      if (!role) {
        return res.status(400).json({
          error:
            "Role is required. Please specify: frontend, backend, dsa, etc.",
        });
      }

      // Get specific progress by role
      const progress = await Progress.findOne({
        userId,
        isInterviewProgress: true,
        role: role, // Filter by specific role
      });

      if (!progress) {
        return res.status(404).json({
          error: `${role} interview progress not found for user`,
        });
      }

      console.log("progress", progress);

      // Get recent sessions for this specific role
      const recentSessions = await InterviewSession.find({
        userId,
        role: role, // Filter sessions by role
      })
        .sort({ startTime: -1 })
        .limit(10)
        .select("role overallScore startTime endTime");

      // Calculate stats for this specific role
      const totalSessions = await InterviewSession.countDocuments({
        userId,
        role: role,
      });

      const completedSessions = await InterviewSession.countDocuments({
        userId,
        role: role,
        status: "completed",
      });

      // Average scores by role for this specific role
      // Convert userId to ObjectId for aggregation
      const scoresByRole = await InterviewSession.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId), // Convert to ObjectId
            role: role, // Filter by role
            status: "completed",
          },
        },
        {
          $group: {
            _id: "$role",
            avgScore: { $avg: "$overallScore" },
            count: { $sum: 1 },
          },
        },
      ]);

      res.json({
        role,
        progress,
        recentSessions,
        stats: {
          totalSessions,
          completedSessions,
          scoresByRole,
        },
      });
    } catch (error) {
      console.error("Error fetching interview progress:", error);
      res.status(500).json({ error: error.message });
    }
  }
