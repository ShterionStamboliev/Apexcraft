const db = require('../../db');
const { getTaskIdByName } = require('../../utils/getTaskIdByName');

const createWorkItem = async (req, res) => {

    const taskId = req.params.task_id;
    const { startDate, endDate, note, finishedWork, status } = req.body;

    try { 

        const query = 'INSERT INTO tbl_workItems(task_id, start_date, end_date, note, finished_work, status) VALUES(?, ?, ?, ?, ?, ?)';

        const values = [taskId, startDate, endDate, note, finishedWork, status];

        const [result] = await db.execute(query, values);

        const newWorkItem = {
            id: result.insertId,
            taskId,
            startDate,
            endDate,
            note,
            finishedWork,
            status
        };

        res.status(201).json({ message: 'Task created successfully!', workItem: newWorkItem });
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating the task!', error });
    }
};

module.exports = {
    createWorkItem
};