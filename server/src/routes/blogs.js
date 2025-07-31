const express = require('express');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
  addComment,
  updateViews,
  getComments,
} = require('../controllers/blogController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/multer');

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', getBlogs);

// @route   GET /api/blogs/:id
// @desc    Get blog by ID or slug
// @access  Public
router.get('/:id', getBlogById);

// @route   POST /api/blogs
// @desc    Create blog
// @access  Private
router.post('/', auth, upload.single('featuredImage'), createBlog);

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private
router.put('/:id', auth, upload.single('featuredImage'), updateBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private
router.delete('/:id', auth, deleteBlog);

// @route   POST /api/blogs/:id/like
// @desc    Like/Unlike blog
// @access  Private
router.post('/:id/toggle-like', auth, toggleLike);

// @route   POST /api/blogs/:id/comment
// @desc    Add comment to blog
// @access  Private
router.post('/:id/add-comment', auth, addComment);

// @route   POST /api/blogs/:id/views
// @desc    Update views count
// @access  Private 
router.put('/:id/views', auth, updateViews);

// @route   POST /api/blogs/upload-image
// @desc    Upload featured image
// @access  Private


router.get('/:id/comments', auth, getComments);
// @route   GET /api/blogs/:id/comments
// @desc    Get all comments with populate author in particular blog
// @access  Private

module.exports = router;