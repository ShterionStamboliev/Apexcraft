const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getAllProjects } = require('../controllers/projects/projectsController');
const { createProject } = require('../controllers/projects/createProjectController');
const { editProject } = require('../controllers/projects/editProjectController');
const modifyProjectStatus = require('../controllers/projects/modifyProjectStatusController');
const getProjectById = require('../controllers/projects/getProjectById');

const router = express.Router();

router.get('/projects', authenticateToken, getAllProjects);
router.get('/projects/id', authenticateToken, getProjectById);
router.post('/projects/create', authenticateToken, createProject );
router.put('/projects/:id/edit', authenticateToken, editProject );
router.put('/projects/:id/modifyStatus', authenticateToken, modifyProjectStatus)

module.exports = router;