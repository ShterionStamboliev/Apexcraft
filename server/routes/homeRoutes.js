const express = require('express');
const { homePage } = require('../controllers/home/homeController');
const authenticateToken = require('../middlewares/authenticateToken');
const { getArtisanTasks } = require('../controllers/home/getArtisanTasksController');
const { getTaskWithProject } = require('../controllers/home/getArtisanTaskProjectController');
const { createWorkItem } = require('../controllers/home/createArtisanWorkItemController');

const router = express.Router();

router.get('/my-projects', authenticateToken, getArtisanTasks);
router.get('/my-projects/:taskId/task', authenticateToken, getTaskWithProject);
router.post('/my-projects/:taskId/task/create', authenticateToken, createWorkItem);

module.exports = router;