const db = require('../../db')

const createCompany = async (req, res) => {

    const { company_name, company_number, company_address, company_mol, company_email, company_phone, company_dds, status } = req.body;

    try {

        if (!company_name || !company_number || !company_address || !company_mol || !company_email || !company_phone || !company_dds || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        const query = 
        `INSERT INTO 
        tbl_companies(company_name, company_number, company_address, company_mol, company_email, company_phone, company_dds, status)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [company_name, company_number, company_address, company_mol, company_email, company_phone, company_dds, status];

        const [result] = await db.execute(query, values);

        const newCompany = {
            id: result.insertId,
            company_name, 
            company_number, 
            company_address, 
            company_mol, 
            company_email, 
            company_phone, 
            company_dds, 
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