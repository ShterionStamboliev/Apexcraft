const pool = require('../../db');

const createWorkItem = async (req, res) => {

    const taskId = req.params.task_id;
    const { startDate, endDate, note, finishedWork, status } = req.body;

    try { 

        const query = 'INSERT INTO tbl_workItems(task_id, start_date, end_date, note, finished_work, status) VALUES(?, ?, ?, ?, ?, ?)';

        const values = [taskId, startDate, endDate, note, finishedWork, status];

        const [result] = await pool.execute(query, values);

        const newWorkItem = {
            id: result.insertId,
            taskId,
            startDate,
            endDate,
            note,
            finishedWork,
            status
        };

        res.status(201).json({ message: 'Work item created successfully!', workItem: newWorkItem });
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating the work item!', error });
    }
};

module.exports = {
    createWorkItem
};