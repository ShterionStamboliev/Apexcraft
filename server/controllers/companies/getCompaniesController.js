const pool = require("../../db");

const getCompanies = async (req, res) => {
    const { _page = 1, _limit = 10 } = req.query;
    const offset = (parseInt(_page) - 1) * parseInt(_limit);

    try {
        const totalQuery = `SELECT COUNT(*) as total FROM tbl_companies`;
        const [[{ total }]] = await pool.query(totalQuery);

        const query = `SELECT * FROM tbl_companies LIMIT ${parseInt(_limit)} OFFSET ${offset}`;

        const [rows] = await pool.query(query)

        res.json({
            data: rows,
            page: parseInt(_page),
            limit: parseInt(_limit),
            total,
            totalPages: Math.ceil(total / parseInt(_limit))
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getCompanies
};