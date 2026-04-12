const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    },
    slug: {
    type: String,
    unique: true,
    trim: true
    },
    category:{
    type: String,
    trim: true,
    required: true,
    },
    content: {
    type: String,
    required: true
    },  
    author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
}, {
    timestamps: true,
});

// Create slug from title
articleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Indexes on slug and title for faster search
articleSchema.index({ slug: 1 });
articleSchema.index({ title: 'text' });

module.exports = mongoose.model('Article', articleSchema);