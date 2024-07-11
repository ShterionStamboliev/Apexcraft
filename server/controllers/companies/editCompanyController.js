const pool = require("../../db");

const editCompany = async (req, res) => {

    const company_id = req.params.id;
    const { company_name, company_number, company_address, company_mol, company_email, company_phone, company_dds, status } = req.body;

    try {
       
        if (!company_id || !company_name || !company_number || !company_address || !company_mol || !company_email || !company_phone || !company_dds || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const query = 
        `UPDATE tbl_companies
        SET company_name = ?, company_number = ?, company_address = ?, company_mol = ?, company_email = ?, company_phone = ?, company_dds = ?, status = ?
        WHERE id = ?;`;

        const values = [company_name, company_number, company_address, company_mol, company_email, company_phone, company_dds, status, company_id];

        const [result] = await pool.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const updatedCompany = {
            id: company_id,
            company_name, 
            company_number, 
            company_address, 
            company_mol, 
            company_email, 
            company_phone, 
            company_dds, 
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
