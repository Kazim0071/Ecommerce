import express from 'express';
import { getUserProfile } from '../controllers/users.js';
import { authHandler } from '../middlewares/authHandler.js';
const router = express.Router();

router.get('/profile', authHandler, getUserProfile);

export default router;
