const db = require("../../db");

const getArtisanById = async (req, res) => {

    try {
        const artisanId = req.params.id;

        const [rows] = await pool.execute('SELECT * FROM tbl_artisans WHERE id = ?', [artisanId])

        if (rows.length === 0) {
            return res.status(404).send('Artisan not found!')
        }

        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error!', error });
    }
};

module.exports = {
    getArtisanById
};