const db = require('../../db')

const addMeasure = async (req, res) => {
    try {
        const measureName = req.body.name;
        const measureStatus = req.body.status;

        const query = 'INSERT INTO tbl_measure(name, satus) VALUES(?, ?)'; //check the name of the table

        await db.execute(query, [measureName, measureStatus])

        res.status(201).send('Measure created successfully')

    } catch (error) {
        console.log('Adding measure failed');
        res.status(500).send(error)
    }
}

module.exports = {
    addMeasure
}