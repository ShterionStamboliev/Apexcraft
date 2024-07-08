const pool = require("../../db");
const { getCompanyIdByName } = require("../../utils/getCompanyIdByName");

const editProject = async (req, res) => {
    const { projectId, projectName, projectCompany, projectEmail, projectNotes } = req.body;

    try {
        if (!projectId || !projectName || !projectCompany || !projectEmail || !projectNotes) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const companyId = await getCompanyIdByName(projectCompany);

        if (!companyId) {
            return res.status(400).json({ message: 'Company not found' });
        }

        const query = `
            UPDATE tbl_projects
            SET name = ?, company_id = ?, main_email = ?, notes = ?, status = 'active'
            WHERE id = ?;
        `;

        const values = [projectName, companyId, projectEmail, projectNotes, projectId];

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const updatedProject = {
            id: projectId,
            projectName,
            projectCompany,
            projectEmail,
            projectNotes,
            status: "active"
        };

        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating a project', error });
    }
};

module.exports = {
    editProject
};
