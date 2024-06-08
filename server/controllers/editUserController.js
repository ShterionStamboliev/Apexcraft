const db = require("../db")
const hashPassword = require("../hashPassword");

const editUser = async (req, res) => {

    const userId = req.params.id;
    const { name_and_family, username, password, role, status } = req.body;

    const currentUserRole = req.user.role;

    //Constructing the query dynamically
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
        // Role change logic
        if (currentUserRole === "admin" && (role === "manager" || role === "user")) {
            // If the current user is admin, they can change the role to 'manager' or 'user'.
            query += 'role = ?, ';
            queryParams.push(role);
        } else if (currentUserRole === "manager" && role === "user") {
            // if the current user is manager, they can change the role to 'user'.
            query += 'role = ?, ';
            queryParams.push(role);
        } else if (currentUserRole === "user") {
            // User is not allowed to change role
            return res.status(403).send("You are not allowed to change your role.")
        } else {
            // Any other cases are invalid role change requests
            return res.status(400).send("Invalid role change request.")
        }

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
module.exports = editUser;