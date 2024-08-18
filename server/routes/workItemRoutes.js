const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

const { createWorkItem } = require('../controllers/workItems/createWorkItemController');

const router = express.Router();

router.post('/projects/:project_id/tasks/:task_id/workItems/create', createWorkItem);

module.exports = router;