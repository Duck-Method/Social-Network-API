import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../../controllers/userController.js';

const router = express.Router();

// GET /api/users - Get all users
router.get('/', getAllUsers);

// GET /api/users/:id - Get a single user by ID
router.get('/:id', getUserById);

// POST /api/users - Create a new user
router.post('/', createUser);

// PUT /api/users/:id - Update a user by ID
router.put('/:id', updateUser);

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', deleteUser);

// POST /api/users/:id/friends/:friendId - Add a friend
router.post('/:id/friends/:friendId', addFriend);

// DELETE /api/users/:id/friends/:friendId - Remove a friend
router.delete('/:id/friends/:friendId', removeFriend);

export default router;