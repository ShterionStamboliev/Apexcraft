const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getCompanies } = require('../controllers/companies/getCompaniesController');
const { editCompany } = require('../controllers/companies/editCompanyController');
const { createCompany } = require('../controllers/companies/createCompanyController');
const modifyCompanyStatus = require('../controllers/companies/modifyCompanyStatusController');

const router = express.Router();

router.get('/companies', authenticateToken, getCompanies);
router.post('/companies/create', authenticateToken, createCompany);
router.put('/companies/:id/edit', authenticateToken, editCompany);
router.put('/companies/:id/delete', authenticateToken, modifyCompanyStatus);

module.exports = router;