const pool = require("../../db");

const getTasks = async (req, res) => {

    const projectId = req.params.id;

    try {
        const query = 'SELECT * FROM tbl_tasks WHERE project_id = ?';

        const [rows] = await pool.query(query, [projectId]);

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getTasks
};