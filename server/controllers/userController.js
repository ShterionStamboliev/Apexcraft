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



module.exports = {
    getAssociatedUsers,
};