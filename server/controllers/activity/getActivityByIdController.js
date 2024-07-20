const db = require("../../db");

const getActivityById = async (req, res) => {
    const activityId = req.params.id;

    try {
        const [rows] = await db.execute('SELECT * FROM tbl_activities WHERE id = ?', [activityId])

        if (rows.length === 0) {
            return res.status(404).send('Activity not found!')
        }

        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error!' });
    }
};

module.exports = {
    getActivityById
};