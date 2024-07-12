const db = require('../../db')

const createMeasure = async (req, res) => {
    try {
        const measureName = req.body.name;

        if (!measureName) {
            return res.status(400).send('Name is required')
        };

        const query = 'INSERT INTO tbl_measures(name) VALUES(?)';

        await db.execute(query, [measureName])

        res.status(201).send('Measure created successfully')

    } catch (error) {
        res.status(500).json({ message: 'Error creating the measure!', error });
    };

};

module.exports = {
    createMeasure
};