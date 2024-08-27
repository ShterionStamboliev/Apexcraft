const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

const { createTask } = require('../controllers/tasks/createTaskController');
const { getTasks } = require('../controllers/tasks/getTasksController');

const router = express.Router();

router.post('/projects/:id/createTask', createTask);
router.get ('/projects/:id/tasks', getTasks);


module.exports = router;