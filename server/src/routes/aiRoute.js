const express = require("express");
const router = express.Router();

const { generateQuestions, generateAnswerFeedback, generateLearningRoadmap } = require("../controllers/aiController");
const { authentication } = require("../middleware/auth");

router.post("/generate-questions", authentication, generateQuestions);
router.post("/answer-feedback", authentication, generateAnswerFeedback);
router.post("/learning-roadmap", authentication, generateLearningRoadmap);

module.exports = router;
