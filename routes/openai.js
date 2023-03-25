const express = require("express");
const { calculateComplexity } = require("../controllers/openai");

const router = express.Router();

router.post("/calculatecomplexity", calculateComplexity);

module.exports = router;
