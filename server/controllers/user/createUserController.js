const hashPassword = require('../../utils/hashPassword');
const db = require("../../db")


const createUser = async (req, res) => {
    const { name, username, password, status, role } = req.body;
    const loggedUserId = req.user.id;

    try {
        
        // Validate input
        // Additional validation will be added at a later point
        if (!name || !username || !password || !status || !role ) {
            return res.status(400).json({ message: 'All fields are required!' });
        };

        if (password.length < 6){
            return res.status(400).json({ message: "Password is too short!"})
        }

        // Manager should only be able to create users and not admin or other managers.
        
        if (req.user.role === 'manager' && role !== 'user') {
            return res.status(403).json({ message: 'Managers can only create users with role user' });
        };

        const hashedPassword = await hashPassword(password);

        const query = `
        INSERT INTO tbl_users (name_and_family, username, password, role, status, manager)
        VALUES (?, ?, ?, ?, ?, ?);
        `;

        const values = [name, username, hashedPassword, role, status, loggedUserId];

        const [result] = await db.query(query, values);

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
    createUser
};