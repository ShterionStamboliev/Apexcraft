const pool = require('../../db');
const { getActivityIdByName } = require('../../utils/getActivityIdByName');
const { getArtisanIdByName } = require('../../utils/getArtisanIdByName');
const { getMeasureIdByName } = require('../../utils/getMeasureIdByName');
const { getProjectIdByName } = require('../../utils/getProjectIdByName');

const createTask = async (req, res) => {

    const { project, artisan, activity, measure, pricePerMeasure, totalPrice, totalWork, startDate, endDate, note, status } = req.body;

    try { 

        const projectId = await getProjectIdByName(project);
        const artisanId = await getArtisanIdByName(artisan);
        const activityId = await getActivityIdByName(activity);
        const measureId = await getMeasureIdByName(measure);
        const pricePerMeasure = parseFloat(pricePerMeasure);
        const totalPrice = parseFloat(totalPrice);
        const totalWork = parseFloat(totalWork);
        
        const query = 'INSERT INTO tbl_tasks(project_id, artisan_id, activity_id, measure_id, price_per_measure, total_price, total_work_in_selected_measure, start_date, end_date, note, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const values = [projectId, artisanId, activityId, measureId, pricePerMeasure, totalPrice, totalWork, startDate, endDate, note, status];
        

        const [result] = await pool.execute(query, values);

        const newTask = {
            id: result.insertId,
            projectId,
            artisanId,
            activityId,
            measureId,
            pricePerMeasure, 
            totalPrice, 
            totalWork,
            startDate,
            endDate,
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