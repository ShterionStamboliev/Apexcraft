const pool = require("../../db");

const getActivities = async (req, res) => {

    try {
        const query = 'SELECT ID, name FROM tbl_activities';

        const [rows] = await pool.query(query)

        let sortedActivities = rows.sort((a,b) => a.id - b.id)

        res.json(sortedActivities);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error!', error });
    }
};

module.exports = {
    getActivities
};