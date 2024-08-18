const pool = require("../db");

const getProjectIdByName = async (projectName) => {
    try {
        const query = 'SELECT id FROM tbl_projects WHERE name = ?';
        const [rows] = await pool.query(query, [projectName]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching project ID!');
    }
};

module.exports = {
    getProjectIdByName
};
