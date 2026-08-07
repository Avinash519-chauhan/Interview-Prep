const express = require("express");
const router = express.Router();

const {
    signupUser,
    loginUser,
    getProfile,
    updateProfile,
    deleteProfile,
    getAllUsers,
    deleteUser,
} = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares/auth");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", authentication, getProfile);
router.put("/update", authentication, updateProfile);
router.delete("/delete", authentication, deleteProfile);

// Admin Routes
router.get("/all-users", authentication, authorization, getAllUsers);
router.delete("/delete-user/:id", authentication, authorization, deleteUser);

module.exports = router;