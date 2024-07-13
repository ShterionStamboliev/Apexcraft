const db = require('../../db')

const createActivity = async (req, res) => {

    const { name, status } = req.body;

    try {

        if (!name || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        const query = 'INSERT INTO tbl_activities(name, status) VALUES(?, ?)';

        const values = [name, status];

        const [result] = await db.execute(query, values);

        const newActivity = {
            id: result.insertId,
            name,
            status,
        };

        res.status(201).json({ message: 'Activity created successfully!', activity: newActivity });

    } catch (error) {
        res.status(500).json({ message: 'Error creating the activity!', error });
    }
};

module.exports = {
    createActivity
};