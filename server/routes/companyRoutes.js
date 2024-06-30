const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getCompanies } = require('../controllers/companies/getCompaniesController');
const { editCompany } = require('../controllers/companies/editCompanyController');
const { updateCompanyStatus } = require('../controllers/companies/updateStatusCompanyController');

const router = express.Router();

router.get('/companies', authenticateToken, getCompanies);
router.put('/companies/:id/edit', authenticateToken, editCompany);
router.put('/companies/:id/delete', authenticateToken, updateCompanyStatus);

module.exports = router;