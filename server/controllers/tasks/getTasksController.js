const pool = require("../../db");
const { getControllerNameById } = require("../../utils/getControllerNameById");

const getTasks = async (req, res) => {

    const projectId = req.params.id;

    try {
        const query = 'SELECT * FROM tbl_tasks WHERE project_id = ?';

        const [rows] = await pool.query(query, [projectId]);

        const activityName = await getControllerNameById(rows[0].activity_id, "tbl_activities");
        const artisanName = await getControllerNameById(rows[0].artisan_id, "tbl_artisans");
        const measureName = await getControllerNameById(rows[0].measure_id, "tbl_measures");

        res.json(rows, activityName, artisanName, measureName);

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getTasks
};