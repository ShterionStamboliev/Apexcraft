const db = require('../../db');
const { uniqueChecker } = require('../../utils/uniqueChecker');
const Validator = require('../../validators/controllerValidator');
const { activitySchema } = require('../../validators/validationSchemas');

const createActivity = async (req, res) => {

    const { name, start, end, status } = req.body;
    const validator = new Validator(activitySchema);
    const errors = validator.validate({ name, start, end, status });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {
        const isUnique = await uniqueChecker("name", name, "tbl_activities");

        if (isUnique.length > 0) {
            return res.status(404).send(`${name} already exists!`)
        };

        const query = 'INSERT INTO tbl_activities(name, start, end, status) VALUES(?, ?, ?, ?)';

        const values = [name, start, end, status];

        const [result] = await db.execute(query, values);

        const newActivity = {
            id: result.insertId,
            name,
            start,
            end,
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