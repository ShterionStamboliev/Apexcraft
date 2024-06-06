const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAssociatedUsers, createUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users', authenticateToken, getAssociatedUsers);
router.post('/users/create', authenticateToken, createUser)

module.exports = router;