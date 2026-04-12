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
router.get("/", auth,adminAuth,getAllArticles);

router.post("/",auth,adminAuth,createArticle);
router.get("/:slug",getArticleBySlug);
router.put("/:id",auth,adminAuth,updateArticle);
router.delete("/:id",auth,adminAuth,deleteArticle);

// editor image upload
router.put(
  "/editor/image",
  upload.single("image"),
  async (req, res) => {
    // const result = await cloudinary.uploader.upload(req.file.path);
     const result = await uploadOnCloudinary(req.file.buffer);
    res.json({ url: result.secure_url });
  }
);


module.exports = router;