const db = require('../../db');

const disableActivity = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.execute(`SELECT status FROM tbl_activities WHERE id = ?`, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const currentStatus = rows[0].status;
        const newStatus = currentStatus === 'активен' ? 'неактивен' : 'активен';

        await db.execute(`UPDATE tbl_activities SET status = ? WHERE id = ?`, [newStatus, id]);

        res.status(200).json({ message: 'Activity status updated successfully' });
    } catch (error) {
        console.error('Error modifying activity status:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = disableActivity;
