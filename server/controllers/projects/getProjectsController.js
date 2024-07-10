const pool = require("../../db");
const { getCompanyNameById } = require("../../utils/getCompanyNameById");

const getProjects = async (req, res) => {

    try {
        let query = 'SELECT id, name, company_id FROM tbl_projects';
        const [rows] = await pool.query(query);

        const allProjects = await Promise.all(rows.map(async project => {
            const companyName = await getCompanyNameById(project.company_id);
            return {
                ...project,
                company_name: companyName
            };
        }));

        const sortedProjects  = allProjects.sort((a, b) => {
            if (a.status === b.status) {
                return a.name.localeCompare(b.name);
            } else if (a.status === 'active' && b.status !== 'active') {
                return -1;
            } else if (a.status !== 'active' && b.status === 'active') {
                return 1;
            }
            return 0;
        });

        res.json(sortedProjects);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getProjects
};