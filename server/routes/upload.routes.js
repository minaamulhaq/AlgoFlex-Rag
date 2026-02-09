import { requireAuth } from '@clerk/express';

import express from "express";
import { uploadController } from '../controllers/upload.controller.js';
import { upload } from '../middleware/upload.middleware.js';


const uploadFileRouter = express.Router();

uploadFileRouter.post("/upload/pdf", requireAuth(), upload.single('pdf'), uploadController);
export default uploadFileRouter;