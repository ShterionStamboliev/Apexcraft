const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAssociatedUsers, userEdit } = require('../controllers/userController');

const router = express.Router();

router.get('/users', authenticateToken, getAssociatedUsers);
// router.post('/users/:id/edit', userEdit)

module.exports = router;