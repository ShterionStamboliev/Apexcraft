const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getActivities } = require('../controllers/activity/getActivitiesController');
const { getActivityById } = require('../controllers/activity/getActivityByIdController');
const { createActivity } = require('../controllers/activity/createActivityController');
const { editActivity } = require('../controllers/activity/editActivitiyController');
const { modifyActivityStatus } = require('../controllers/activity/modifyActivityStatusController');


const router = express.Router();

router.get('/activities', authenticateToken, getActivities);
router.get('/activities/:id', authenticateToken, getActivityById);
router.post('/activities/create', authenticateToken, createActivity);
router.put('/activities/:id/edit', authenticateToken, editActivity);
router.put('/activities/:id/delete', authenticateToken, modifyActivityStatus)


module.exports = router;