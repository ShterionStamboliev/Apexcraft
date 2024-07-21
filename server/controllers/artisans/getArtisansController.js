const db = require("../../db");

const getArtisans = async (req, res) => {

    try {
        const query = 'SELECT * FROM tbl_artisans';

        const [rows] = await db.execute(query);

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal erver error!', error });
    }
};

module.exports = {
    getArtisans
};