import express from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../controllers/thoughtController.js';

const router = express.Router();

// GET /api/thoughts - Get all thoughts
router.get('/', getAllThoughts);

// GET /api/thoughts/:id - Get a single thought by ID
router.get('/:id', getThoughtById);

// POST /api/thoughts - Create a new thought
router.post('/', createThought);

// PUT /api/thoughts/:id - Update a thought by ID
router.put('/:id', updateThought);

// DELETE /api/thoughts/:id - Delete a thought by ID
router.delete('/:id', deleteThought);

// POST /api/thoughts/:id/reactions - Add a reaction
router.post('/:id/reactions', addReaction);

// DELETE /api/thoughts/:id/reactions/:reactionId - Remove a reaction
router.delete('/:id/reactions/:reactionId', removeReaction);

export default router;