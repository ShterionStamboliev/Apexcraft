const pool = require("../../db");

const getOneActivity = async (req, res) => {

    try {
        const query = 'SELECT name FROM tbl_activities WHERE id=?';

        const activity = await pool.query(query)

        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getOneActivity
};