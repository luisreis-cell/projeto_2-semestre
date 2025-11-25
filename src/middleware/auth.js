module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.session && req.session.usuario) return next();
    return res.redirect('/usuario/login');
  },

  ensureRole(required) {
    // required can be a string or array of strings
    return (req, res, next) => {
      const u = req.session && req.session.usuario;
      if (!u) return res.redirect('/acesso-negado');
      const papel = u.papel || 'user';
      if (Array.isArray(required)) {
        if (required.includes(papel)) return next();
      } else {
        if (papel === required) return next();
      }
      return res.redirect('/acesso-negado');
    };
  }
};
