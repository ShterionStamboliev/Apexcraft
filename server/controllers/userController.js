const pool = require("../db");

const getAssociatedUsers = async (req, res) => {
    try {
        // Get currently logged in user by their ID;
        const currentUserId = req.user.id;

        let query = '';
        let queryParams = [];

        // Filter the associated users to be dispalyed based on privilege of the logged in user.
        // Aadmin can see all, managers can see only associated to them users.

        if (req.user.role === 'мениджър') {
            query = 'SELECT name_and_family, username, status FROM tbl_users WHERE manager = ? AND status = "активен"';
            queryParams = [currentUserId];
        } else if (req.user.role === 'админ') {
            query = 'SELECT name_and_family, username, status FROM tbl_users WHERE status = "активен"';
        }

        const [rows] = await pool.query(query, queryParams);

        const associatedUsers = rows.sort((a, b) => a.username.localeCompare(b.username));
        
        res.json(associatedUsers);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {
    getAssociatedUsers,
};