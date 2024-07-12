const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const { editMeasure } = require("../controllers/measures/editMeasureController");
const { getMeasureById } = require("../controllers/measures/getMeasureByIdController");
const { createMeasure } = require("../controllers/measures/createMeasureController");
const { getMeasures } = require("../controllers/measures/getMeasuresController");

const router = express.Router();

router.get("/measures", getMeasures)
router.get("/measures/:id", getMeasureById)
router.post("/measures/create", createMeasure)
router.put("/measures/:id/edit", editMeasure)

module.exports = router;