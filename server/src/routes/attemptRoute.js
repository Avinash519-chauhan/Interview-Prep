const express = require("express");
const router = express.Router();

const { startInterview } = require("../controllers/attemptController");

const { authentication } = require("../middleware/auth");

router.post("/start-interview", authentication, startInterview);

module.exports = router;