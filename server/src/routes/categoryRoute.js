const express = require("express");
const router = express.Router();

const { authentication, authorization } = require("../middlewares/auth");

const {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Admin Routes
router.post("/add-category", authentication, authorization, addCategory);
router.put("/update/:id", authentication, authorization, updateCategory);
router.delete("/delete/:id", authentication, authorization, deleteCategory);

// User Routes
router.get("/get-all-categories", authentication, getAllCategory);
router.get("/get-category/:id", authentication, getCategoryById);

module.exports = router;
