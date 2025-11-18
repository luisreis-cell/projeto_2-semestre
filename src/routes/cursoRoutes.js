const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, cursoController.listar);
router.post("/novo", auth, cursoController.criar);

module.exports = router;
