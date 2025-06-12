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

// Create initial admin user
router.post('/admin', createAdminUser);

// Login route
router.post('/login', loginUser);

// Get all users
router.get('/', getUsers);

// Get single user
router.get('/:id', getUser);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router; 