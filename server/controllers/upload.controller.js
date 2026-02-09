import { upload } from '../middleware/upload.middleware.js';
import { queue } from '../utils/uploadFileQueue.js';
import { Key } from '../models/key.model.js';

export const uploadController = async (req, res) => {

    const { userId } = req.auth();
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const apikey = await Key.findOne({ userId });
    if (!apikey) {
        return res.status(403).json({ message: "API Key not found. Please set your OpenAI API key in the profile settings." });
    }

    await queue.add("processPDF", {
        fileName: req.file?.originalname,
        destination: req.file?.destination,
        filePath: req.file?.path,
        fileSize: req.file?.size,
        userId: req.auth.userId,
        openaiAPIKey: apikey.openaiAPIKey,
    })
    const safeFileName = req.file?.originalname.replace(/[^a-zA-Z0-9_-]/g, "_");
    res.json({ fileName: safeFileName, message: "PDF uploaded successfully" });
}