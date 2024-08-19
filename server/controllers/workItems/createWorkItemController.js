const db = require('../../db');
const { getTaskIdByName } = require('../../utils/getTaskIdByName');

const createWorkItem = async (req, res) => {

    const taskId = req.params.task_id;
    const { finished, status } = req.body;

    try { 

        const query = 'INSERT INTO tbl_workItems(task_id, finished, status) VALUES(?, ?, ?)';

        const values = [taskId, finished, status];
        

        const [result] = await db.execute(query, values);

        const newWorkItem = {
            id: result.insertId,
            taskId,
            finished,
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