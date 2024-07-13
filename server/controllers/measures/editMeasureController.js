const db = require("../../db");

const editMeasure = async (req, res) => {

    const measureId = req.params.id;
    const newName = req.body.name;
    try {

    if (!newName) {
        return res.status(400).json({ message: 'Name is required!' });
    };

    const query = 'UPDATE tbl_measures SET name = ? WHERE ID = ?';

    try {
        const values = [newName, measureId];

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Measure not found!' });
        };

        const updatedMeasure = {
            id: measureId,
            newName
        };

        res.status(200).json({ message: 'Company updated successfully!', measure: updatedMeasure });

    } catch (error) {
        res.status(500).json({ message: 'Error updating the measure!', error });
    };
};

module.exports = {
    editMeasure
};