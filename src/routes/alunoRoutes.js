const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");


router.get("/",  alunoController.listar);
router.post("/novo",  alunoController.criar);

module.exports = router;
