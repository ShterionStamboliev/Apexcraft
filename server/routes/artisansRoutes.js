const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { createArtisan } = require('../controllers/artisans/createArtisanController');
const { editArtisan } = require('../controllers/artisans/editArtisanController');
const { modifyArtisansStatus } = require('../controllers/artisans/modifyArtisanStatusController');
const { getArtisanById } = require('../controllers/artisans/getArtisanByIdController');

const router = express.Router();

router.post('/artisans', authenticateToken, createArtisan);
router.get('/activities/:id', authenticateToken, getArtisanById);
router.put('/artisans/:id/edit', authenticateToken, editArtisan);
router.put('/artisans/:id/delete', authenticateToken, modifyArtisansStatus);

module.exports = router;
