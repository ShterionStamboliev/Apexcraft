const db = require('../../db');

const editActivity = async (req, res) => {

    const activityId = req.params.id;
    const { name, status } = req.body;

    try {

        if (!name || !status) {
            return res.status(400).json({ message: 'All fields are required!' });
        };

        const query = `UPDATE tbl_activities SET name = ?, status = ? WHERE id = ?`;

        const values = [name, status, activityId];

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Activity not found!' });
        };

        const updatedActivity = {
            id: activityId,
            name,
            status,
        };

        res.status(200).json({ message: 'Activity updated successfully!', activity: updatedActivity });

    } catch (error) {
        console.log('DB error', error);
        res.status(500).json({ message: 'Error updating activity!', error });
    }
}

module.exports = {
    editActivity
}