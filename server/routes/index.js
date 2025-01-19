import express from 'express';
import userRoutes from './api/userRoutes.js';
import thoughtRoutes from './api/thoughtRoutes.js';

const router = express.Router();

// Use userRoutes for /api/users
router.use('/api/users', userRoutes);

// Use thoughtRoutes for /api/thoughts
router.use('/api/thoughts', thoughtRoutes);

export default router;