const db = require("../../db");

const getActivities = async (req, res) => {

    try {
        const activityId = req.params.id
        const query = 'SELECT * FROM tbl_activities';

        const [rows] = await db.execute(query)

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error!', error });
    }
};

module.exports = {
    getActivities
};