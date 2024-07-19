const db = require('../../db');
const { getCompanyIdByName } = require("../../utils/getCompanyIdByName");
const { getUserIdByName } = require('../../utils/getUserIdByName');

const createArtisan = async (req, res) => {

    const { name, note, company_id, status } = req.body;

    try {

        let companyName = null;

        if (!name || !status) {
            return res.status(400).json({ message: 'Name and Status are required fields!' });
        };

        if (company_id){
            companyName = await getCompanyIdByName(company_id);
        };

        const foundUser = await getUserIdByName(name);
        
        const query = 'INSERT INTO tbl_artisans(name, note, company_id, user_id, status) VALUES(?, ?, ?, ?, ?)';

        const values = [name, note, companyName, foundUser, status];
        

        const [result] = await db.execute(query, values);

        const newArtisan = {
            id: result.insertId,
            name,
            note, 
            company_id,
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