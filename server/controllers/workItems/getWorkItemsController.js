const pool = require("../../db");

const getWorkItems = async (req, res) => {

    try {
        const query = 'SELECT * FROM tbl_workItems';

        const [rows] = await pool.query(query)

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getWorkItems
};