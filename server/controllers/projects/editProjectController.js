const pool = require("../../db");
const { getCompanyIdByName } = require("../../utils/getCompanyIdByName");

const editProject = async (req, res) => {

    const projectId = req.params.id;
    const { name, company_id, email, note, status } = req.body;

    try {
        if (!name || !company_id || !email || !note) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const companyId = await getCompanyIdByName(company_id);

        if (!companyId) {
            return res.status(400).json({ message: 'Company not found' });
        }

        const query = `
            UPDATE tbl_projects
            SET name = ?, company_id = ?, main_email = ?, notes = ?, status = ?
            WHERE id = ?;
        `;

        const values = [name, companyId, company_id, email, note, status, projectId];

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Project not found!' });
        }

        const updatedProject = {
            id: projectId,
            name,
            company_id,
            companyId,
            email,
            note,
            status,
        };

        res.status(200).json({ message: 'Project updated successfully!', project: updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating a project!', error });
    }
};

module.exports = {
    editProject
};
