import express from 'express';
const chatRouter = express.Router();
import { requireAuth } from '@clerk/express';
import { chatController } from '../controllers/chat.controller.js';




chatRouter.get("/chat", requireAuth(), chatController)
export default chatRouter;