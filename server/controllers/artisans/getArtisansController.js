const pool = require("../../db");
const { getControllerNameById } = require('../../utils/getControllerNameById');

const getArtisans = async (req, res) => {
    const { _page = 1, _limit = 10 } = req.query;
    const offset = (parseInt(_page) - 1) * parseInt(_limit);

    try {
        const totalQuery = `SELECT COUNT(*) as total FROM tbl_artisans`;
        const [[{ total }]] = await pool.query(totalQuery);

        const query = `SELECT * FROM tbl_artisans LIMIT ${parseInt(_limit)} OFFSET ${offset}`;

        const [rows] = await pool.query(query);

        const artisansCompanyNames = await Promise.all(
            rows.map(async (artisan) => {
                const companyName = await getControllerNameById(artisan.company_id, "tbl_companies", "name");
                const userName = await getControllerNameById(artisan.user_id, "tbl_users", "name_and_family");

                return {
                    ...artisan,
                    company: companyName || null,
                    artisanName: userName || null,
                };
            })
        );

        res.status(200).json({
            data: artisansCompanyNames,
            page: parseInt(_page),
            limit: parseInt(_limit),
            total,
            totalPages: Math.ceil(total / parseInt(_limit))
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getArtisans
};