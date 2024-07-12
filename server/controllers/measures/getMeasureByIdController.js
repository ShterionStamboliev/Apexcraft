const db = require("../../db");

const getMeasureById = async (req, res) => {

    try {
        const measureId = req.params.id;

        const [rows] = await db.execute('SELECT * FROM tbl_measures WHERE id = ?', [measureId])

        if (rows.length === 0) {
            return res.status(404).send('Measure not found.')
        }

        res.json(rows[0])
    } 
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getMeasureById,
};