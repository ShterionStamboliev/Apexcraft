const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

const { createWorkItem } = require('../controllers/workItems/createWorkItemController');
const { editWorkItem } = require('../controllers/workItems/editWorkItemController');


const router = express.Router();

router.post('/projects/:id/', createWorkItem);
router.put('/projects/:id/editTask/:id', editWorkItem);

module.exports = router;