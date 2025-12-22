const User = require('../models/User');
const Progress = require('../models/Progress');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const Question = require('../models/Question');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id || req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user progress statistics
    const progressStats = await Progress.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const stats = {
      'not-started': 0,
      'in-progress': 0,
      'completed': 0,
      'mastered': 0
    };

    progressStats.forEach(stat => {
      stats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        preferences: user.preferences,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      },
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error getting user profile',
      error: error.message
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const allowedUpdates = ['firstName', 'lastName', 'preferences'];
    const updates = {};

    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
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
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating profile',
      error: error.message
    });
  }
};

// Upload profile picture
const uploadProfilePicture = async (req, res) => {
  try {
          const user = await User.findById(req.params.id || req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const imgUrl = await cloudinary.uploadOnCloudinary(req.file.buffer);
      user.profilePicture=imgUrl.secure_url
      await user.save()
      res.status(200).json({
        success:true,
        profilePicture : imgUrl.secure_url,
        message:"Profile picture updated "
      })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error uploading profile picture',
      error: error.message
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error changing password',
      error: error.message
    });
  }
};

// Get user progress
const getUserProgress = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    
    const progress = await Progress.find({ user: userId })
      .populate('topic', 'title category')
      .populate('subtopic', 'title')
      .populate('question', 'title type difficulty')
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error getting user progress',
      error: error.message
    });
  }
};

// Delete user account
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user progress
    await Progress.deleteMany({ user: req.user.id });

    // Delete user
    await User.findByIdAndDelete(req.user.id);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting account',
      error: error.message
    });
  }
};


const toggleRevisionQuestion = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const questionId = req.params.questionId;

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Check if already saved
    const isSaved = user.revisionQuestions.includes(questionId);

    if (isSaved) {
      // Remove from saved questions
      user.revisionQuestions = user.revisionQuestions.filter(
        id => id.toString() !== questionId
      );
      await user.save();

      res.json({
        success: true,
        message: "Question removed from revision list",
        revision: false,
      });
    } else {
      // Add to revision questions
      user.revisionQuestions.push(questionId);
      await user.save();

      res.json({
        success: true,
        message: "Question saved successfully",
        revision: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



module.exports = {
  getUserProfile,
  updateProfile,
  uploadProfilePicture,
  changePassword,
  getUserProgress,
  deleteAccount,
  toggleRevisionQuestion
};