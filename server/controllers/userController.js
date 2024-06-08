const hashPassword = require('../utils/hashPassword');
const bcrypt = require('bcrypt');


const pool = require("../db");

const getAssociatedUsers = async (req, res) => {
    try {
        // Get currently logged in user by their ID;
        const currentUserId = req.user.id;

        // Filter the associated users to be dispalyed based on privilege of the logged in user.
        // Aadmin can see all, managers can see only associated to them users.

        let associatedUsers;
        res.json(associatedUsers);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const createUser = async (req, res) => {
    const { name, username, password, status, role } = req.body;
    const loggedUserId = req.user.id;
    const logedUserRole = req.user.role;

    // If a logged in user is with role user, should they shouldn't be able to access /create
    if (logedUserRole === 'потребител') {
        res.redirect('/users');
    }

    try {
        // Validate input
        // Additional validation will be added at a later point
        if (!name || !username || !password || !status || !role ) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        // Manager should only be able to create users and not admin or other managers.
        
        if (req.user.role === 'мениджър' && role !== 'потребител') {
            return res.status(403).json({ message: 'Managers can only create users with role user' });
        };

        const hashedPassword = await hashPassword(password);

        const query = `
        INSERT INTO tbl_users (name_and_family, username, password, role, status, manager)
        VALUES (?, ?, ?, ?, ?, ?);
        `;

        const values = [name, username, hashedPassword, role, status, loggedUserId];

        const [result] = await pool.query(query, values);

        const newUser = {
            id: result.insertId,
            name,
            username,
            password,
            role,
            status,
            manager_id: loggedUserId
        };

        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

module.exports = {
    getAssociatedUsers,
    createUser
};