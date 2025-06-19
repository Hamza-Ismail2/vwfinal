const express = require('express');
const router = express.Router();
const {
    createAdminUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const protect = require('../middleware/auth');

// Create initial admin user
router.post('/admin', createAdminUser);

// Login route
router.post('/login', loginUser);

// Get all users
router.get('/', protect('admin'), getUsers);

// Get single user
router.get('/:id', protect('admin'), getUser);

// Update user
router.put('/:id', protect('admin'), updateUser);

// Delete user
router.delete('/:id', protect('admin'), deleteUser);

module.exports = router; 