const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const deactivateUserController = require('../controllers/user/deactivateUserController');
const { getAssociatedUsers } = require('../controllers/user/userController');
const getUserById = require('../utils/getUserById');
const { createUser } = require('../controllers/user/createUserController');
const { editUser } = require('../controllers/user/editUserController');

const router = express.Router();

router.post('/users/create', authenticateToken, createUser);
router.get('/users', authenticateToken, getAssociatedUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.post('/users/:id/edit', authenticateToken, editUser);
router.get('/users/:id/delete', authenticateToken, deactivateUserController)

module.exports = router;