const db = require('../db');

const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id
        await db.execute(`UPDATE tbl_users SET status = 'неактивен' WHERE id = ?`, [id])
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = deleteUserController