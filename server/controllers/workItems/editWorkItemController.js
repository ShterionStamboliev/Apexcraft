const pool = require("../../db");

const editWorkItem = async (req, res) => {

    const workItemId = req.params.id;
    const taskId = req.params.task_id;
    const { startDate, endDate, note, finishedWork, status } = req.body;

    try {

        const query = `
            UPDATE tbl_workItems
            SET task_id = ?, start_date = ?, end_date = ?, note = ?, finished_work = ?, status = ?
            WHERE id = ?
        `;

        const values = [taskId, startDate, endDate, note, finishedWork, status];

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Work item not found!' });
        }

        const updatedWorkItem = {
            id: workItemId,
            taskId,
            startDate,
            endDate,
            note,
            finishedWork,
            status
        };

        res.status(200).json({ message: 'Work item updated successfully!', project: updatedWorkItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the work item!', error });
    }
};

module.exports = {
    editWorkItem
};
