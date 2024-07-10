const db = require('../../db');

const editArtisan = async (req, res) => {

    const userId = req.params.id;
    const { name, note, company_id, user_id, status } = req.body;

    // Constructing the query dynamically
    let query = 'UPDATE tbl_artisans SET ';
    let queryParams = [];

    //Validate company and user
    if (company_id === null || company_id === undefined) {
        return res.status(400).send('Invalid or missing company');
    }
    if (user_id === null || user_id === undefined) {
        return res.status(400).send('Invalid or missing user');
    }

    try {
        if (name) {
            //Check if Artisan exists
            const [artisanRow] = await db.execute('SELECT * FROM tbl_artisans WHERE id = ?', [userId]);
            if (artisanRow.length === 0) {
                return res.status(404).send('Artisan not found.');
            }
            query += 'name = ?, ';
            queryParams.push(name);
        }
        if (note) {
            query += 'note = ?, ';
            queryParams.push(note);
        }
        if (company_id) {
            //Check if company exists
            if (company_id !== null && company_id !== undefined) {
                const [companyRows] = await db.execute('SELECT 1 FROM tbl_companies WHERE id = ?', [company_id]);
                if (companyRows.length === 0) {
                    return res.status(404).send('Company not found!');
                }
            }
            query += 'company_id = ?, ';
            queryParams.push(company_id);
        }
        if (user_id) {
            //Check if user exists
            if (user_id !== null && user_id !== undefined) {
                const [userRows] = await db.execute('SELECT 1 FROM tbl_users WHERE id = ?', [user_id]);
                if (userRows.length === 0) {
                    return res.status(404).send('User not found!');
                }
            }
            query += 'user_id = ?, ';
            queryParams.push(user_id);
        }
        if (status) {
            query += 'status = ?, ';
            queryParams.push(status);
        }

        //Remove the last comma and space
        query = query.slice(0, -2);
        query += ' WHERE id = ?'
        queryParams.push(userId)


        const [result] = await db.execute(query, queryParams)
        res.status(200).send('User updated successfully')
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send(error);
    }
};

module.exports = {
    editArtisan
};