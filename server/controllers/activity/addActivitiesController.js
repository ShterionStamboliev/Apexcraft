const db = require('../../db')

const addActivities = async (req, res) => {
    try {
        const activityName = req.body.name;
        const activityStatus = req.body.status;

        const query = 'INSERT INTO tbl_activities(name, satus) VALUES(?, ?)'; //check the name of the table

        await db.execute(query, [activityName, activityStatus])

        res.status(201).send('New activity created successfully')

    } catch (error) {
        console.log('Adding new activity failed');
        res.status(500).send(error)
    }
}

module.exports = {
    addActivities
}