const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAssociatedUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/users', authenticateToken, getAssociatedUsers);

module.exports = router;