const pool = require("../../db");
const { getControllerNameById } = require("../../utils/getControllerNameById");

const getTasks = async (req, res) => {

    const projectId = req.params.id;

    try {
        const query = 'SELECT * FROM tbl_tasks WHERE project_id = ?';

        const [rows] = await pool.query(query, [projectId]);

        // const tasksWithNames = await Promise.all(
        //     rows.map(async (task) => {
        //         const activityName = await getControllerNameById(task.activity_id, "tbl_activities");
        //         const artisanName = await getControllerNameById(task.artisan_id, "tbl_artisans");
        //         const measureName = await getControllerNameById(task.measure_id, "tbl_measures");

        //         return {
        //             ...task,
        //             activityName,
        //             artisanName,
        //             measureName,
        //         };
        //     })
        // );

        // res.json(tasksWithNames);
        // console.log(tasksWithNames);
        
        // const activityName = await getControllerNameById(rows[0].activity_id, "tbl_activities");
        // const artisanName = await getControllerNameById(rows[0].artisan_id, "tbl_artisans");
        // const measureName = await getControllerNameById(rows[0].measure_id, "tbl_measures");

        res.json(rows);

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!', error });
    }
};

module.exports = {
    getTasks
};