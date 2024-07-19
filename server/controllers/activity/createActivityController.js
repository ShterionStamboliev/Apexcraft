const db = require('../../db');
const Validator = require('../../validators/controllerValidator');
const { activitySchema } = require('../../validators/validationSchemas');

const createActivity = async (req, res) => {

    const { name, status } = req.body;
    const validator = new Validator(activitySchema);
    const errors = validator.validate({ name, status });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {
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