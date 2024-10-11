const db = require('../../db');

const getArtisanTasks = async (req, res) => {
    const userId = req.user.id;

    try {

        const [artisanTasks] = await db.query('SELECT * FROM tbl_tasks WHERE artisan_id = ?', [userId]);

        if (!artisanTasks.length) {
            return res.status(404).json({
                message: "No tasks found for this artisan!"
            });
        }

        const taskIds = artisanTasks.map(task => task.id);

        const [workItems] = await db.query(
            `SELECT * FROM tbl_workItems WHERE task_id IN (?)`, [taskIds]
        );

        console.log(workItems);
        
        return res.status(200).json(artisanTasks);

    } catch (error) {
        console.log('Error fetching data', error);
        return res.status(500).json({
            message: 'Internal server error!'
        })
    }
};

module.exports = {
    getArtisanTasks
};