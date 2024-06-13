const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

// Generate JWT token
const generateToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// Login function
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Retrieve user from the database
        const [rows] = await db.execute('SELECT * FROM tbl_users WHERE username = ? AND status = "активен"', [username]);

        // Check if user exists
        if (!rows || rows.length === 0) {
            console.log('No user found with the provided username');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = rows[0];

        // Verify password 
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log('Password does not match for the provided username');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = generateToken(user);
        console.log('Login successful, token generated');

        // Send token in response
        res.status(200).json({ token, user: user.username, role: user.role });

    } catch (error) {
        console.error('Error authenticating user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//TO DO Logout
const logout = (req, res) => {

}

module.exports = {
    login,
    logout
};