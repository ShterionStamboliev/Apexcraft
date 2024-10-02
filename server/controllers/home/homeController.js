const pool = require('../../db');


const homePage = async (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        const [user] = await pool.execute('SELECT id, name_and_family, username, role, status, manager FROM tbl_users WHERE id = ?', [userId])

        const [artisan] = await pool.execute('SELECT * FROM tbl_artisans WHERE user_id =?', [userId]);

        const artisanId = artisan[0].id;
        const [assignedTasks] = await pool.execute('SELECT * FROM tbl_tasks WHERE artisan_id = ?', [artisanId]);

    }
    catch {
        
    }

};

module.exports = {
    homePage
};