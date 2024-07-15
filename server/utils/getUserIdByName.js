const pool = require('../db');

async function getUserIdByName(name){

    const result = await db.execute('SELECT id FROM tbl_users WHERE name_and_family = ?', [name])

    return result;
}

module.exports = {
    getUserIdByName
}