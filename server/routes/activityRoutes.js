const express = require('express');
const { getActivities } = require('../controllers/activity/getActivities');
const authenticateToken = require('../middlewares/authenticateToken');
const modifyActivityStatus = require('../controllers/activity/modifyActivityStatusController');
const { editActivities } = require('../controllers/activity/editActivitiesController');

const router = express.Router();

router.get('/activities', authenticateToken, getActivities);
router.put('/activities/:id/edit', authenticateToken, editActivities);
router.put('/activities/:id/delete', authenticateToken, modifyActivityStatus)


module.exports = router;