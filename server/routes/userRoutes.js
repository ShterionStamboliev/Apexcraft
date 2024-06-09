const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAssociatedUsers, userEdit } = require('../controllers/userController');
const deleteUserController = require('../controllers/deleteUserController');

const router = express.Router();

router.get('/users', authenticateToken, getAssociatedUsers);

router.get('/users/:id/delete', deleteUserController)

module.exports = router;