import mongoose from 'mongoose';
import User from './user.js';
const keySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    openaiAPIKey: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true });

export const Key = mongoose.model('Key', keySchema);