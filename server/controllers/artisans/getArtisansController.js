const pool = require("../../db");
const { getControllerNameById } = require('../../utils/getControllerNameById');

const getArtisans = async (req, res) => {

    try {
        const query = 'SELECT * FROM tbl_artisans';

        const [rows] = await pool.execute(query);

        const artisansCompanyNames = await Promise.all(
            rows.map(async (artisan) => {
                const companyName = await getControllerNameById(artisan.company_id, "tbl_companies", "name");
                const userName = await getControllerNameById(artisan.user_id, "tbl_users", "name_and_family");

                return {
                    ...artisan,
                    company: companyName || null,
                    artisanName: userName || null
                };
            })
        );

        res.status(200).json(artisansCompanyNames);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getArtisans
};