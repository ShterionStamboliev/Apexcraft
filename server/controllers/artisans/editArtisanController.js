const db = require('../../db');
const { getCompanyIdByName } = require('../../utils/getCompanyIdByName');
const { getUserIdByName } = require('../../utils/getUserIdByName');
const Validator = require('../../validators/controllerValidator');
const { artisanSchema } = require('../../validators/validationSchemas');

const editArtisan = async (req, res) => {

    const userId = req.params.id;
    const { name, note, company_id, status } = req.body;
    const validator = new Validator(artisanSchema);
    const errors = validator.validate({ name, note, status });
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {

        let companyId = null;

        const query = `UPDATE tbl_artisans
        SET name = ?, note = ?, company_id = ?, user_id = ?, status = ?
        WHERE id = ?`;

        if (company_id) {
            companyId = await getCompanyIdByName(company_id);
        };

        const foundUser = await getUserIdByName(name);

        const values = [name, note, companyId, foundUser, status, userId];

        const [result] = await db.execute(query, values);

        const updatedArtisan = {
            id: userId,
            name,
            note,
            company_id,
            companyId,
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