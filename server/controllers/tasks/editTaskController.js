const pool = require("../../db");
const { getActivityIdByName } = require("../../utils/getActivityIdByName");
const { getArtisanIdByName } = require("../../utils/getArtisanIdByName");
const { getMeasureIdByName } = require("../../utils/getMeasureIdByName");
const { getProjectIdByName } = require("../../utils/getProjectIdByName");

const editTask = async (req, res) => {

    const taskId = req.params.id;
    const { project, artisan, activity, measure, pricePerMeasure, totalPrice, totalWork, startDate, endDate, note, status } = req.body;
  
    try {

        const projectId = await getProjectIdByName(project);
        const artisanId = await getArtisanIdByName(artisan);
        const activityId = await getActivityIdByName(activity);
        const measureId = await getMeasureIdByName(measure);
        // const pricePerMeasure = parseFloat(pricePerMeasure);
        // const totalPrice = parseFloat(totalPrice);
        // const totalWork = parseFloat(totalWork);

        const query = `
            UPDATE tbl_tasks
            SET project = ?, artisan = ?, activity = ?, measure = ?, pricePerMeasure = ?, totalPrice = ?, totalWork = ?, startDate = ?, endDate = ?, note = ?, status = ?
            WHERE id = ?
        `;

        const values = [projectId, artisanId, activityId, measureId, pricePerMeasure, totalPrice, totalWork, startDate, endDate, note, status, taskId];

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        const updatedTask = {
            id: taskId,
            projectId,
            artisanId,
            activityId,
            measureId,
            pricePerMeasure,
            totalPrice,
            totalWork,
            startDate,
            endDate,
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
