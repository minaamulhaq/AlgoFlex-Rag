import express from 'express';
import { createKey, getKey } from '../controllers/key.controller.js';
import { requireAuth } from '@clerk/express';

const keyRouter = express.Router();

// POST route to create data in the database
keyRouter.post('/keys', requireAuth(), createKey);
keyRouter.get('/keys/get', requireAuth(), getKey);

export default keyRouter;