const db = require('../../db');

const deactivateUserController = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await db.execute(`SELECT status FROM tbl_users WHERE id = ?`, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const currentStatus = rows[0].status;
        const newStatus = currentStatus === 'активен' ? 'неактивен' : 'активен';

        await db.execute(`UPDATE tbl_users SET status = ? WHERE id = ?`, [newStatus, id])

        res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
        console.error('Error modifying user status:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = deactivateUserController

