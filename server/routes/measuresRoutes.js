const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const { editMeasure } = require("../controllers/measures/editMeasureController");

const router = express.Router();

router.put("/measures/:id/edit", authenticateToken, editMeasure)

module.exports = router;