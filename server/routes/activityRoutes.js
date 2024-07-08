const express = require('express');
const { getActivities } = require('../controllers/activity/getActivities');
const authenticateToken = require('../middlewares/authenticateToken');
const modifyActivityStatus = require('../controllers/activity/modifyActivityStatusController');
const { editActivities } = require('../controllers/activity/editActivitiesController');
const { getOneActivity } = require('../controllers/activity/getOneActivityController');
const { addActivities } = require('../controllers/activity/addActivitiesController');

const router = express.Router();

router.get('/activities', authenticateToken, getActivities);
router.get('/activities/:id', authenticateToken, getOneActivity);
router.post('/activities/create', authenticateToken, addActivities);
router.put('/activities/:id/edit', authenticateToken, editActivities);
router.put('/activities/:id/delete', authenticateToken, modifyActivityStatus)


module.exports = router;