const db = require("../../db");
const { getCompanyIdByName } = require("../../utils/getCompanyIdByName");

const createProject = async (req, res) => {

    const { name, company_id, email, note, status } = req.body;

    try {

        if (!name || !company_id || !email || !note) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        const companyId = await getCompanyIdByName(company_id);

        if (!companyId) {
            return res.status(400).json({ message: 'Company not found' });
        }

        const query = `
            INSERT INTO tbl_projects (name, company_id, email, note, status)
            VALUES (?, ?, ?, ?, 'active');
        `;

        const values = [name, companyId, email, note];

        const [result] = await db.query(query, values);

        const newProject = {
            id: result.insertId,
            name,
            company_id,
            email,
            note,
            status
        };

        res.status(201).json({ message: 'Project created successfully!', project: newProject });

    } catch (error) {
        res.status(500).json({ message: 'Error creating a project!', error });
    };
};

module.exports = {
    createProject
};