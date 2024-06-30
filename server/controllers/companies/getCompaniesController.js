const pool = require("../../db");

const getCompanies = async (req, res) => {

    try {
        const query = 'SELECT name, number, adress, mol, email, phone, dds, status FROM tbl_companies';

        const [rows] = await pool.query(query)

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getCompanies
};