const pool = require("../db");

const getTaskIdByName = async (taskName) => {
    try {
        const query = 'SELECT id FROM tbl_tasks WHERE name = ?';
        const [rows] = await pool.query(query, [taskName]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching task ID!');
    }
};

module.exports = {
    getTaskIdByName
};
