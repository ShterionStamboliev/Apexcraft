const db = require('../../db');
const { getCompanyIdByName } = require('../../utils/getCompanyIdByName');
const { getUserIdByName } = require('../../utils/getUserIdByName');

const editArtisan = async (req, res) => {

    const userId = req.params.id;
    const { name, note, company, user, status } = req.body;

    try {

        if (!name || !status) {
            return res.status(400).json({ message: 'Name and Status are required fields!' });
        };

        const query = `UPDATE tbl_artisans
        SET name = ?, note = ?, company = ?, user = ?, status = ?
        WHERE id = ?`;

        const foundCompany = await getCompanyIdByName(company);

        const foundUser = await getUserIdByName(user);

        const values = [name, note, foundCompany, foundUser, status, userId];

        const [result] = await db.execute(query, values);

        const updatedArtisan = {
            id: userId,
            name,
            note, 
            foundCompany,
            foundUser,
            status,
        };

        res.status(201).json({ message: 'Artisan created successfully!', artisan: updatedArtisan });
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating the activity!', error });
    }
};

module.exports = {
    editArtisan
};