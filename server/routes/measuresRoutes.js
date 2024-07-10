const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const { editMeasure } = require("../controllers/measures/editMeasureController");
const { addMeasure } = require("../controllers/measures/addMeasureController");
const { getAllMeasures } = require("../controllers/measures/getAllMeasures");

const router = express.Router();

router.get("/measures", authenticateToken, getAllMeasures)
router.put("/measures/:id/edit", authenticateToken, editMeasure)
router.post("/measures/create", authenticateToken, addMeasure)

module.exports = router;