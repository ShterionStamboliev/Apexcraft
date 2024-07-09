const pool = require("../../db");

const getOneActivity = async (req, res) => {

    try {
        const activityId = req.params.id;

        const [rows] = await db.execute('SELECT * FROM tbl_activities WHERE id = ?', [activityId])

        if (rows.length === 0) {
            return res.status(404).send('Activity not found.')
        }

        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getOneActivity
};