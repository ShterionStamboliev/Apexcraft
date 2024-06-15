const express = require('express');
const { getActivities } = require('../controllers/activity/getActivities');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/activities', authenticateToken, getActivities);

module.exports = router;