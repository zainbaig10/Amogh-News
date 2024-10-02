import User from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req, res) => {
    try {
        const { email, userName, password, phone, location, role } = req.body;
        const userDoc = await User.findOne({ $or: [{ email }, { phone }] });
        console.log(userDoc);
        if (userDoc) {
            return res
                .status(409)
                .json({ userDoc, success: false, msg: "User Already Exist" });
        }
        const user = await User.create({
            email,
            userName,
            password,
            phone,
            location,
            role,
        });
        return res.status(200).json({
            user,
            success: true,
            msg: "User Created Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error, success: false });
    }
});

export const login = asyncHandler(async (req, res) => {
    try {
        const { phone, password } = req.body;
        const userDoc = await User.findOne({ phone });
        if (!userDoc) {
            return res.status(401).json({
                success: false,
                msg: `User does not exist with the phone number ${phone}`,
            });
        }
        const isMatch = await userDoc.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Invalid password" });
        }
        return res
            .status(200)
            .json({ userDoc, success: true, msg: "Logged in successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message, success: false });
    }
});

export const updateUser = asyncHandler(async (req, res) => {
    try {
        const { userId, email, username, location, phone } = req.body;
        const userDoc = await User.findById(userId);
        if (!userDoc) {
            return res
                .status(404)
                .json({ success: false, msg: `User with ID ${userId} not found` });
        }
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res
                .status(409)
                .json({ success: false, msg: "Email or phone already in use" });
        }
        if (email) userDoc.email = email;
        if (username) userDoc.username = username;
        if (phone) userDoc.phone = phone;
        if (location) userDoc.location = location;
        await userDoc.save();
        return res.status(200).json({
            success: true,
            msg: "User updated successfully",
            user: userDoc,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

export const getByUserId = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const userDoc = await User.findById(userId);
        if (!userDoc) {
            return res
                .status(404)
                .json({ msg: `user id not found ${userId}`, success: false });
        }
        return res
            .status(200)
            .json({ userDoc, success: true, msg: `userId found` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error, success: false });
    }
});

export const getAllWithPagination = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const sortField = req.query.sortField || "username";
        const sortOrder = req.query.sortOrder || "asc";
        const sort = {};
        sort[sortField] = sortOrder === "asc" ? 1 : -1;
        const startIndex = (page - 1) * pageSize;
        const totalDocuments = await User.countDocuments();
        const totalPages = Math.ceil(totalDocuments / pageSize);
        const users = await User.find({})
            .sort(sort)
            .skip(startIndex)
            .limit(pageSize)
            .exec();
        return res.status(200).json({
            users,
            pagination: {
                page,
                pageSize,
                totalPages,
                totalDocuments,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error, success: false });
    }
});

export const getUserByRole = asyncHandler(async (req, res) => {
    try {
        const { role } = req.params;

        if (role !== 'ADMIN' && role !== 'USER') {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const userDoc = await User.find({ role });

        if (!userDoc || userDoc.length === 0) {
            return res.status(404).json({ message: 'No users found with this role' });
        }

        return res.status(200).json({ success: true, userDoc })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error, success: false });
    }
});

export const changePassword = asyncHandler(async (req, res) => {
    try {
      const { userId, password } = req.body;
      const userDoc = await User.findById(userId);
      if (!userDoc) {
        return res
          .status(404)
          .json({ success: false, msg: `User Id Not Found ${userId}` });
      }
      userDoc.password = password;
      await userDoc.save();
      return res
        .status(200)
        .json({ success: true, msg: "Password Updated Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message, success: false });
    }
  });