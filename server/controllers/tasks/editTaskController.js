const pool = require("../../db");
const { getActivityIdByName } = require("../../utils/getActivityIdByName");
const { getArtisanIdByName } = require("../../utils/getArtisanIdByName");
const { getMeasureIdByName } = require("../../utils/getMeasureIdByName");
const { getProjectIdByName } = require("../../utils/getProjectIdByName");
const { getCurrentId } = require('../../utils/getCurrentId');
const { uniqueChecker } = require('../../utils/uniqueChecker');

const editTask = async (req, res) => {
    const taskId = req.params.taskId;
    
    const { name, price_per_measure, total_price, total_work_in_selected_measure, start_date, end_date, note, status } = req.body;
    
    try {
        const activity = await getCurrentId("tbl_tasks", taskId);

        if (activity.name !== name) {
            const isUnique = await uniqueChecker("name", name, "tbl_tasks");

            if (isUnique.length > 0) {
                return res.status(404).send(`${name} already exists!`)
            };
        };

        // const projectId = await getProjectIdByName(project);
        // const artisanId = await getArtisanIdByName(artisan);
        // const activityId = await getActivityIdByName(activity);
        // const measureId = await getMeasureIdByName(measure);

        const query = `
            UPDATE tbl_tasks
            SET name = ?, price_per_measure = ?, total_price = ?, total_work_in_selected_measure = ?, start_date = ?, end_date = ?, note = ?, status = ?
            WHERE id = ?
        `;

        const values = [name, price_per_measure, total_price, total_work_in_selected_measure, start_date, end_date, note, status, taskId];

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        const updatedTask = {
            id: taskId,
            name,
            // projectId,
            // artisanId,
            // activityId,
            // measureId,
            price_per_measure,
            total_price,
            total_work_in_selected_measure,
            start_date,
            end_date,
            note,
            status
        };

        res.status(200).json({ message: 'Task updated successfully!', project: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the task!', error });
    }
};

module.exports = {
    editTask
};
