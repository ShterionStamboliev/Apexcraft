const pool = require("../../db");

const getPaginatedActivities = async (req, res) => {
    const { _page = 1, _limit = 10 } = req.query;
    const offset = (parseInt(_page) - 1) * parseInt(_limit);

    try {
        const totalQuery = `SELECT COUNT(*) as total FROM tbl_activities`;
        const [[{ total }]] = await pool.query(totalQuery);

        const query = `
            SELECT id, name, status
            FROM tbl_activities
            LIMIT ? OFFSET ?
        `;

        const [rows] = await pool.query(query, [parseInt(_limit), offset]);

        res.json({
            data: rows,
            total,
            page: parseInt(_page),
            limit: parseInt(_limit),
            totalPages: Math.ceil(total / parseInt(_limit))
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

const getActivities = async (req, res) => {

    try {
        const query = 'SELECT * FROM tbl_activities';

        const [rows] = await pool.execute(query)

        res.json(rows)
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    };
};

module.exports = {
    getPaginatedActivities,
    getActivities
};