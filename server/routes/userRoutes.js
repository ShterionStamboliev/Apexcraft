const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAssociatedUsers } = require('../controllers/userController');
const deleteUserController = require('../controllers/deleteUserController');

const router = express.Router();

router.get('/users', authenticateToken, getAssociatedUsers);
// Missing validation for credentials
router.get('/users/:id/delete', deleteUserController)

module.exports = router;