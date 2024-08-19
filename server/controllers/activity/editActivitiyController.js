const db = require('../../db');
const { uniqueChecker } = require('../../utils/uniqueChecker');
const Validator = require('../../validators/controllerValidator');
const { activitySchema } = require('../../validators/validationSchemas');
const { getCurrentActivity } = require('./getCurrentActivity');

const editActivity = async (req, res) => {

    const activityId = req.params.id;
    const { name, status } = req.body;
    const validator = new Validator(activitySchema);
    const errors = validator.validate({ name, status });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {
        const activity = await getCurrentActivity(activityId);

        if (activity.name !== name) {
            const isUnique = await uniqueChecker("name", name, "tbl_activities");

            if (isUnique.length > 0) {
                return res.status(404).send(`${name} already exists!`)
            };
        }

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
        res.status(500).json({ message: 'Error updating the activity!', error });
    }
}

module.exports = {
    editActivity
}