const db = require("../../db");

const getActivities = async (req, res) => {

    try {
        const query = `
            SELECT id, name, status, 
            DATE_FORMAT(dateFrom, '%Y-%m-%d') as dateFrom, 
            DATE_FORMAT(dateTo, '%Y-%m-%d') as dateTo 
            FROM tbl_activities
        `;

        const [rows] = await db.execute(query)
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getActivities
};