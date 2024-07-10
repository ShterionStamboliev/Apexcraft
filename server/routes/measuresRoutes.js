const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const { editMeasure } = require("../controllers/measures/editMeasureController");
const { addMeasure } = require("../controllers/measures/addMeasureController");
const { getAllMeasures } = require("../controllers/measures/getAllMeasures");
const { getMeasureById } = require("../controllers/measures/getMeasureById");

const router = express.Router();

router.get("/measures", authenticateToken, getAllMeasures)
router.get("/measures/:id", authenticateToken, getMeasureById)
router.put("/measures/:id/edit", authenticateToken, editMeasure)
router.post("/measures/create", authenticateToken, createMeasure)

module.exports = router;