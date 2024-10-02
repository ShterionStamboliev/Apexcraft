const pool = require("../../db");

const getWorkItems = async (req, res) => {
    const { task_id } = req.params;
    const { _page = 1, _limit = 5 } = req.query;

    const offset = (_page - 1) * _limit;

    try {
        const query = `
            SELECT * FROM tbl_workItems 
            WHERE task_id = ?
            LIMIT ? OFFSET ?
        `;

        const [rows] = await pool.query(query, [task_id, parseInt(_limit), offset]);

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getWorkItems
};