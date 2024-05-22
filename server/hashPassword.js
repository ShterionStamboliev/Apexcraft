const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed Password:', hashedPassword);
    } catch (error) {
        console.error('Error hashing password:', error);
    }
};

const plainPassword = 'password';

hashPassword(plainPassword);