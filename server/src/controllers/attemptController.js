const AttemptModel = require("../models/attemptModel");
const InterviewModel = require("../models/interviewModel");

const { isValidObjectId } = require("../utils/validator");

// Start Interview
const startInterview = async (req, res) => {
  try {
    let interviewId = req.params.id;
    if (!isValidObjectId(interviewId)) {
      return res.status(400).json({ msg: "Invalid Interview Id" });
    }

    let interview = await InterviewModel.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ msg: "Interview Not Found" });
    }

    if (!interview.isActive) {
      return res.status(400).json({ msg: "Interview is not active" });
    }

    let attempt = await AttemptModel.create({
      userId: req.userId,
      interviewId: interviewId,
      questions: [],
      status: "started",
    });



    res.status(201).json({ msg: "Interview Started Successfully", attempt });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { startInterview };