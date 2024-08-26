const pool = require("../../db");
const { getCompanyIdByName } = require("../../utils/getCompanyIdByName");
const Validator = require('../../validators/controllerValidator');
const { projectSchema } = require('../../validators/validationSchemas');

const editProject = async (req, res) => {

    const projectId = req.params.id;
    const { name, company_name, email, address, startDate, endDate, note, status } = req.body;
    // const validator = new Validator(projectSchema);
    // const errors = validator.validate({ name, company_name, email, note, status });

    // if (errors.length > 0) {
    //     return res.status(400).json({ errors });
    // };

    try {

        const companyId = await getCompanyIdByName(company_name);

        const query = `
            UPDATE tbl_projects
            SET name = ?, company_id = ?, email = ?, address = ?, start_date = ?, end_date = ?, note = ?, status = ?
            WHERE id = ?;
        `;

        const values = [name, companyId, email, address, startDate, endDate, note, status];

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Project not found!' });
        }

        const updatedProject = {
            id: projectId,
            name,
            companyId,
            email,
            address,
            startDate,
            endDate,
            note,
            status
        };

        res.status(200).json({ message: 'Project updated successfully!', project: updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating a project!', error });
    }
};

module.exports = {
    editProject
};
