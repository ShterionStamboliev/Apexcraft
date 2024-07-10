const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAssociatedUsers } = require('../controllers/user/userController');
const modifyUserStatus = require('../controllers/user/modifyUserStatusController');
const { createUser } = require('../controllers/user/createUserController');
const { editUser } = require('../controllers/user/editUserController');
const getUserById = require('../controllers/user/getUserById');

const router = express.Router();

router.post('/users/create', authenticateToken, createUser);
router.get('/users', authenticateToken, getAssociatedUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.put('/users/:id/edit', authenticateToken, editUser);
router.put('/users/:id/delete', authenticateToken, modifyUserStatus)

module.exports = router;