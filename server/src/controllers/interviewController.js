const InterviewModel = require("../models/interviewModel");
const CategoryModel = require("../models/categoryModel");
const { isValid, isValidObjectId } = require("../utils/validator");

// Add Interview (Admin)
const addInterview = async (req, res) => {
  try {
    let interviewData = req.body;

    if (!interviewData || Object.keys(interviewData).length === 0) {
      return res.status(400).json({ msg: "Bad Request! No Data Provided" });
    }

    let { title, categoryId, difficulty, duration, description, isActive } =
      interviewData;

    // Title Validation
    if (!isValid(title)) {
      return res.status(400).json({ msg: "Interview Title is Required" });
    }

    // CategoryId Validation
    if (!isValid(categoryId)) {
      return res.status(400).json({ msg: "Category ID is Required" });
    }

    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid Category Id" });
    }

    let category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category Not Found" });
    }

    // Difficulty Validation
    if (!isValid(difficulty)) {
      return res.status(400).json({ msg: "Difficulty is Required" });
    }

    if (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
      return res.status(400).json({ msg: "Invalid Difficulty " });
    }

    // Duration Validation
    if (!isValid(duration)) {
      return res.status(400).json({ msg: "Duration is Required" });
    }

    if (duration <= 0) {
      return res.status(400).json({ msg: "Invalid Duration" });
    }

    // Description Validation
    if (!isValid(description)) {
      return res.status(400).json({ msg: "Description is Required" });
    }

    if (description.length < 10 || description.length > 400) {
      return res.status(400).json({
        msg: "Description Should be less than 400 and greater than 10 Characters.",
      });
    }

    // Interview Status Validation
    if (isActive !== undefined && typeof isActive !== "boolean") {
      return res.status(400).json({ msg: "Invalid Interview Status" });
    }

    let interview = await InterviewModel.create(interviewData);
    return res.status(201).json({ msg: "Interview Added Successfully", interview });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get All Interviews (search, filter, pagination)
const getAllInterviews = async (req, res) => {
  try {


    

    let interviews = await InterviewModel.find().populate("categoryId");
    if (interviews.length === 0) {
      return res.status(404).json({ msg: "No Interview Found" });
    }

    return res.status(200).json({ msg: "Interviews Fetched Successfully", interviews });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get Interview By Id
const getInterviewById = async (req, res) => {
  try {
    let interviewId = req.params.id;

    if (!isValidObjectId(interviewId)) {
      return res.status(400).json({ msg: "Invalid Interview Id" });
    }

    let interview =
      await InterviewModel.findById(interviewId).populate("categoryId");

    if (!interview) {
      return res.status(404).json({ msg: "Interview Not Found" });
    }

    return res.status(200).json({ interview });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update Interview (Admin)
const updateInterview = async (req, res) => {
  try {
    let interviewId = req.params.id;
    if (!isValidObjectId(interviewId)) {
      return res.status(400).json({ msg: "Invalid Interview Id" });
    }

    let interviewData = req.body;

    if (!interviewData || Object.keys(interviewData).length === 0) {
      return res.status(400).json({ msg: "Bad Request! No Data Provided" });
    }

    let { title, categoryId, difficulty, duration, description, isActive } =
      interviewData;

    if (title !== undefined) {
      if (!isValid(title)) {
        return res.status(400).json({ msg: "Interview Title is Required" });
      }
    }

    if (categoryId !== undefined) {
      if (!isValid(categoryId)) {
        return res.status(400).json({ msg: "Category Id is Required" });
      }

      if (!isValidObjectId(categoryId)) {
        return res.status(400).json({ msg: "Invalid Category Id" });
      }

      let category = await CategoryModel.findById(categoryId);
      if (!category) {
        return res.status(404).json({ msg: "Category Not Found" });
      }
    }

    if (difficulty !== undefined) {
      if (!isValid(difficulty)) {
        return res.status(400).json({ msg: "Difficulty is Required" });
      }

      if (
        difficulty !== "easy" &&
        difficulty !== "medium" &&
        difficulty !== "hard"
      ) {
        return res.status(400).json({ msg: "Invalid Difficulty " });
      }
    }

    if (duration !== undefined) {
      if (!isValid(duration)) {
        return res.status(400).json({ msg: "Duration is Required" });
      }

      if (duration <= 0) {
        return res.status(400).json({ msg: "Invalid Duration" });
      }
    }

    if (description !== undefined) {
      if (!isValid(description)) {
        return res.status(400).json({ msg: "Description is Required" });
      }

      if (description.length < 10 || description.length > 400) {
        return res.status(400).json({
          msg: "Description Should be less than 400 and greater than 10 Characters.",
        });
      }
    }

    if (isActive !== undefined && typeof isActive !== "boolean") {
      return res.status(400).json({ msg: "Invalid Interview Status" });
    }

    let updatedInterviewData = await InterviewModel.findByIdAndUpdate(
      interviewId,
      interviewData,
      { new: true },
    ).populate("categoryId");

    if (!updatedInterviewData) {
      return res.status(404).json({ msg: "Interview Not Found" });
    }
    return res.status(200).json({
      msg: "Interview Data Updated Successfully",
      updatedInterviewData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Interview (Admin)
const deleteInterview = async (req, res) => {
  try {
    let interviewId = req.params.id;

    if (!isValidObjectId(interviewId)) {
      return res.status(400).json({ msg: "Invalid Interview Id" });
    }

    let deletedInterview = await InterviewModel.findByIdAndDelete(interviewId);

    if (!deleteInterview) {
      return res
        .status(404)
        .json({ msg: "Interview Not Found Or already deleted" });
    }

    return res.status(200).json({ msg: "Interview Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { addInterview, getAllInterviews, getInterviewById, deleteInterview, updateInterview };
