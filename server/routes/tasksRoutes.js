const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

const { createTask } = require('../controllers/tasks/createTaskController');
const { editTask } = require('../controllers/tasks/editTaskController');

const router = express.Router();

router.post('/projects/:id/createTaks', createTask);
router.put('/projects/:id/editTask/:id', editTask);

module.exports = router;