// utils/getCompanyIdByName.js
const pool = require("../db");

const getCompanyIdByName = async (companyName) => {
    try {
        const query = 'SELECT id FROM tbl_companies WHERE company_name = ?';
        const [rows] = await pool.query(query, [companyName]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching company ID');
    }
};

module.exports = {
    getCompanyIdByName
};
