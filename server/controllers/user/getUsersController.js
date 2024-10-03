const pool = require("../../db");

const getUsers = async (req, res) => {
    const currentUserId = req.user.id;
    
    try {
        let query = '';
        let queryParams = [];

        if (req.user.role === 'manager') {
            query = 'SELECT id, name_and_family, username, role, status FROM tbl_users WHERE manager = ?';
            queryParams = [currentUserId];
        } else if (req.user.role === 'admin') {
            query = 'SELECT id, name_and_family, username, role, status FROM tbl_users';
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
        
        res.json(associatedUsers);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getUsers,
};