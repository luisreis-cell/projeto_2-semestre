module.exports = (req, res, next) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).send("Nome e email são obrigatórios");
    }
    next();
};
