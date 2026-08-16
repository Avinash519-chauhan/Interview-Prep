const express = require("express");
const router = express.Router();

const { startInterview, addQuestionsToAttempt, submitAnswer, completeInterview, getMyAttempts, getSingleAttempt, getMyAnalytics } = require("../controllers/attemptController");

const { authentication } = require("../middleware/auth");

router.post("/start-interview", authentication, startInterview);
router.post("/:attemptId/questions", authentication, addQuestionsToAttempt);
router.put("/:attemptId/question/:questionId/answer", authentication, submitAnswer);
router.post("/:attemptId/complete", authentication, completeInterview);
router.get("/my-attempts", authentication, getMyAttempts);
router.get("/:attemptId", authentication, getSingleAttempt);
router.get("/my-analytics", authentication, getMyAnalytics);

module.exports = router;