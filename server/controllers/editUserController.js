const db = require("../db")
const hashPassword = require("../hashPassword");

const editUser = async (req, res) => {
    const userId = req.params.id;
    const { name_and_family, username, password, role, status } = req.body;

    let query = 'UPDATE tbl_users SET ';
    const queryParams = [];

    if (name_and_family) {
        query += 'name_and_family = ?, ';
        queryParams.push(name_and_family);
    }

    if (username) {
        query += 'username = ?, ';
        queryParams.push(username);
    }
    if (password) {
        const hashedPassword = await hashPassword(password);
        query += 'password = ?, ';
        queryParams.push(hashedPassword);
    }
    if (role) {
        query += 'role = ?, ';
        queryParams.push(role);
    }
    if (status) {
        query += 'status = ?, ';
        queryParams.push(status);
    }

    //Remove the last comma and space
    query = query.slice(0, -2);
    query += ' WHERE id = ?'
    queryParams.push(userId);

    db.execute(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User updated successfully');
    })

}