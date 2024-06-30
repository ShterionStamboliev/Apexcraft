const pool = require("../../db");

const editCompany = async (req, res) => {
    const companyId = req.params.id
    const {name, number, adress, mol, email, phone, dds, status} = req.body
    const query = 'UPDATE tbl_companies SET name= ?, number=?, adress=?, mol=?, email=?, phone=?, dds=?, status=? WHERE id = ?';

    if (Object.values(req.body).some(a => a == '')) {
        const field = Object.entries(req.body).find(([f, v]) => v == '')
        return res.status(400).send(`Field '${field[0]}' is required!`)
    }
    
    try {

        await pool.query(query, [name, number, adress, mol, email, phone, dds, status, companyId])
        res.status(200).send('Company edited successfully!');
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    editCompany
};