const db = require("../../db");
const { getCompanyIdByName } = require("../../utils/getCompanyIdByName");
const Validator = require('../../validators/controllerValidator');
const { projectSchema } = require('../../validators/validationSchemas');

const createProject = async (req, res) => {

    const { name, company_name, email, address, startDate, endDate, note, status } = req.body;
    // const validator = new Validator(projectSchema);
    // const errors = validator.validate({ name, company_name, email, note, status });

    // if (errors.length > 0) {
    //     return res.status(400).json({ errors });
    // };

    try {

        const companyId = await getCompanyIdByName(company_name);

        const query = `
            INSERT INTO tbl_projects (name, company_id, email, address, start_date, end_date, note, status)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        const values = [name, companyId, email, address, startDate, endDate, note, status];

        const [result] = await db.query(query, values);

        const newProject = {
            id: result.insertId,
            name,
            companyId,
            email,
            address,
            startDate,
            endDate,
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