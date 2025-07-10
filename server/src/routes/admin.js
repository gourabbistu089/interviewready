const express = require('express');
const {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getSystemHealth,
  getUserProgressAnalytics
} = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', adminAuth, getDashboardStats);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', adminAuth, getAllUsers);

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private (Admin only)
router.put('/users/:id', adminAuth, updateUser);

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Admin only)
router.delete('/users/:id', adminAuth, deleteUser);

// @route   GET /api/admin/health
// @desc    Get system health
// @access  Private (Admin only)
router.get('/health', adminAuth, getSystemHealth);

// @route   GET /api/admin/analytics/progress
// @desc    Get user progress analytics
// @access  Private (Admin only)
router.get('/analytics/progress', adminAuth, getUserProgressAnalytics);

module.exports = router;