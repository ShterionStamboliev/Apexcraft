const pool = require("../../db");

const editCompany = async (req, res) => {

    const company_id = req.params.id;
    const { name, number, address, mol, email, phone, dds, status } = req.body;

    try {
       
        if (!name || !number || !address || !mol || !email || !phone || !dds || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const query = 
        `UPDATE tbl_companies
        SET name = ?, number = ?, address = ?, mol = ?, email = ?, phone = ?, dds = ?, status = ?
        WHERE id = ?;`;

        const values = [name, number, address, mol, email, phone, dds, status, company_id];

        const [result] = await pool.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Company not found' });
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
