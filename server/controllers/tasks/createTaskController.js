const db = require('../../db');
const { getActivityIdByName } = require('../../utils/getActivityIdByName');
const { getArtisanIdByName } = require('../../utils/getArtisanIdByName');
const { getMeasureIdByName } = require('../../utils/getMeasureIdByName');
const { getProjectIdByName } = require('../../utils/getProjectIdByName');

const createTask = async (req, res) => {

    const { project, artisan, activity, measure, pricePerMeasure, totalPrice, totalWork, note, status } = req.body;

    try { 

        const projectId = await getProjectIdByName(project);
        const artisanId = await getArtisanIdByName(artisan);
        const activityId = await getActivityIdByName(activity);
        const measureId = await getMeasureIdByName(measure);
        const pricePerMeasure = parseFloat(req.body.pricePerMeasure);
        const totalPrice = parseFloat(req.body.totalPrice);
        const totalWork = parseFloat(req.body.totalWork);
        
        const query = 'INSERT INTO tbl_tasks(project_id, artisan_id, activity_id, measure_id, price_per_measure, total_price, total_work_in_selected_measure, note, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const values = [projectId, artisanId, activityId, measureId, pricePerMeasure, totalPrice, totalWork, note, status];
        

        const [result] = await db.execute(query, values);

        const newTask = {
            id: result.insertId,
            projectId,
            artisanId,
            activityId,
            measureId,
            pricePerMeasure, 
            totalPrice, 
            totalWork,
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