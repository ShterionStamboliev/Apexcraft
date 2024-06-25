const db = require('../../db');

const editActivities = async (req, res) => {

    const activityId = req.params.id;
    const newName = req.body.name;

    if (!newName) {
        return res.status(400).send('Name is required')
    }

    const query = 'UPDATE tbl_activities SET name = ? WHERE ID = ?';

    try {
        await db.execute(query, [newName, activityId])
        res.status(200).send('Measure updated successfully')
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send(error);
    }
}

module.exports = {
    editActivities
}