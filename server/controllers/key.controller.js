import { Key } from '../models/key.model.js';
import User from '../models/user.js';
import { ApiResponse } from '../utils/Helper.js';

export const createKey = async (req, res) => {
    try {
        const { openaiAPIKey } = req.body;
        const { userId } = req.auth(); // Clerk ID from requireAuth

        if (!userId || !openaiAPIKey) {
            return res.status(400).json({
                success: false,
                message: "userId and openaiAPIKey are required"
            });
        }

        const userExisted = await User.findOne({ clerkId: userId });
        if (!userExisted) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const existingKey = await Key.findOne({ userId });
        if (existingKey) {
            return res.status(200).json({ success: false, message: "Key already exists" });
        }

        const key = await Key.create({ userId, openaiAPIKey });

        return res.status(201).json(
            new ApiResponse(200, null, "Key created successfully")
        );

    } catch (error) {
        console.error("Error creating key:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getKey = async (req, res) => {
    try {
        const { userId } = req.auth();
        if (!userId) {
            return res.status(400).json({ isKey: false, success: false, message: "userId is required" });
        }
        const key = await Key.findOne({ userId });
        if (!key) {
            return res.status(201).json({ isKey: false, success: false, message: "Key not found" });
        }
        return res.status(200).json({
            isKey: true,
            success: true,
            message: "Key retrieved successfully",
        }
        );
    } catch (error) {
        console.error("Error getting key:", error);
        return res.status(500).json({ isKey: false, success: false, error: error.message });
    }
}