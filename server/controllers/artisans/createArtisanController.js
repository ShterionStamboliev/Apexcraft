const pool = require('../../db');
const { getCompanyIdByName } = require("../../utils/getCompanyIdByName");
const { getUserIdByName } = require('../../utils/getUserIdByName');

const createArtisan = async (req, res) => {

    const { name, note, number, email, company, status } = req.body;
  
    try {
        const foundCompanyId = await getCompanyIdByName(company);
        
        const foundUser = await getUserIdByName(name);
        
        const query = 'INSERT INTO tbl_artisans(name, note, number, email, company_id, user_id, status) VALUES(?, ?, ?, ?, ?, ?, ?)';

        const values = [name, note, number, email, foundCompanyId, foundUser, status];

        const [result] = await pool.execute(query, values);

        const newArtisan = {
            id: result.insertId,
            name,
            note, 
            number, 
            email,
            company,
            foundCompanyId,
            foundUser,
            status,
        };

        res.status(201).json({ message: 'Artisan created successfully!', artisan: newArtisan });
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating the artisan!', error });
    }
};

module.exports = {
    createArtisan
};