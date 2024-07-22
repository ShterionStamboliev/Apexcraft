const pool = require("../../db");
const { getCompanyNameById } = require("../../utils/getCompanyNameById");

const getArtisanById = async (req, res) => {

    try {
        const artisanId = req.params.id;

        const [rows] = await pool.execute('SELECT * FROM tbl_artisans WHERE id = ?', [artisanId]);

        const company = await getCompanyNameById(rows[0].company_id);

        if (rows.length === 0) {
            return res.status(404).send('Artisan not found!')
        };
        
        rows[0].company = company;

        res.json(rows[0])
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getArtisanById
};