const db = require('../../db')

const createCompany = async (req, res) => {

    const { name, number, address, mol, email, phone, dds, status } = req.body;

    try {

        if (!name || !number || !address || !mol || !email || !phone || !dds || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        const query = 
        `INSERT INTO 
        tbl_companies(name, number, address, mol, email, phone, dds, status)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [name, number, address, mol, email, phone, dds, status];

        const [result] = await db.execute(query, values);

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