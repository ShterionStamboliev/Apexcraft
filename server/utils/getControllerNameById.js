const pool = require("../db");

const getControllerNameById = async (id, table) => {
    try {
        const query = `SELECT name FROM ${table} WHERE id = ?`;
        const [rows] = await pool.query(query, [id]);

        if (rows.length > 0) {
            return rows[0].name;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Internal server Error!');
    }
};

module.exports = {
    getControllerNameById
};