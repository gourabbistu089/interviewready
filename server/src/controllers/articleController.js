const Article = require("../models/Article.js");

// Create a new article
const createArticle = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const author = req.user.id;
    const article = new Article({ title, content, category, author });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.log("Error in CreateArticle : ",error)
    res.status(500).json({ message: error.message });
  }
};

// Get an article by slug
const getArticleBySlug = async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await Article.findOne({ slug }).populate('author', 'name email');
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
// Get all articles with pagination
const getAllArticles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const articles = await Article.find().populate('author', 'username email').skip(skip).limit(limit);
        res.status(200).json({
            success: true,
            articles,
            pagination: {
                page,
                limit
            },
            message: "Articles fetched successfully"
        });
    } catch (error) {
        console.log("Error in getAllArticles : ",error)
        res.status(500).json({ 
            success:false,
            message: error.message });
    }
}

// Get articles by Category
const getArticlesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const articles = await Article.find({ category }).populate('author', 'username email');
        res.status(200).json({
            success: true,
            articles,
            message: `Articles fetched for category: ${category}`
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an article
const updateArticle = async (req, res) => {
    try {
        const { slug } = req.params;
        const {content, category } = req.body;
        const article = await Article.findOneAndUpdate(
            { slug },
            { content, category },
            { new: true }
        ).populate('author', 'username email');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Article updated successfully',
            article
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an article
const deleteArticle = async (req, res) => {
    try {
        const { slug } = req.params;
        const article = await Article.findOneAndDelete({ slug });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Article deleted successfully'
        });
    } catch (error) {
        console.log("Error while deleteArticle ",error)
        res.status(500).json({ 
            success:false,
            message: error.message });
    }
}

module.exports = {
  createArticle,
  getArticleBySlug,
  getAllArticles,
  getArticlesByCategory,
  updateArticle,
 deleteArticle

};