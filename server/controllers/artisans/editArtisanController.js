const db = require('../../db');
const { getCompanyIdByName } = require('../../utils/getCompanyIdByName');
const { getUserIdByName } = require('../../utils/getUserIdByName');
const Validator = require('../../validators/controllerValidator');
const { artisanSchema } = require('../../validators/validationSchemas');

const editArtisan = async (req, res) => {

    const userId = req.params.id;
    const { name, note, company, status } = req.body;
    const validator = new Validator(artisanSchema);
    const errors = validator.validate({ name, note, company, status });
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {

        const companyId = await getCompanyIdByName(company);

        const foundUser = await getUserIdByName(name);

        const query = `UPDATE tbl_artisans
        SET name = ?, note = ?, company_id = ?, user_id = ?, status = ?
        WHERE id = ?`;

        const values = [name, note, companyId, foundUser, status, userId];

        const [result] = await db.execute(query, values);

        const updatedArtisan = {
            id: userId,
            name,
            note,
            company,
            companyId,
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