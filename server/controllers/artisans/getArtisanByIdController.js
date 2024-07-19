const pool = require("../../db");
const { getCompanyNameById } = require("../../utils/getCompanyNameById");

const getArtisanById = async (req, res) => {

    try {
        const artisanId = req.params.id;

        const [rows] = await pool.execute('SELECT * FROM tbl_artisans WHERE id = ?', [artisanId]);

        const companyName = await getCompanyNameById(rows[0].company_id);

        if (rows.length === 0) {
            return res.status(404).send('Artisan not found!')
        };
        
        rows[0].companyName = companyName;

        // const artisanInfo = {
        //     id: artisanId,
        //     name: rows[0].name,
        //     note: rows[0].note,
        //     company: rows[0].company_id,
        //     foundCompany: companyName,
        //     status: rows[0].status,
        // };

        res.json([rows[0]])
    }
    catch (error) {
        res.status(500).json({ message: 'Server error!', error });
    }
};

module.exports = {
    getArtisanById
};