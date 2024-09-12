const pool = require("../../db");

const getTaskById = async (req, res) => {

    try {
        const taskId = req.params.id;

        const [rows] = await pool.execute('SELECT * FROM tbl_tasks WHERE id = ?', [taskId])

        if (rows.length === 0) {
            return res.status(404).send('Task not found!')
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).send('Internal server Error!');
    }
};

module.exports = {
    getTaskById
};