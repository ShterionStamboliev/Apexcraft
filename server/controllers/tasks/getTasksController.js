const pool = require("../../db");

const getTasks = async (req, res) => {

    try {
        const query = 'SELECT * FROM tbl_tasks';

        const [rows] = await pool.query(query)

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getTasks
};