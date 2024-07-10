const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const { editMeasure } = require("../controllers/measures/editMeasureController");
const { createMeasure } = require("../controllers/measures/createMeasureController");

const router = express.Router();

router.put("/measures/:id/edit", authenticateToken, editMeasure)
router.post("/measures/create", authenticateToken, createMeasure)

module.exports = router;