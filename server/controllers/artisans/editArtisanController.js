const db = require('../../db');
const { getCompanyIdByName } = require('../../utils/getCompanyIdByName');
const { getUserIdByName } = require('../../utils/getUserIdByName');

const editArtisan = async (req, res) => {

    const userId = req.params.id;
    const { name, note, company_id, status } = req.body;

    try {

        let companyName = null;

        if (!name || !status) {
            return res.status(400).json({ message: 'Name and Status are required fields!' });
        };

        const query = `UPDATE tbl_artisans
        SET name = ?, note = ?, company_id = ?, user_id = ?, status = ?
        WHERE id = ?`;

        if (company_id) {
            companyName = await getCompanyIdByName(company_id);
        };

        const foundUser = await getUserIdByName(name);

        const values = [name, note, companyName, foundUser, status, userId];

        const [result] = await db.execute(query, values);

        const updatedArtisan = {
            id: userId,
            name,
            note,
            company_id,
            companyName,
            status,
        };

        res.status(201).json({ message: 'Artisan created successfully!', artisan: updatedArtisan });

    } catch (error) {
        res.status(500).json({ message: 'Error updating the artisan!', error });
    }
};

module.exports = {
    editArtisan
};