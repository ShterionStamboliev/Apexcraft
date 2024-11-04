const pool = require("../../db");

const getUsers = async (req, res) => {
    const { _page = 1, _limit = 10 } = req.query;
    const offset = (parseInt(_page) - 1) * parseInt(_limit);

    const currentUserId = req.user.id;

    try {
        let query = '';
        let queryParams = [];

        const totalQuery = `SELECT COUNT(*) as total FROM tbl_users`;
        const [[{ total }]] = await pool.query(totalQuery);

        if (req.user.role === 'manager') {
            query = `SELECT id, name_and_family, username, role, status FROM tbl_users WHERE manager = ? LIMIT ${parseInt(_limit)} OFFSET ${offset}`;
            queryParams = [currentUserId];
        } else if (req.user.role === 'admin') {
            query = `SELECT id, name_and_family, username, role, status FROM tbl_users LIMIT ${parseInt(_limit)} OFFSET ${offset}`;
        }

        const [rows] = await pool.query(query, queryParams);

        const associatedUsers = rows.sort((a, b) => {
            if (a.status === b.status) {
                return a.username.localeCompare(b.username);
            } else if (a.status === 'active' && b.status !== 'active') {
                return -1;
            } else if (a.status !== 'active' && b.status === 'active') {
                return 1;
            }
            return 0;
        });

        res.status(200).json({
            data: associatedUsers,
            page: parseInt(_page),
            limit: parseInt(_limit),
            total,
            totalPages: Math.ceil(total / parseInt(_limit))
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getUsers,
};