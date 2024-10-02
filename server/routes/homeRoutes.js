const express = require('express');
const { homePage } = require('../controllers/home/homeController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/', authenticateToken, homePage);

module.exports = router;