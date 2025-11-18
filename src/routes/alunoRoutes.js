const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, alunoController.listar);
router.post("/novo", auth, alunoController.criar);

module.exports = router;
