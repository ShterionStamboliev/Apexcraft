const db = require('../../db');

const editActivities = async (req, res) => {

    const { activityId, activityName, activityStatus } = req.body;
   
    try {

        if (!activityName || !activityStatus) {
            return res.status(400).json({ message: 'All fields are required!' });
        };

        const query = `
            UPDATE tbl_activities
            SET name = ?, status = ?
            WHERE id = ?;
        `;

        const values = [activityName, activityStatus];

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Activity not found!' });
        };

        const updatedActivity = {
            id: activityId,
            activityName,
            activityStatus,
        };

        res.status(200).json({ message: 'Activity updated successfully!', activity: updatedActivity });

    } catch (error) {
       res.status(500).json({ message: 'Error updating activity!', error });
    }
}

module.exports = {
    editActivities
}