const db = require('../../db');

const modifyCompanyStatus = async (req, res) => {
    try {
        const id = req.params.id
        const [rows] = await db.execute(`SELECT status FROM tbl_companies WHERE id = ?`, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Company not found!' });
        }

        const currentStatus = rows[0].status;
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

        await db.execute(`UPDATE tbl_companies SET status = ? WHERE id = ?`, [newStatus, id])

        res.status(200).json({ message: 'Company status updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error!' });
    };
};

module.exports = {
    modifyCompanyStatus
};