const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

const { createWorkItem } = require('../controllers/workItems/createWorkItemController');
const { getWorkItems } = require('../controllers/workItems/getWorkItemsController');

const router = express.Router();

router.post('/projects/:project_id/tasks/:task_id/workItems/create', createWorkItem);
router.get ('/projects/:project_id/tasks/:task_id/workItems', getWorkItems);

module.exports = router;