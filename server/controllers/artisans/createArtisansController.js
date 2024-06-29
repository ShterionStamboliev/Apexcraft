const db = require('../../db');

const createArtisans = async (req, res) => {

    const { id, name, note, company_id, user_id, status } = req.body;
    // Required fields
    if (!name || !status) {
        return res.status(400).send('Name and status are required!')
    }

    try {
        //Check if company exists
        if (company_id !== null && company_id !== undefined) {
            const [companyRows] = await db.execute('SELECT 1 FROM tbl_companies WHERE id = ?', [company_id]);
            if (companyRows.length === 0) {
                return res.status(404).send('Company not found!');
            }
        }
        //Check if user exists
        if (user_id !== null && user_id !== undefined) {
            const [userRows] = await db.execute('SELECT 1 FROM tbl_users WHERE id = ?', [user_id]);
            if (userRows.length === 0) {
                return res.status(404).send('User not found!');
            }
        }
        //Insert into the table
        const [result] = await db.execute('INSERT into tbl_artisans (name, note, company_id, user_id, status) VALUES(?, ?, ?, ?, ?)',
            [name, note, company_id, user_id, status]
        );
        //Respond
        res.status(201).send('Artisan added successfully')

    } catch (error) {
        console.error('Error adding artisan:', error.message)
        res.status(500).send('Internal server error')
    }


}
module.exports = { createArtisans }