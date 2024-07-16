const pool = require('../db');

async function getUserIdByName(name){

    try {
        const query = 'SELECT id FROM tbl_users WHERE name_and_family = ?';
        const [rows] = await pool.query(query, [name]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching User ID!');
    }
}

module.exports = {
    getUserIdByName
}