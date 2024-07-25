const db = require("../../db");

async function getCurrentActivity(activityId){

    try {
        const [rows] = await db.execute('SELECT * FROM tbl_activities WHERE id = ?', [activityId])

        return rows[0];
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error!' });
    }
};

module.exports = {
    getCurrentActivity
};