const pool = require("../../db");

const getActivities = async (req, res) => {

    try {
        const query = `
            SELECT id, name, status
            FROM tbl_activities
        `;

        const [rows] = await pool.execute(query)
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getActivities
};