const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { createArtisans } = require('../controllers/artisans/createArtisansController');
const { editArtisan } = require('../controllers/artisans/editArtisansController');
const { changeArtisanStatus } = require('../controllers/artisans/changeArtisansStatusController');

const router = express.Router();

router.post('/artisans', authenticateToken, createArtisans);
router.put('/artisans/:id/edit', authenticateToken, editArtisan);
router.put('/artisans/:id/delete', authenticateToken, changeArtisanStatus);

module.exports = router;
