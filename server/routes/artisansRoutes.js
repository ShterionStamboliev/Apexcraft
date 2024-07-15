const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { createArtisan } = require('../controllers/artisans/createArtisanController');
const { editArtisan } = require('../controllers/artisans/editArtisanController');
const { modifyArtisansStatus } = require('../controllers/artisans/modifyArtisanStatusController');
const { getArtisanById } = require('../controllers/artisans/getArtisanByIdController');
const { getArtisans } = require('../controllers/artisans/getArtisansController');

const router = express.Router();

router.get('/artisans', authenticateToken, getArtisans);
router.get('/artisans/:id', authenticateToken, getArtisanById);
router.post('/artisans/create', authenticateToken, createArtisan);
router.put('/artisans/:id/edit', authenticateToken, editArtisan);
router.put('/artisans/:id/modifyStatus', authenticateToken, modifyArtisansStatus);

module.exports = router;
