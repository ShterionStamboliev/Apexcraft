const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAssociatedUsers } = require('../controllers/userController');
const { editUser } = require('../controllers/editUserController');

const router = express.Router();

router.get('/users', authenticateToken, getAssociatedUsers);
router.post('/users/:id/edit', authenticateToken, editUser);

module.exports = router;