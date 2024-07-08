const pool = require("../../db");

const updateCompanyStatus = async (req, res) => {
    const companyId = req.params.id;
    const status = req.body.status;
    const query = 'UPDATE tbl_companies SET status=? WHERE id = ?';

    if (Object.values(req.body).some(a => a == '')) {
        const field = Object.entries(req.body).find(([f, v]) => v == '');
        return res.status(400).send(`Field '${field[0]}' is required!`);
    }
    
    try {
        const [rows] = await db.execute(`SELECT status FROM tbl_companies WHERE id = ?`, [companyId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const currentStatus = rows[0].status;
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        await pool.query(query, newStatus);
        res.status(200).send('Company status edited successfully!');
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    updateCompanyStatus
};