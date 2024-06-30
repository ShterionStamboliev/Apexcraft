const pool = require("../db");

const getCompanyNameById = async (companyId) => {
    try {
        const query = 'SELECT company_name FROM tbl_companies WHERE id = ?';
        const [rows] = await pool.query(query, [companyId]);

        if (rows.length > 0) {
            return rows[0].company_name;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching company name');
    }
};

module.exports = {
    getCompanyNameById
};