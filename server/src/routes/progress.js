const express = require("express");
const router = express.Router();
const {
  updateProgress,
  getUserProgress,
  getUserSpecificTopicProgress,
  getUserSpecificSubTopicProgress,
  getUserInterviewProgress,
} = require("../controllers/progressController");
const auth = require("../middleware/auth");

router.post("/", auth, updateProgress);
router.get("/get-interview-progress", auth, getUserInterviewProgress);
router.get("/:topicId", auth, getUserSpecificTopicProgress);
router.get("/:subtopicId/questions", auth, getUserSpecificSubTopicProgress);
router.get("/", auth, getUserProgress);

// Get user progress summary

module.exports = router;
