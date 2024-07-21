const pool = require("../../db");
const Validator = require('../../validators/controllerValidator');
const { companySchema } = require('../../validators/validationSchemas');

const editCompany = async (req, res) => {

    const company_id = req.params.id;
    const { name, number, address, mol, email, phone, dds, status } = req.body;
    const validator = new Validator(companySchema);
    const errors = validator.validate({ name, number, address, mol, email, phone, dds, status });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {
       
        const query = 
        `UPDATE tbl_companies
        SET name = ?, number = ?, address = ?, mol = ?, email = ?, phone = ?, dds = ?, status = ?
        WHERE id = ?;`;

        const values = [name, number, address, mol, email, phone, dds, status, company_id];

        const [result] = await pool.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Company not found!' });
        }

        const updatedCompany = {
            id: company_id,
            name, 
            number, 
            address, 
            mol, 
            email, 
            phone, 
            dds, 
            status
        };

        res.status(200).json({ message: 'Company updated successfully!', company: updatedCompany });
    } catch (error) {
        res.status(500).json({ message: 'Error updating the company!', error });
    }
};

module.exports = {
    editCompany
};
