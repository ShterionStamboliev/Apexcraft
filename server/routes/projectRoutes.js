const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { createProject } = require('../controllers/projects/createProjectController');
const { editProject } = require('../controllers/projects/editProjectController');
const { getProjectById } = require('../controllers/projects/getProjectById');
const { getProjects } = require('../controllers/projects/getProjectsController');
const { modifyProjectStatus } = require('../controllers/projects/modifyProjectStatusController');

const router = express.Router();

router.get('/projects', authenticateToken, getProjects);
router.get('/projects/id', authenticateToken, getProjectById);
router.post('/projects/create', authenticateToken, createProject );
router.put('/projects/:id/edit', authenticateToken, editProject );
router.put('/projects/:id/modifyStatus', authenticateToken, modifyProjectStatus)

module.exports = router;