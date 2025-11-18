const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/login", usuarioController.mostrarLogin);
router.post("/login", usuarioController.login);

router.get("/cadastro", usuarioController.cadastro);
router.post("/cadastro", usuarioController.criar);

module.exports = router;

