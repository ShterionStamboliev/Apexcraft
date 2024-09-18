const db = require('../../db');
const { getActivityIdByName } = require('../../utils/getActivityIdByName');
const { getArtisanIdByName } = require('../../utils/getArtisanIdByName');
const { getMeasureIdByName } = require('../../utils/getMeasureIdByName');

const createTask = async (req, res) => {

    const projectId = req.params.id;
    const { name, artisan, activity, measure, price_per_measure, total_price, total_work_in_selected_measure, start_date, end_date, note, status } = req.body;

    try { 

        const artisanId = await getArtisanIdByName(artisan);
        const activityId = await getActivityIdByName(activity);
        const measureId = await getMeasureIdByName(measure);
        const pricePerMeasure = parseFloat(req.body.pricePerMeasure);
        const totalPrice = parseFloat(req.body.totalPrice);
        const totalWork = parseFloat(req.body.totalWork);

        const query = 'INSERT INTO tbl_tasks(project_id, name, artisan_id, activity_id, measure_id, price_per_measure, total_price, total_work_in_selected_measure, start_date, end_date, note, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const values = [projectId, name, artisanId, activityId, measureId, price_per_measure, total_price, total_work_in_selected_measure, start_date, end_date, note, status];


        const [result] = await db.execute(query, values);

        const newTask = {
            id: result.insertId,
            projectId,
            name,
            artisanId,
            activityId,
            measureId,
            price_per_measure, 
            total_price, 
            total_work_in_selected_measure,
            start_date,
            end_date,
            note,
            status,
        };

        res.status(201).json({ message: 'Task created successfully!', task: newTask });

    } catch (error) {
        res.status(500).json({ message: 'Error creating the task!', error });
    }
};

module.exports = {
    createTask
};