const express = require('express');
const {
  getUserProfile,
  updateProfile,
  uploadProfilePicture,
  changePassword,
  getUserProgress,
  deleteAccount
} = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile/:id?
// @desc    Get user profile
// @access  Private
router.get('/profile/:id?', auth, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateProfile);

// @route   POST /api/users/upload-profile-picture
// @desc    Upload profile picture
// @access  Private
router.post('/upload-profile-picture', auth, uploadProfilePicture);

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, changePassword);

// @route   GET /api/users/progress/:id?
// @desc    Get user progress
// @access  Private
router.get('/progress/:id?', auth, getUserProgress);

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', auth, deleteAccount);

module.exports = router;