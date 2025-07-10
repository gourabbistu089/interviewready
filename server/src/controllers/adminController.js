const User = require('../models/User');
const Topic = require('../models/Topic');
const Question = require('../models/Question');
const Blog = require('../models/Blog');
const { MockInterview, InterviewSession } = require('../models/MockInterview');
const Progress = require('../models/Progress');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalTopics,
      totalQuestions,
      totalBlogs,
      totalMockInterviews,
      totalSessions,
      recentUsers,
      recentSessions
    ] = await Promise.all([
      User.countDocuments(),
      Topic.countDocuments(),
      Question.countDocuments(),
      Blog.countDocuments(),
      MockInterview.countDocuments(),
      InterviewSession.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select('username email createdAt'),
      InterviewSession.find()
        .populate('user', 'username email')
        .populate('mockInterview', 'title')
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    // User growth statistics
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    // Session statistics
    const sessionStats = await InterviewSession.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTopics,
        totalQuestions,
        totalBlogs,
        totalMockInterviews,
        totalSessions,
        userGrowth,
        sessionStats,
        recentUsers,
        recentSessions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error getting dashboard stats',
      error: error.message
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role, isActive } = req.query;
    
    const query = {};
    
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error getting users',
      error: error.message
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedUpdates = ['role', 'isActive'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating user',
      error: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user's progress and sessions
    await Progress.deleteMany({ user: id });
    await InterviewSession.deleteMany({ user: id });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting user',
      error: error.message
    });
  }
};

// Get system health
const getSystemHealth = async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected'
    };

    res.json({
      success: true,
      health
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error getting system health',
      error: error.message
    });
  }
};

// Get user progress analytics
const getUserProgressAnalytics = async (req, res) => {
  try {
    const progressAnalytics = await Progress.aggregate([
      {
        $group: {
          _id: {
            status: '$status',
            type: '$type'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          statuses: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          }
        }
      }
    ]);

    const topicProgress = await Progress.aggregate([
      {
        $match: { type: 'topic' }
      },
      {
        $lookup: {
          from: 'topics',
          localField: 'topic',
          foreignField: '_id',
          as: 'topicInfo'
        }
      },
      {
        $unwind: '$topicInfo'
      },
      {
        $group: {
          _id: '$topicInfo.title',
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      analytics: {
        progressAnalytics,
        topicProgress
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error getting user progress analytics',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getSystemHealth,
  getUserProgressAnalytics
};