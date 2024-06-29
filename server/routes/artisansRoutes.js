const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { createArtisans } = require('../controllers/artisans/createArtisansController');

const router = express.Router();

router.post('/artisans', authenticateToken, createArtisans)

module.exports = router;
