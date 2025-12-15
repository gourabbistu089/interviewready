const Blog = require('../models/Blog');
const { uploadOnCloudinary , deleteFromCloudinary} = require('../config/cloudinary');
const User = require('../models/User');

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const { 
      category, 
      status = 'published', 
      search, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    const query = {};
    
    // Apply filters
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search };
    }

    const blogs = await Blog.find(query)
      .populate('author', 'username firstName lastName profilePicture')
      .populate('comments.author', 'username firstName lastName profilePicture')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
     console.log("Error in Updating Blog : ", error)
    res.status(500).json({
      success: false,
      message: 'Server error getting blogs',
      error: error.message
    });
  }
};

// Get blog by ID or slug
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if it's a slug or ID
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { _id: id } : { slug: id };
    
    const blog = await Blog.findOne(query)
      .populate('author', 'username firstName lastName profilePicture')
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      blog
    });
  } catch (error) {
     console.log("Error in Getting Blog : ", error)
    res.status(500).json({
      success: false,
      message: 'Server error getting blog',
      error: error.message
    });
  }
};

// Create blog
const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, status, readTime } = req.body;
    const blogData = {
      title,
      content,
      excerpt,
      category,
      tags: tags ? JSON.parse(tags).map((tag) => tag.toLowerCase().trim()) : [],
      status,
      readTime,
      author: req.user.id
    };

    const user = await User.findById(req.user.id);

    
    // const imgLocalPath = req.file?.path;
    // if(!imgLocalPath) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Featured image is required'
    //   });
    // }
    // const imgURL = await uploadOnCloudinary(imgLocalPath);
    // const featuredImage = imgURL.secure_url;
    // blogData.featuredImage = featuredImage;
    const imgUrl = await uploadOnCloudinary(req.file.buffer);
      const featuredImage = imgUrl.secure_url;
      blogData.featuredImage = featuredImage


    const blog = await Blog.create(blogData);

    user.stats.blogsWritten += 1;
    user.activity.latestBlog = await blog._id;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.log("Error in creating Blog : ", error)
    res.status(500).json({
      success: false,
      message: 'Server error creating blog',
      error: error.message
    });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, status, relatedArticles } = req.body;
    
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check authorization
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
    }
    
    // Build updates object with only provided fields
    let updates = {};
    
    if (title) updates.title = title;
    if (content) updates.content = content;
    if (excerpt) updates.excerpt = excerpt;
    if (category) updates.category = category;
    if (status) updates.status = status;
    
    if (tags) {
      const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      updates.tags = parsedTags.map(tag => tag.toLowerCase().trim());
    }
    
    if (relatedArticles) {
      const parsed = typeof relatedArticles === 'string' 
        ? JSON.parse(relatedArticles) 
        : relatedArticles;
      updates.relatedArticles = parsed.map(article => article._id);
    }

    // Handle image upload
    if (req.file) {
      const imgUrl = await uploadOnCloudinary(req.file.buffer);
      
      if (!imgUrl || !imgUrl.secure_url) {
        return res.status(500).json({
          success: false,
          message: 'Failed to upload image'
        });
      }
      
      updates.featuredImage = imgUrl.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('author', 'username firstName lastName profilePicture');

    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog: updatedBlog
    });
    
  } catch (error) {
    console.log("Error in Updating Blog:", error);
    res.status(500).json({
      success: false,
      message: 'Server error updating blog',
      error: error.message
    });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is author or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }

    await Blog.findByIdAndDelete(req.params.id);
    await deleteFromCloudinary(blog.featuredImage);

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting blog',
      error: error.message
    });
  }
};

// Like/Unlike blog
const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    const existingLike = blog.likes.find(like => like.user.toString() === req.user.id);

    if (existingLike) {
      // Remove like
      blog.likes = blog.likes.filter(like => like.user.toString() !== req.user.id);
    } else {
      // Add like
      blog.likes.push({ user: req.user.id });
    }

    await blog.save();

    res.json({
      success: true,
      message: existingLike ? 'Like removed' : 'Blog liked',
      likes: blog.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error toggling like',
      error: error.message
    });
  }
};

// Add comment
const addComment = async (req, res) => {
  try {
    const {content}  = req.body;
    console.log("content", content);
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.comments.push({
      author: req.user.id,
      content
    });

    await blog.save();

    // Populate the new comment
    await blog.populate('comments.author', 'username firstName lastName profilePicture');

    const newComment = blog.comments[blog.comments.length - 1];

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error adding comment',
      error: error.message
    });
  }
};

// update views count
const updateViews = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      message: 'Blog views updated successfully',
      blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating views',
      error: error.message
    });
  }
};

// fetch all comments with populate author in particular blog
const getComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    const comments = await Blog.findById(req.params.id)
      .select('comments')
      .populate('comments.author', 'username firstName lastName profilePicture');

    res.json({
      success: true,
      comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error getting comments',
      error: error.message
    });
  }
};
module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
  addComment,
  updateViews,
  getComments
};