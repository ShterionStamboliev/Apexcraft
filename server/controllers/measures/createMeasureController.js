const pool = require('../../db');
const Validator = require('../../validators/controllerValidator');
const { measureSchema } = require('../../validators/validationSchemas');

const createMeasure = async (req, res) => {

    const name = req.body.name;
    const validator = new Validator(measureSchema);
    const errors = validator.validate({ name });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {

        const query = 'INSERT INTO tbl_measures(name) VALUES(?)';

        const values = [name];

        const [result] = await pool.execute(query, values);

        const newMeasure = {
            id: result.insertId,
            name
        };

        res.status(201).json({ message: 'Measure created successfully!', measure: newMeasure });

    } catch (error) {
        res.status(500).json({ message: 'Error creating the measure!', error });
    };
};

module.exports = {
    createMeasure
};