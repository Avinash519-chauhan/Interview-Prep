const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { isValid, isValidObjectId, isValidFullName, isValidEmail, isValidPhone, isValidPassword, } = require("../utils/validator");


//signup user
const signupUser = async (req, res) => {
    try {
        let userData = req.body;
        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({ msg: "Bad Request! No Data Provided" })
        }
        let { fullName, email, password, phone, bio, role } = userData;

        //Full Name
        if (!isValid(fullName)) {
            return res.status(400).json({ msg: "Full Name is Required" })
        }

        if (!isValidFullName(fullName)) {
            return res.status(400).json({ msg: "Invalid Full Name" })
        }

        //email
        if (!isValid(email)) {
            return res.status(400).json({ msg: "Email is Required" })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: "Invalid Email" })
        }

        let duplicateEmail = await UserModel.findOne({ email });

        if (duplicateEmail) {
            return res.status(401).json({ msg: "Email is Exist already" })
        }

        // Password Validation
        if (!isValid(password)) {
            return res.status(400).json({ msg: "Password is Required" });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ msg: "Invalid Password" });
        }

        // Phone Validation
        if (!isValid(phone)) {
            return res.status(400).json({ msg: "Phone Number is Required" });
        }

        if (!isValidPhone(phone)) {
            return res.status(400).json({ msg: "Invalid Phone Number" });
        }

        let duplicatePhoneNo = await UserModel.findOne({ phone });
        if (duplicatePhoneNo) {
            return res.status(400).json({ msg: "Phone Number Already Exists" });
        }

        // Bio Validation
        if (bio !== undefined) {
            if (bio.trim().length > 200) {
                return res
                    .status(400)
                    .json({ msg: "Bio Should not exceed 200 Characters." });
            }
        }

        // Role Validation
        if (role !== undefined) {
            if (role !== "user") {
                return res.status(400).json({ msg: "Invalid Role" });
            }
        }

        // Password Hashing
        let hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;

        // Profile Image
        if (req.file) {
            userData.profileImage = req.file.filename;
        }

        let userAdded = await UserModel.create(userData);

        return res.status(201).json({ msg: "Signup Successfully Done", userAdded });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

// Login User
const loginUser = async (req, res) => {
    try {
        let data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ msg: "Bad Request! No Data Provided" });
        }

        const { email, password } = data;

        if (!isValid(email)) {
            return res.status(400).json({ msg: "Email is Required" });
        }

        if (!isValid(password)) {
            return res.status(400).json({ msg: "Password is Required" });
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        let passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ msg: "Incorrect Password" });
        }

        let token = jwt.sign(
            {
                userId: user._id,
                userRole: user.role,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            },
        );

        return res.status(200).json({ msg: "Login Successfull", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Get Profile
const getProfile = async (req, res) => {
    try {
        let userId = req.userId;

        let user = await UserModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        return res.status(200).json({ msg: "Profile Fetched Successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        let userId = req.userId;

        let userData = req.body;

        if (!userData || Object.keys(userData).length === 0 && !req.file) {
            return res
                .status(400)
                .json({ msg: "Bad Request! Enter Data to Update." });
        }

        let { fullName, email, password, phone, bio } = userData;

        if (fullName !== undefined) {
            if (!isValid(fullName)) {
                return res.status(400).json({ msg: "Full Name is Required" });
            }

            if (fullName.length < 2 || !isValidFullName(fullName)) {
                return res.status(400).json({ msg: "Invalid Full Name" });
            }
        }

        if (email !== undefined) {
            if (!isValid(email)) {
                return res.status(400).json({ msg: "Email is Required" });
            }

            if (!isValidEmail(email)) {
                return res.status(400).json({ msg: "Invalid Email" });
            }

            let duplicateEmail = await UserModel.findOne({
                email,
                _id: { $ne: userId },
            });
            if (duplicateEmail) {
                return res.status(400).json({ msg: "Email Already Exists" });
            }
        }

        if (password !== undefined) {
            if (!isValid(password)) {
                return res.status(400).json({ msg: "Password is Required" });
            }

            if (!isValidPassword(password)) {
                return res.status(400).json({ msg: "Invalid Password" });
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            userData.password = hashedPassword;
        }

        if (phone !== undefined) {
            if (!isValid(phone)) {
                return res.status(400).json({ msg: "Phone Number is Required" });
            }

            if (!isValidPhone(phone)) {
                return res.status(400).json({ msg: "Invalid Phone Number" });
            }

            let duplicatePhoneNo = await UserModel.findOne({
                phone,
                _id: { $ne: userId },
            });
            if (duplicatePhoneNo) {
                return res.status(400).json({ msg: "Phone Number Already Exists" });
            }
        }

        if (bio !== undefined) {
            if (bio.trim().length > 200) {
                return res
                    .status(400)
                    .json({ msg: "Bio Should not exceed 200 Characters." });
            }
        }

        // Profile Image
        if (req.file) {
            userData.profileImage = req.file.filename
        }

        let updatedUserProfile = await UserModel.findByIdAndUpdate(
            userId,
            userData,
            { new: true },
        ).select("-password");

        return res
            .status(200)
            .json({ msg: "Profile Updated Successfully", updatedUserProfile });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Delete Profile
const deleteProfile = async (req, res) => {
    try {
        let userId = req.userId;

        let deletedUserProfile = await UserModel.findByIdAndDelete(userId);

        if (!deletedUserProfile) {
            return res.status(404).json({ msg: "User Not Found Or Already Deleted" });
        }

        return res.status(200).json({ msg: "Profile Deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Get All Profiles (Admin)
const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find().select("-password");

        if (users.length === 0) {
            return res.status(404).json({ msg: "No Users Found" });
        }

        return res.status(200).json({ msg: "Users Fetched Successfully", users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Delete User (Admin)
const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ msg: "Invalid Id" });
        }

        let user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        if (user.role === "admin") {
            return res.status(403).json({ msg: "Admin Cannot be deleted" });
        }

        await UserModel.findByIdAndDelete(userId);
        return res.status(200).json({ msg: "User Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = { signupUser, loginUser, getProfile, updateProfile, deleteProfile, getAllUsers, deleteUser };