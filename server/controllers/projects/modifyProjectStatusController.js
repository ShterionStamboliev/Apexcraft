const pool = require('../../db');

const modifyProjectStatus = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await pool.execute(`SELECT status FROM tbl_projects WHERE id = ?`, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found!' });
        }

        const currentStatus = rows[0].status;
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

        await db.execute(`UPDATE tbl_projects SET status = ? WHERE id = ?`, [newStatus, id])

        res.status(200).json({ message: 'Project status updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error!' });
    };
};

module.exports = {
    modifyProjectStatus
};
