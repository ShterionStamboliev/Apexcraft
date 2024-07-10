const db = require('../../db')

const addActivities = async (req, res) => {

    const { activityName, activityStatus } = req.body;

    try {

        if (!activityName || !activityStatus) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        const query = 'INSERT INTO tbl_activities(name, satus) VALUES(?, ?)';

        const values = [activityName, activityStatus];

        const [result] = await db.execute(query, values);

        const newActivity = {
            id: result.insertId,
            activityName,
            activityStatus,
        };

        res.status(201).json({ message: 'Activity created successfully!', activity: newActivity  });

    } catch (error) {
        res.status(500).json({ message: 'Error creating the activity!', error });
    }
};

module.exports = {
    addActivities
};