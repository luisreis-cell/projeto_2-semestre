const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");

router.get("/", cursoController.listar);
router.post("/novo", cursoController.criar);

module.exports = router;
