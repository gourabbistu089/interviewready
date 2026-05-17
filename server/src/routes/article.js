const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const { getAllArticles, createArticle, getArticleBySlug, updateArticle, deleteArticle } = require("../controllers/articleController");
const { upload } = require("../middleware/multer");
const { uploadOnCloudinary } = require("../config/cloudinary");

// @route   GET /api/articles
// @desc    Get all articles with pagination
// @access  Public
router.get("/", getAllArticles);
router.post("/", auth, adminAuth, createArticle);

// Specific routes before parameterized ones
router.put("/editor/image", auth, upload.single("image"), async (req, res) => {
  try {
    const result = await uploadOnCloudinary(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed" });
  }
});

router.get("/:slug", getArticleBySlug);
router.put("/:id", auth, adminAuth, updateArticle);
router.delete("/:id", auth, adminAuth, deleteArticle);


module.exports = router;