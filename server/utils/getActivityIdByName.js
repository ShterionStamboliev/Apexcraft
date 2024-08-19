const pool = require("../db");

const getActivityIdByName = async (activityName) => {
    try {
        const query = 'SELECT id FROM tbl_activities WHERE name = ?';
        const [rows] = await pool.query(query, [activityName]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching activity ID!');
    }
};

module.exports = {
    getActivityIdByName
};
