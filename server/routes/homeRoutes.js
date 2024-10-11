const express = require('express');
const { homePage } = require('../controllers/home/homeController');
const authenticateToken = require('../middlewares/authenticateToken');
const { getArtisanTasks } = require('../controllers/home/getArtisanTasksController');
const { getTaskWithProject } = require('../controllers/home/getArtisanTaskProjectController');
const { createWorkItem } = require('../controllers/home/createArtisanWorkItemController');
const { editWorkItem } = require('../controllers/home/editArtisanWorkItemController');

const router = express.Router();

router.get('/my-projects', authenticateToken, getArtisanTasks);
router.get('/my-projects/:taskId/task', authenticateToken, getTaskWithProject);
router.post('/my-projects/:taskId/task/create', authenticateToken, createWorkItem);
router.post('/my-projects/:taskId/task/:work_item/wi/edit', authenticateToken, editWorkItem);

module.exports = router;