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


const { authentication, authorization } = require("../middleware/auth");

const upload = require("../config/multer");

router.post("/signup", upload.single("profileImage"), signupUser);
router.post("/login", loginUser);
router.get("/profile", authentication, getProfile);
router.put("/update", upload.single("profileImage"), authentication, updateProfile);
router.delete("/delete", authentication, deleteProfile);

// Admin Routes
router.get("/all-users", authentication, authorization, getAllUsers);
router.delete("/delete-user/:id", authentication, authorization, deleteUser);

module.exports = router;