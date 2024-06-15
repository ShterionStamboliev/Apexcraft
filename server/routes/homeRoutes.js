const express = require('express');
const { home } = require('../controllers/home/homeController');

const router = express.Router();

router.get('/', home);

module.exports = router;