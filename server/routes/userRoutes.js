const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const deleteUserController = require('../controllers/deleteUserController');
const { getAssociatedUsers } = require('../controllers/userController');
const { editUser } = require('../controllers/editUserController');
const { createUser } = require('../controllers/createUserController');
const getUserById = require('../utils/getUserById');

const router = express.Router();

router.post('/users/create', authenticateToken, createUser);
router.get('/users', authenticateToken, getAssociatedUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.post('/users/:id/edit', authenticateToken, editUser);
router.get('/users/:id/delete', authenticateToken, deleteUserController)

module.exports = router;