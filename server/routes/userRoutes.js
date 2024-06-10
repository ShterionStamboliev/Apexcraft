const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAssociatedUsers, createUser } = require('../controllers/userController');
const { editUser, getUserById } = require('../controllers/editUserController');

const router = express.Router();

router.post('/users/create', authenticateToken, createUser);
router.get('/users', authenticateToken, getAssociatedUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.post('/users/:id/edit', authenticateToken, editUser);

module.exports = router;