const db = require("../../db");

const getMeasures = async (req, res) => {

    try {
        const query = 'SELECT * FROM tbl_measures';

        const [rows] = await db.execute(query)

        res.json(rows)
    } 
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    };
};

module.exports = {
    getMeasures,
};