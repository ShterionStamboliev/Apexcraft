const db = require('../../db')

const createMeasure = async (req, res) => {

    const measureName = req.body.name;

    try {

        if (!measureName) {
            return res.status(400).json({ message: 'Name is required!' });
        };

        const query = 'INSERT INTO tbl_measures(name) VALUES(?)';

        const values = [measureName];

        const [result] = await db.execute(query, values);

        const newMeasure = {
            id: result.insertId,
            measureName
        };

        res.status(201).json({ message: 'Measure created successfully!', measure: newMeasure  });

    } catch (error) {
        res.status(500).json({ message: 'Error creating the measure!', error });
    };
};

module.exports = {
    createMeasure
};