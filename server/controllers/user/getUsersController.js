const pool = require("../../db");

const getUsers = async (req, res) => {
    const { _page = 1, _limit = 10, q = '' } = req.query; // Added 'q' for search functionality
    const offset = (parseInt(_page) - 1) * parseInt(_limit);
    const searchTerm = q ? `%${q}%` : null;

    const currentUserId = req.user.id;

    try {
        let totalQuery = `SELECT COUNT(*) as total FROM tbl_users`;
        let totalQueryParams = [];
        let query = `SELECT id, name_and_family, username, role, status FROM tbl_users`;
        let queryParams = [];

        // Applying search and role-based filters
        if (req.user.role === 'manager') {
            totalQuery += ` WHERE manager = ?`;
            query += ` WHERE manager = ?`;
            totalQueryParams.push(currentUserId);
            queryParams.push(currentUserId);

            if (q) {
                totalQuery += ` AND (name_and_family LIKE ? OR username LIKE ?)`;
                query += ` AND (name_and_family LIKE ? OR username LIKE ?)`;
                totalQueryParams.push(searchTerm, searchTerm);
                queryParams.push(searchTerm, searchTerm);
            }
        } else if (req.user.role === 'admin') {
            if (q) {
                totalQuery += ` WHERE name_and_family LIKE ? OR username LIKE ?`;
                query += ` WHERE name_and_family LIKE ? OR username LIKE ?`;
                totalQueryParams.push(searchTerm, searchTerm);
                queryParams.push(searchTerm, searchTerm);
            }
        }

        query += ` LIMIT ? OFFSET ?`;
        queryParams.push(parseInt(_limit), offset);

        // Fetching total count and paginated data
        const [[{ total }]] = await pool.query(totalQuery, totalQueryParams);
        const [rows] = await pool.query(query, queryParams);

        // Sorting rows based on status and username
        const sortedRows = rows.sort((a, b) => {
            if (a.status === b.status) {
                return a.username.localeCompare(b.username);
            }
            return a.status === 'active' ? -1 : 1;
        });

        // Returning response
        res.status(200).json({
            data: sortedRows,
            total,
            page: parseInt(_page),
            limit: parseInt(_limit),
            totalPages: Math.ceil(total / parseInt(_limit))
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    getUsers,
};
