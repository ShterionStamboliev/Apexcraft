const db = require("../../db");

const getProjectById = async (req, res) => {

    try {
        const projectId = req.params.id;

        const [rows] = await db.execute('SELECT * FROM tbl_projects WHERE id = ?', [projectId])

        if (rows.length === 0) {
            return res.status(404).send('Project not found!')
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).send('Internal Server Error!');
    }
};

module.exports = {
    getProjectById
};