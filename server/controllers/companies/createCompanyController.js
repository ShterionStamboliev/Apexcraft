const pool = require('../../db');
const Validator = require('../../validators/controllerValidator');
const { companySchema } = require('../../validators/validationSchemas');

const createCompany = async (req, res) => {

    const { name, number, address, mol, email, phone, dds, status } = req.body;
    const validator = new Validator(companySchema);
    const errors = validator.validate({ name, number, address, mol, email, phone, dds, status });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    try {
        const query = 
        `INSERT INTO 
        tbl_companies(name, number, address, mol, email, phone, dds, status)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [name, number, address, mol, email, phone, dds, status];

        const [result] = await pool.execute(query, values);

        const newCompany = {
            id: result.insertId,
            name, 
            number, 
            address, 
            mol, 
            email, 
            phone, 
            dds, 
            status
        };

        res.status(201).json({ message: 'Company created successfully!', company: newCompany  });

    } catch (error) {
        res.status(500).json({ message: 'Error creating the company!', error });
    }
};

module.exports = {
    createCompany
};