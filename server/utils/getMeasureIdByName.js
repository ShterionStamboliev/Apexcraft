const pool = require("../db");

const getMeasureIdByName = async (measureName) => {
    try {
        const query = 'SELECT id FROM tbl_measures WHERE name = ?';
        const [rows] = await pool.query(query, [measureName]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching measure ID!');
    }
};

module.exports = {
    getMeasureIdByName
};
