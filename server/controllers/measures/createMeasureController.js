const db = require('../../db')

const createMeasure = async (req, res) => {
    try {
        const measureName = req.body.name;

        if (!measureName) {
            return res.status(400).send('Name is required')
        }

        const query = 'INSERT INTO tbl_measure(name) VALUES(?)'; //check the name of the table

        await db.execute(query, [measureName])

        res.status(201).send('Measure created successfully')

    } catch (error) {
        console.log('Adding measure failed');
        res.status(500).send(error)
    }
};

module.exports = {
    createMeasure
};