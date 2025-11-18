module.exports = (err, req, res, next) => {
    console.error("ERRO:", err);
    res.status(500).send("Erro interno no servidor");
};
