const pool = require('../../db');
const { getCompanyIdByName } = require('../../utils/getCompanyIdByName');
const { getUserIdByName } = require('../../utils/getUserIdByName');

const editArtisan = async (req, res) => {

    const userId = req.params.id;
    const { name, note, number, email, company, status } = req.body;
   
    try {
        const companyId = await getCompanyIdByName(company);

        const foundUser = await getUserIdByName(name);

        const query = `UPDATE tbl_artisans
        SET name = ?, note = ?, number = ?, email =?, company_id = ?, user_id = ?, status = ?
        WHERE id = ?`;

        const values = [name, note, number, email, companyId, foundUser, status, userId];

        const [result] = await pool.execute(query, values);

        const updatedArtisan = {
            id: userId,
            name,
            note,
            number,
            email,
            company,
            companyId,
            foundUser,
            status,
        };

        res.status(201).json({ message: 'Artisan updated successfully!', artisan: updatedArtisan });

    } catch (error) {
        res.status(500).json({ message: 'Error updating the artisan!', error });
    }
};

module.exports = {
    editArtisan
};