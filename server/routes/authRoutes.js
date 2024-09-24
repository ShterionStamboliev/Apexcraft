const express = require('express');
const { login, logout, authCheck } = require('../controllers/auth/authController');
const authenticateToken = require('../middlewares/authenticateToken');
const { refreshTokenAPI } = require('../utils/generateTokenCookieSetter');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/auth-check', authenticateToken, authCheck);
router.post('/refresh-token', authenticateToken, refreshTokenAPI);

module.exports = router;