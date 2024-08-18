const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

const { createTask } = require('../controllers/tasks/createTaskController');

const router = express.Router();

router.post('/projects/:id/createTask', createTask);

module.exports = router;