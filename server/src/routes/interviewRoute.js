const express = require("express");
const router = express.Router();

const { authentication, authorization } = require("../middleware/auth");

const { addInterview, getAllInterviews, getInterviewById, deleteInterview } = require("../controllers/interviewController");

// Admin Routes
router.post("/add-interview", authentication, authorization, addInterview);
router.delete("/delete", authentication, authorization, deleteInterview);

//User Routes
router.get("/all-interviews", authentication, getAllInterviews);
router.get("/get-interview/:id", authentication, getInterviewById);

module.exports = router;
