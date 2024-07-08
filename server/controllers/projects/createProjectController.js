const db = require("../../db");
const { getCompanyIdByName } = require("../../utils/getCompanyIdByName");

const createProject = async (req, res) => {

    const { projectName, projectCompany, projectEmail, projectNotes } = req.body;

    try {

        if (!projectName || !projectCompany || !projectEmail || !projectNotes) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        const companyId = await getCompanyIdByName(projectCompany);

        if (!companyId) {
            return res.status(400).json({ message: 'Company not found' });
        }

        const query = `
            INSERT INTO tbl_projects (name, company_id, main_email, notes, status)
            VALUES (?, ?, ?, ?, 'active');
        `;

        const values = [projectName, companyId, projectEmail, projectNotes];

        const [result] = await db.query(query, values);

        const newProject = {
            id: result.insertId,
            projectName,
            projectCompany,
            projectEmail,
            projectNotes,
            status: "active"
        };

        res.status(201).json({ message: 'Project created successfully', project: newProject });

    } catch (error) {
        res.status(500).json({ message: 'Error creating a project', error });
    };
};

module.exports = {
    createProject
};