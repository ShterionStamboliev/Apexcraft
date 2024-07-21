const db = require("../../db");
const Validator = require('../../validators/controllerValidator');
const { measureSchema } = require('../../validators/validationSchemas');

const editMeasure = async (req, res) => {

    const measureId = req.params.id;
    const name = req.body.name;
    const validator = new Validator(measureSchema);
    const errors = validator.validate({ name });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {

        const query = 'UPDATE tbl_measures SET name = ? WHERE ID = ?';

        const values = [name, measureId];

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Measure not found!' });
        };

        const updatedMeasure = {
            id: measureId,
            name
        };

        res.status(200).json({ message: 'Measure updated successfully!', measure: updatedMeasure });

    } catch (error) {
        res.status(500).json({ message: 'Error updating the measure!', error });
    };
};

module.exports = {
    editMeasure
};