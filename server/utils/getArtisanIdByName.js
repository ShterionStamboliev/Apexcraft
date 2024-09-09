const pool = require("../db");

const getArtisanIdByName = async (artisanName) => {
    try {
        const query = 'SELECT id FROM tbl_artisans WHERE name = ?';
        const [rows] = await pool.query(query, [artisanName]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching artisan ID!');
    }
};

module.exports = {
    getArtisanIdByName
};
