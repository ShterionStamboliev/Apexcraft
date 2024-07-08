const db = require("../../db")
const hashPassword = require("../../utils/hashPassword");

// Edit User
const editUser = async (req, res) => {

    const userId = req.params.id;
    const { name_and_family, username, password, role, status } = req.body;
    const currentUserRole = req.user.role;

    // Constructing the query dynamically
    let query = 'UPDATE tbl_users SET ';
    const queryParams = [];
    try {
        if (name_and_family) {
            if (name_and_family.trim() === '') {
                return res.status(400).send('Name and Family cannot be empty.')
            }
            query += 'name_and_family = ?, ';
            queryParams.push(name_and_family);
        }

        if (username) {
            if (username.trim() === '') {
                return res.status(400).send('Username cannot be empty.')
            }
            // Check for unique username
            const [rows] = await db.execute('SELECT id FROM tbl_users WHERE username = ? AND id != ?', [username, userId])
            if (rows.length > 0) {
                console.log("hi");
                return res.status(400).send('Username is already taken.')
            }

            query += 'username = ?, ';
            queryParams.push(username);
        }

        if (password) {
            // Check if password is not empty.
            if (password.trim() !== '') {
                const hashedPassword = await hashPassword(password);
                query += 'password = ?, ';
                queryParams.push(hashedPassword);
            }
        }
        if (role) {
            // Role change logic
            if (currentUserRole === "admin" && (role === "мениджър" || role === "потребител")) {
                // If the current user is admin, they can change the role to 'manager' or 'user'.
                query += 'role = ?, ';
                queryParams.push(role);
            } else if (currentUserRole === "мениджър" && role === "потребител") {
                // if the current user is manager, they can change the role to 'user'.
                query += 'role = ?, ';
                queryParams.push(role);
            }
            // } else if (currentUserRole === "user") {
            //     // User is not allowed to change role
            //     return res.status(403).send("You are not allowed to change your role.")
            // } else {
            //     // Any other cases are invalid role change requests
            //     return res.status(400).send("Invalid role change request.")
            // }

        }
        if (status) {
            if (status === "активен" || status === "неактивен") {
                query += 'status = ?, ';
                queryParams.push(status);
            }
        }

        //Remove the last comma and space
        query = query.slice(0, -2);
        query += ' WHERE id = ?'
        queryParams.push(userId)

        try {
            const [result] = await db.execute(query, queryParams)
            res.status(200).send('User updated successfully')
        } catch (error) {
            console.error('Database error:', error); // Log the unexpected error for debugging
            res.status(500).send(error);
        }

    } catch (err) {
        console.error('Unexpected error:', err); // Log the unexpected error for debugging
        res.status(500).send('Internal Server Error');
    }

}

module.exports = {
    editUser,
};